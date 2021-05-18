import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {CovidModalPage} from '../covid-modal/covid-modal.page'
import { RandevualModalPage } from '../randevual-modal/randevual-modal.page';
import { VeritabService } from '../../veritab.service';
import { Veri } from '../../tabservice';
import * as moment from 'moment';
@Component({
  selector: 'app-tabev',
  templateUrl: './tabev.page.html',
  styleUrls: ['./tabev.page.scss'],
})
export class TabevPage implements OnInit {

  tc_no;
  bilgi;
  tarih;
  constructor(private modalctrl:ModalController
    ,private router:Router,public veritab:VeritabService,
    private veri: Veri) {
    console.log("Tab ev acıldı");
  //  this.tc_no=this.router.getCurrentNavigation().extras.state.tc; //servis olmadan kullandıgım

  this.tc_no = this.veri.tc_no; //servisten gelen tc_no
   console.log("Loginden gelen tc:"+this.tc_no);
   this.tarih= new Date().toISOString();
   this.tarih = moment(this.tarih).format('YYYY-MM-DD');
   console.log("tarih:"+this.tarih);
   this.yakin_randevu();
     
   //hasta bilgilerini veri tabanından alıyor
   this.veritab.patientinfo(this.tc_no).subscribe((res:any)=>{
    console.log("Basarılı===",res);
    this.bilgi=res;

    
  },(error:any)=>
  {
    console.log("Hata geldi===",error);
  })
  

   }
   
   yaklasanrandevu;
  yakin_randevu()
  {
    this.veritab.getappointment(this.tc_no,this.tarih).subscribe((res:any)=>{
      console.log("Basarılı===",res);
    this.yaklasanrandevu=res;

    if(this.yaklasanrandevu.length)
{
 console.log("yaklasan randevular geldi");
 this.yaklasan_randevu=1;
}
else
{
  console.log("yaklasan randevu yok");
   this.yaklasan_randevu=0;
}

      
    },(error:any)=>
    {
      console.log("Hata geldi===",error);
    })
  }



  ngOnInit() {
  }


  async covid_modal()
  {
    const modal = await this.modalctrl.create({
      component: CovidModalPage,
      cssClass: 'modal_covid_class'
    });
     await modal.present();
  }

  async randevual_modal()
  {
    const modal = await this.modalctrl.create({
      component: RandevualModalPage,
      cssClass: 'randevual_modal_class',
     componentProps:{ tc :this.tc_no}

    });
     await modal.present();
  }
  

  yenile(event) {
    console.log('Tabev sayfası yenileniyor');
    //fonk gelecek
    this.yakin_randevu();

    setTimeout(() => {
      console.log('Tabev sayfası yenilendi');
      event.target.complete();
    }, 2000);
  }


  randevual()
  {
    if(this.randevu==1)
    this.randevu=0;
    else
    this.randevu=1;
  }   


  randevu=1;
  yaklasan_randevu=1;

  dizi=[1,2,3];

}
