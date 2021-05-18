import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { th } from 'date-fns/locale';
import { VeritabService } from '../../veritab.service';
import { CalendarComponentOptions } from 'ion2-calendar';
import * as moment from 'moment';

import { Veri } from '../../tabservice';
import {
  CalendarModal,
  CalendarModalOptions,
  DayConfig,
  CalendarResult
} from 'ion2-calendar';


@Component({
  selector: 'app-randevual-modal',
  templateUrl: './randevual-modal.page.html',
  styleUrls: ['./randevual-modal.page.scss'],
})
export class RandevualModalPage implements OnInit {

  @Input() tc;
  hastane_bilgi;
  poli_bilgi;
  doktorlar;
  tc_no;
  constructor(private modalctrl:ModalController,private alertController:AlertController,public veritab:VeritabService,
    private veri: Veri ,private loadingController:LoadingController) {
    
    //bulundugumuz ayı sayı olarak degıskene atadık
    this.ay = (new Date()).getMonth();
    this.yil = (new Date()).getFullYear();
    this.gun=(new Date()).getUTCDate();

    console.log("randevu al modal acildi");
    console.log(this.ay+":ay");
    console.log(this.yil+":yil");
    console.log(this.gun+":gun");


     this.tc_no =this.veri.tc_no;

    this.hastane_getir();

        // this.randevu_baslangic=new Date().toISOString();
    // console.log(this.randevu_baslangic);
    // this.randevu_baslangic = moment(this.randevu_baslangic).format('YYYY-MM-DD');
    // this.randevu_baslangic=this.yil+'-'+this.ay+'-'+this.gun;
    // console.log("son hali:"+this.randevu_baslangic);

   }



   //Veritabanından hastane bilgilerini getirecek
   hastane_getir()
   {
        
    this.veritab.gethospital().subscribe((res:any)=>{
      console.log("Basarılı===",res);
      this.hastane_bilgi=res;
  
      
    },(error:any)=>
    {
      console.log("Hata geldi===",error);
    })   
   }
   

  ngOnInit() {
  }

   
  il_disable=true; 
  hastane_disable=true;
  poliklinik_disable=true;
  doktor_disable=true;
  randevu_disable=true;
  

  il;
  //asagıdaki 4 fonksiyon her biri altındaki girişlerin acılmasını saglıyor.

   il_ac()
   {
    this.il_disable=false;
   }

  sehir_ac(event)
  {
    this.il=event.detail.value;
    console.log(event);  //gelen data
    console.log("sehir secildi");
    this.hastane_disable=false;
  }
  
  hastane_alert;
  hastane_ad;
  hastane_kod;
  poliklinik_ac(event)
  {
    this.hastane_ad=event.detail.value.HASTANE;
    this.hastane_kod=event.detail.value.HASTANE_KOD;
    console.log(event);  //gelen data
    console.log("Hastane secildi");
    console.log("secilen hastane"+this.hastane_ad);
    this.hastane_alert=event.detail.value.HASTANE;
    this.poliklinik_disable=false;


    //Veritabanından poliklinikleri getirecek
    this.veritab.getdepartmant(this.hastane_kod).subscribe((res:any)=>{
      console.log("Basarılı===",res);
      this.poli_bilgi=res;
  
      
    },(error:any)=>
    {
      console.log("Hata geldi===",error);
    })

    console.log(this.hastane_bilgi);  



  }
   
  poliklinik_alert;
  poliklinik_ad;
  poliklinik_id;
  doktor_ac(event)
  {
    console.log(event.detail.value.POLIKLINIK);  //gelen data
    console.log("Poliklinik secildi");
    this.poliklinik_ad=event.detail.value.POLIKLINIK;
    this.poliklinik_id=event.detail.value.POLIKLINIK_NO;
    this.poliklinik_alert=event.detail.value.POLIKLINIK;
    this.doktor_disable=false;
    console.log("pol_id:"+this.poliklinik_id);


    //Polikliniklere gore doktorları getırecek
    this.veritab.getdoctor(this.poliklinik_ad).subscribe((res:any)=>{
      console.log("Basarılı===",res);
      this.doktorlar=res;
  
      
    },(error:any)=>
    {
      console.log("Hata geldi===",error);
    })

    // console.log("doktorlar:"+this.doktorlar);


  }


