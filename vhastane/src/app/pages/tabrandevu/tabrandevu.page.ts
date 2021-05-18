import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Veri } from '../../tabservice';
import { VeritabService } from '../../veritab.service';
import * as moment from 'moment';
@Component({
  selector: 'app-tabrandevu',
  templateUrl: './tabrandevu.page.html',
  styleUrls: ['./tabrandevu.page.scss'],
})
export class TabrandevuPage implements OnInit {

  tc_no;
  tarih;
  constructor(public alertController: AlertController,public veritab:VeritabService,
    private veri: Veri) {
    console.log("tab randevu acıldı");
    this.tc_no = this.veri.tc_no; //tab servisten gelen tc_no
    console.log("Servisten gelen tc:",this.tc_no)
    this.tarih= new Date().toISOString();
    this.tarih = moment(this.tarih).format('YYYY-MM-DD');
    this.yakın_randevu();
    this.gecmis_randevu();
   }

  ngOnInit() {
  }

  async randevu_iptal(index,randevutarih,randevusaat,randevupol,randevudoktor,ta) {
    console.log("gelen index:"+index);
    console.log("gelen tarih:"+randevutarih);

    const alert = await this.alertController.create({
      cssClass: 'randevu_iptal_alert_css',
      header: 'UYARI!',
      message:  `<ion-label class='boldcss' " >${randevutarih}</ion-label>`+' Saat '+
      `<ion-label class='boldcss' " >${randevusaat}</ion-label>`+
      ' Tarihli '+
      `<ion-label class='boldcss' " >${randevupol}</ion-label>`+
      ' randevunuzu iptal etmek istediğinizden emin misiniz ?',
      buttons: [
        {
          text: 'HAYIR',
          // role: 'HAYIR',
          handler: () => {
            console.log('HAYIR');
          }
        }, {
          text: 'EVET',
          handler: () => {
            console.log('EVET');
             console.log("silinen index:"+index);
         console.log(randevudoktor+' '+ta+' '+randevusaat);
         
          this.randevu_sil(randevudoktor,ta,randevusaat);
          this.randevular.splice(index,1); 
          this.bosmu();
          //gelen indexteki randevuyu diziden cıkaracak

             
          }
        }
      ]
    });

    await alert.present();
  }

 randevu_sil(dr,tarih,saat)
 {
   console.log("randevu sil calıstı:"+dr,tarih,saat);
  this.veritab.deleteappointment(this.tc_no,dr,tarih,saat).subscribe((res:any)=>{
    console.log("Basarılı===",res);
  
    
  },(error:any)=>
  {
    console.log("Hata geldi===",error);
  })

 }



  randevular;
  yakın_randevu()
  {
    this.veritab.fullappointment(this.tc_no,this.tarih).subscribe((res:any)=>{
      console.log("Basarılı===",res);
    this.randevular=res;

    if(this.randevular.length)
{
 console.log("yaklasan randevular geldi");
 this.randevular_=1;
}
else
{
  console.log("yaklasan randevu yok");
  this.randevular_=0;
}

      
    },(error:any)=>
    {
      console.log("Hata geldi===",error);
    })
  }

  gecmisradenvular;
 gecmis_randevu()
 {


  this.veritab.pastappointment(this.tc_no,this.tarih).subscribe((res:any)=>{
    console.log("Basarılı===",res);
  this.gecmisradenvular=res;

  if(this.gecmisradenvular.length)
{
console.log("gecmis randevular geldi");
this.gecmis_randevular=1;
}
else
{
console.log("gecmis randevu yok");
this.gecmis_randevular=0;
}

    
  },(error:any)=>
  {
    console.log("Hata geldi===",error);
  })



 }




//randevular iptal edilirse veya günü gecerse devreye girecek resim icin 
bosmu()
{
  if( this.randevular.length==0)
  {
    this.randevular_=0;

  }
}


  randevu_dizi=[{tarih:"24 Nisan 2021",saat:"22:00",hastane:"Uşak Eğitim ve Araştırma",dr:"Dr Deneme Deneme",
  pol:"Kalp ve Damar Hastalıkları"},{tarih:"25 Mayıs 2021",saat:"10:00",hastane:"Kocaeli Eğitim ve Araştırma",dr:"Dr Deneme2 Deneme2",
  pol:"Dahiliye(İç) Hastalıkları"}]; //randevulardan gelen datalar
 
 
 
  gecmis_randevu_dizi=[1,2,3,4,5]; //gecmis randevulardan gelen datalar





  yenile(event) {
    console.log('Tabrandevu yenileniyor');
    //fonk gelecek
    this.yakın_randevu();
    this.gecmis_randevu();

    setTimeout(() => {
      console.log('Tabrandevu yeilendi');
      event.target.complete();
    }, 2000);
  }
 


  //gecici
  randevular_=1;
  gecmis_randevular=1;
  
  // degis()
  // {
  //   if(this.randevular_==1 && this.gecmis_randevular==1)
  //   {
  //   this.randevular_=0;
  //   this.gecmis_randevular=0;
  //   }
  //   else
  //   {
  //     this.randevular_=1;
  //     this.gecmis_randevular=1;
  //   }
  // }
//gecici bitis

  randevu_switch=1;
  //randevular ve gecmis randevuları acıp kapatmak icin.
  switch()
  {
    if(this.randevu_switch==1)
    {
    this.randevu_switch=0;
    }
    else
    {
    this.randevu_switch=1;
  }
}

}
