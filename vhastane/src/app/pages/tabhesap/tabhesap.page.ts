import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Veri } from '../../tabservice';
import { VeritabService } from '../../veritab.service';
import { DuzenleModalPage } from '../duzenle-modal/duzenle-modal.page';
import { HakkimizdaPage } from '../hakkimizda/hakkimizda.page';
import { OzelIstekPage } from '../ozel-istek/ozel-istek.page';

@Component({
  selector: 'app-tabhesap',
  templateUrl: './tabhesap.page.html',
  styleUrls: ['./tabhesap.page.scss'],
})
export class TabhesapPage implements OnInit {

tc_no;
  constructor(private alertctrl:AlertController,private router:Router,public loadingController: LoadingController,
    private veri: Veri,public veritab:VeritabService,private modalCtrl:ModalController) {
    console.log("tabhesap acıldı");

    this.tc_no = this.veri.tc_no; //tab servisten gelen tc_no
    console.log("Tab service den gelen tc:",this.tc_no);

    this.uye_getir();
   }


    uye_bilgileri;
   uye_getir()
   {
    this.veritab.patientinfo(this.tc_no).subscribe((res:any)=>{
      console.log("Basarılı===",res);
      this.uye_bilgileri=res;
  
      
    },(error:any)=>
    {
      console.log("Hata geldi===",error);
    })
  
   }



   yenile(event) {
    console.log('tabHesap sayfası yenilenmeye basladı');
    this.tc_no = this.veri.tc_no;
    this.uye_getir();

    setTimeout(() => {
      console.log('tabHesap sayfası yenılenme bitti');
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {
  }


  renk=1;
  darkmode(event)
  {
    if(event.detail.checked)
    {
      document.body.setAttribute('color-theme','dark'); 
      this.renk=0;
    }
    else
    {
      document.body.setAttribute('color-theme','light'); 
      this.renk=1;

    }
  }

  async cikis_alert() {
console.log("cıkış buton tıklandı");

    const alert = await this.alertctrl.create({
      cssClass: 'randevu_iptal_alert_css',
      message:  'Uygulamadan çıkmak istediğinizden  emin misiniz ?',
      buttons: [
        {
          text: 'HAYIR',
          handler: () => {
            console.log('Çıkış:HAYIR');
          }
        }, {
          text: 'EVET',
          handler: () => {
            console.log('Çıkış:EVET');
            
            this.cikis_loading();
             
          }
        }
      ]
    });

    await alert.present();
  }



  async cikis_loading() {
    const loading = await this.loadingController.create({
      cssClass: 'lutfen_bekleyin_class',
      message: 'Çıkış yapılıyor. Lütfen bekleyin...',
      duration: 300,
      spinner:'crescent'
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Cıkıs yapıldı');

    this.router.navigateByUrl('home');

  }
  


  async modal_ac() {
    const modal = await this.modalCtrl.create({
      component: DuzenleModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss().then(() => {
     this.uye_getir();
  });
    return await modal.present();
  
  }


  duzenle()
  {
    // this.router.navigate(['duzenle-modal']);
    this.modal_ac();
    console.log("iletişim bilgilerini düzenle tıklandı");
  }
  
 async hakkimizda()
  {
      const modal = await this.modalCtrl.create({
        component: HakkimizdaPage,
        cssClass: 'modal_hakkimizda_class'
      });
      modal.onDidDismiss().then(() => {
       this.uye_getir();
    });
      return await modal.present();
    
  }


  async ozel_istek()
  {
      const modal = await this.modalCtrl.create({
        component: OzelIstekPage,
        cssClass: 'modal_istek_class'
      });
      modal.onDidDismiss().then(() => {
       this.uye_getir();
    });
      return await modal.present();
    
  }


}