  doktor_alert;
  doktor_id;
  randevu_ac(event)
  {
   //gelen data
    console.log("Doktor secildi");
    console.log("adi-syoadi:"+event.detail.value.AD+event.detail.value.SOYAD);
    this.doktor_alert=event.detail.value.AD+' '+event.detail.value.SOYAD;
    this.doktor_id=event.detail.value.DOKTOR;
    console.log("dr_id:",this.doktor_id);
    this.randevu_disable=false;
  }





  // randevu_gun_dizi=["03.05.2021","04.05.2021","05.05.2021","06.05.2021","07.05.2021","08.05.2021"];
  randevu_gun_dizi=[];



  randevu_sayfasi=1;
  randevu_bulundu_mu=1;



   ilk_gun;
   gunler;
   i=0;
     randevu_ara()
  {

    this.veritab.getdoktorappointment(this.doktor_id,this.randevu_baslangic,this.randevu_bitis).subscribe((res:any)=>{
      console.log("Basarılı===",res);
      this.randevu_gun_dizi=res;
      this.gunler=res;
      //aranan kriterlerde randevu var mı ?
      this.randevu_gun_dizi.forEach(element => {
        this.randevu_saat2.push(element.TARIH);
        console.log("son dizi:"+this.randevu_saat2);
        if(this.i==0)
        {
        this.ilk_gun=element.TARIH;
        }
        this.i++;
      });
    
      
      console.log("ilk gun:"+ this.ilk_gun);
      if(this.randevu_gun_dizi.length) 
      {
        console.log("Randevu bulundu:"+this.randevu_gun_dizi.length);
        this.randevu_sayfasi=0;
        this.randevu_bulundu_mu=1;
        this.randevu_doluluk(this.doktor_alert);
      }
      else
      {
        console.log("Randevu bulunamadı:"+this.randevu_gun_dizi.length);
        this.randevu_bulundu_mu=0;
        this.randevu_sayfasi=0;
      }
  
      
    },(error:any)=>
    {
      console.log("Hata geldi===",error);
    }) 
  }

  geri()
  {
    this.poliklinik_disable=true;
    this.doktor_disable=true;
    this.randevu_disable=true;
    console.log("geri tusuna basıldı");
    this.randevu_sayfasi=1;

  }






// randevu_saat_dizi=["10:00","10:15","10:30","10:45","11:00","11:15","11:30","11:45","12:00","12:15","12:30","13:30","13:45","14:00","14:15","14:30","14:45","15:00","15:15","15:30"];

// randevu_dolu_dizi=["10:00","10:15"];

//dolu olanlarda hem gun hem de saat olmalı

 
  randevu_saat_dizi=[{saat:"09:00",dolu:'',dr_id:''},{saat:"09:15",dolu:'',dr_id:''},{saat:"09:30",dolu:'',dr_id:''},
                     {saat:"09:45",dolu:'',dr_id:''},{saat:"10:00",dolu:'',dr_id:''},{saat:"10:15",dolu:'',dr_id:''},
                     {saat:"10:30",dolu:'',dr_id:''},{saat:"10:45",dolu:'',dr_id:''},{saat:"11:00",dolu:'',dr_id:''},
                     {saat:"11:15",dolu:'',dr_id:''},{saat:"11:30",dolu:'',dr_id:''},{saat:"11:45",dolu:'',dr_id:''},
                     {saat:"12:00",dolu:'',dr_id:''},{saat:"12:15",dolu:'',dr_id:''},{saat:"12:30",dolu:'',dr_id:''},
                     {saat:"13:30",dolu:'',dr_id:''},{saat:"13:45",dolu:'',dr_id:''},{saat:"14:00",dolu:'',dr_id:''},
                     {saat:"14:15",dolu:'',dr_id:''},{saat:"14:30",dolu:'',dr_id:''},{saat:"14:45",dolu:'',dr_id:''},
                     {saat:"15:00",dolu:'',dr_id:''},{saat:"15:15",dolu:'',dr_id:''},{saat:"15:30",dolu:'',dr_id:''},
                     {saat:"15:45",dolu:'',dr_id:''},{saat:"16:00",dolu:'',dr_id:''},{saat:"16:15",dolu:'',dr_id:''},
                     {saat:"16:30",dolu:'',dr_id:''}];

  // randevu_dolu_dizi=[{saat:'',dolu:String}];

  // randevu_saat_dizi=[{saat:"09:00"},{saat:"09:15"},{saat:"09:30"},
  //                    {saat:"09:45"},{saat:"10:00"},{saat:"10:15"},
  //                    {saat:"10:30"},{saat:"10:45"},{saat:"11:00"},
  //                    {saat:"11:15"},{saat:"11:30"},{saat:"11:45"},
  //                    {saat:"12:00"},{saat:"12:15"},{saat:"12:30"},
  //                    {saat:"13:30"},{saat:"13:45"},{saat:"14:00"},
  //                    {saat:"14:15"},{saat:"14:30"},{saat:"14:45"},
  //                    {saat:"15:00"},{saat:"15:15"},{saat:"15:30"},
  //                    {saat:"15:45"},{saat:"16:00"},{saat:"16:15"},
  //                    {saat:"16:30"}];
                     



  randevu_saat;
  randevu_saat2=[];
  doktor_ad;
randevu_doluluk(id)
{
 this.doktor_ad=id;
  this.veritab.aveilable(this.ilk_gun,this.randevu_bitis,id).subscribe((res:any)=>{
    console.log("Basarılı===",res);
    this.randevu_saat=res;
   this.randevu_saat.forEach(dolu_saat => {
    this.randevu_saat_dizi.forEach(saat => {
  
      if(saat.saat==dolu_saat.dolu_saat)
      {
       saat.dolu=dolu_saat.saat;
       
        console.log("gelen doktor"+dolu_saat.DOKTOR);
        // console.log("gelen tarih"+dolu_saat.TARIH);
        console.log("gelen saat"+dolu_saat.saat);
      }

    });
      
    });
     

  //  this.randevu_saat_dizi.forEach(dolu_saatler=>
  //   {
  //     console.log("dolu saatler:"+dolu_saatler.dolu);
  //   });

 
    
  },(error:any)=>
  {
    console.log("Hata geldi===",error);
  }) 
}

randeu_yenile(gun)
{
  console.log("randevu yenile gün:"+gun)
  this.doktor_ad=this.doktor_alert;
  this.veritab.aveilable(gun,this.randevu_bitis,this.doktor_ad).subscribe((res:any)=>{
    console.log("Basarılı===",res);
    this.randevu_saat=res;
   this.randevu_saat.forEach(dolu_saat => {
    this.randevu_saat_dizi.forEach(saat => {
  
      if(saat.saat==dolu_saat.dolu_saat)
      {
       saat.dolu=dolu_saat.saat;
       
        console.log("gelen doktor"+dolu_saat.DOKTOR);
        // console.log("gelen tarih"+dolu_saat.TARIH);
        console.log("gelen saat"+dolu_saat.saat);
      }

    });
      
    });
     

  //  this.randevu_saat_dizi.forEach(dolu_saatler=>
  //   {
  //     console.log("dolu saatler:"+dolu_saatler.dolu);
  //   });

 
    
  },(error:any)=>
  {
    console.log("Hata geldi===",error);
  }) 
}

indis=0;
ileri(i,gun)
{
  console.log("yaz:"+this.randevu_saat2);
 if(i==0)
 {
   console.log("gun: "+gun);
   console.log("indis: "+(i+1));
   this.indis=1;
   this.randeu_yenile(this.randevu_saat2[(i+1)]);
 }
 else if(i==1)
 {


  
  console.log("gun: "+gun);

  this.indis=2;
  console.log("indis: "+(i+1));
  this.randeu_yenile(this.randevu_saat2[(i+1)]);

 }
 else if(i==2)
 {
  console.log("gun: "+gun);
  console.log("indis: "+(i+1));
  this.randeu_yenile(this.randevu_saat2[(i+1)]);


  this.indis=3;
 }
 else if(i==3)
 {
  console.log("gun: "+gun);
  console.log("indis: "+(i+1));
  this.indis=4;
  this.randeu_yenile(this.randevu_saat2[(i+1)]);
 }
 else if(i==4)
 {
  console.log("gun: "+gun);
  console.log("indis: "+(i+1));
   this.indis=5;
   this.randeu_yenile(this.randevu_saat2[(i+1)]);
 }
}

geri_gel(i,gun)
{ 
  if(i==5)
  {
    this.indis=4;
    console.log("gun: "+gun);
    console.log("indis: "+(i-1));
    this.randeu_yenile(this.randevu_saat2[(i-1)]);
  }

 if(i==4)
 {
   this.indis=3;
   console.log("gun: "+gun);
   console.log("indis: "+(i-1));
   this.randeu_yenile(this.randevu_saat2[(i-1)]);
 }
  if(i==3)
 {
  console.log("gun: "+gun);
  console.log("indis: "+(i-1));
  this.randeu_yenile(this.randevu_saat2[(i-1)]);

  this.indis=2;
 }
 
 else if(i==2)
 {
  console.log("gun: "+gun);
  console.log("indis: "+(i-1));
  this.randeu_yenile(this.randevu_saat2[(i-1)]);

  this.indis=1;
 }
 else if(i==1)
 {
  console.log("gun: "+gun);
  console.log("indis: "+(i-1));
  this.randeu_yenile(this.randevu_saat2[(i-1)]);

  this.indis=0;
 }
}






randevu_sec;
randevu_veritab_gun;
randevu_sec_fonk(randevusaat,randevugun_alert,randevusaat_alert)
{
  console.log("gelsin mi:"+randevugun_alert);//secilen randevu saat ve tarihi geliyor
  this.randevu_sec=randevusaat;

  //randevu bilgilerini alerte yolladık
  this.randevu_uyari(randevugun_alert,randevusaat_alert,this.poliklinik_alert,this.doktor_alert,this.hastane_alert);
 
}

onay;
randevu_veritab(gun,saat)
{
  this.onay='AKTIF';
   
   console.log("tc:"+this.tc_no);
   console.log("doktor id:"+this.doktor_id);

   console.log("hastane kod:"+this.hastane_kod);

   console.log("gun:"+this.gidecek_gun);

   console.log("poliklink"+this.poliklinik_id);

   console.log("saat"+this.gidecek_saat);


  let r={
    tarih:this.gidecek_gun,
    hastane:this.hastane_kod,
    dr:this.doktor_id,
   tc:this.tc_no,
 
   saat:this.gidecek_saat,
 
   pol:this.poliklinik_id,
   onay:'AKTIF',
  
  }

  this.veritab.setappointment(this.gidecek_gun,this.doktor_id,this.tc_no,this.hastane_kod,this.gidecek_saat,this.onay,this.poliklinik_id).subscribe((res:any)=>{
    console.log("Basarılı===",res);
    this.loading();

    
    
  },(error:any)=>
  {

    this.hata_alert();
    console.log("Hata geldi===",error);
  })


  

}



//randevu secildikten sonra uyarı verecek  //tıcı true gonder
gidecek_gun;
gidecek_saat;
async randevu_uyari(randevugun,randevusaat,bolum,doktor,hastane) {
  const alert = await this.alertController.create({
    cssClass: 'randevu_onay_alert_css',
    header: 'Randevunuzu onaylıyor musunuz?',
    message: `<ion-label class="randevu_tarih" >${randevugun}</ion-label>`+ 
    `<ion-icon name='time-outline'></ion-icon>`+
    `<ion-label class="randevu_tarih">${randevusaat}</ion-label>`+'<br>'+
    `<img src="../../../assets/h.png"  alt="">`+
    `<ion-label class="randevu_bilgileri">${hastane}</ion-label>`+'<br>' +
    `<img  " src="../../../assets/r.png"  alt="">`+
    `<ion-label class="randevu_bilgileri">${bolum}</ion-label>`+'<br>'+
    `<img  " src="../../../assets/drk.png"  alt="">`+
    `<ion-label class="randevu_bilgileri">${doktor}</ion-label>`,

    buttons: [
      {
        text: 'Hayır',
        cssClass: 'secondary',
        handler: () => {
          console.log('Randevu onaylanmadı');
        }
      }, {
        text: 'Evet',
        handler: () => {
          console.log('Randevu onaylandı');
          this.gidecek_gun=randevugun;
          this.gidecek_saat=randevusaat;
          this.randevu_veritab(randevugun,randevusaat);
          //veri tabanına randevu gonderilecek
        }
      }
    ]
  });

  await alert.present();
}


async loading() {
  const loading = await this.loadingController.create({
    cssClass: 'lutfen_bekleyin_class',
    message: 'Lütfen bekleyin...',
    duration: 400,
    spinner:'crescent'
  });
  await loading.present();
  console.log('Kayıt ol yukleme bitti');
  this.randevu_onay();
}




// `<img  " src="../../../assets/onay2.gif"  alt="">`
//randevu onaylandıktan sonra cıkacak animasyon
async randevu_onay() {
  const alert = await this.alertController.create({
    cssClass: 'gif_alert_css',
    message:`<div class="success-checkmark">
    <div class="check-icon">
      <span class="icon-line line-tip"></span>
      <span class="icon-line line-long"></span>
      <div class="icon-circle"></div>
      <div class="icon-fix"></div>
    </div>
  </div>`+'Randevunuz onaylanmıştır.',
    buttons: [
      {
        text: 'TAMAM',
        cssClass: 'secondary',
        handler: () => {
          console.log('Randevu onaylandı gif.');
        }
      }
    ]
  });

  await alert.present();
  this.modal_kapat();
}





    async hata_alert() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'HATA',
        message: 'Randevu alınamadı.Lütfen daha sonra tekrar deneyiniz..',
        buttons: ['TAMAM']
      });
      await alert.present(); 

    }
















  //Takvim
    ay;
    yil;
    gun;

   //kullanıcının seçtigi aralığı tutmak için degiskenler 
   randevu_baslangic;
   randevu_bitis;
baslangic_gun;
bitis_gun;
   async takvim_ac() {
    const options: CalendarModalOptions = {
      title: '',
      weekdays:['Pzr','Pzt','Sal','Çar','Per','Cum','Cmt'],
      disableWeeks:[0,6],
      pickMode: 'range',
      monthFormat: 'MM YYYY',
      color:'primary',

        
      //kullanıcının seçebileği aralığı belirledik
      from: new Date(this.yil, this.ay,this.gun+1 ),
      to: new Date(this.yil , this.ay+2 ,1),
      
      
    };
 
    const myCalendar = await this.modalctrl.create({
      component: CalendarModal,
      componentProps: { options }
      
    });

 
    myCalendar.present();
 
    const event: any = await myCalendar.onDidDismiss();
    const date = event.data;
    const from: CalendarResult = date.from;
    const to: CalendarResult = date.to;
    this.il_ac();


    this.baslangic_gun=date.from.dateObj.toString().substring(0,3);//baslangıc gunu geldi
    // this.baslangic_gun=this.baslangic_gun;
 
 
    this.bitis_gun=date.to.dateObj.toString().substring(0,3);//bitis gunu geldi
    // this.bitis_gun=this.bitis_gun
   

    console.log("Başlangıc gunu: "+this.baslangic_gun);
    console.log("Bitis gunu: "+this.bitis_gun);

     //randevu baslangıc ve bitiş tarihini aldık
    this.randevu_baslangic=date.from.string;
    this.randevu_bitis=date.to.string;
    
    console.log(date);
    console.log("istek randevu baslangic tarihi: "+this.randevu_baslangic);
    console.log("istek randevu bitis tarihi: "+this.randevu_bitis);

  }





  
  // doktorlar=["Dr. Deneme Deneme","Dr. Deneme Deneme","Dr. Deneme Deneme","Dr. Deneme Deneme","Dr. Deneme Deneme","Dr. Deneme Deneme","Dr. Deneme Deneme",];

  // poliklinik=["ALGOLOJİ",
  //  " BESLENME VE DİYET",
  //   "BEYİN VE SİNİR CERRAHİSİ",
  //  "DERMATOLOJİ (CİLDİYE)",
  //   " ENDOKRİNOLOJİ VE METABOLİZMA",
  //   "ENFEKSİYON HASTALIKLARI",
  //   "FİZİKSEL TIP VE REHABİLİTASYON",
  //   "GASTROENTEROLOJİ",
  //  "GELENEKSEL VE TAMAMLAYICI TIP(GETAMER)",
  //   "KALP VE DAMAR CERRAHİSİ",
  //   "KARDİYOLOJİ",
  //   "KULAK-BURUN-BOĞAZ HASTALIKLARI"
  // ]



  
  modal_kapat() {

    this.modalctrl.dismiss();
    }

    gel(event)
    {
      console.log(event.value);
    }

}
