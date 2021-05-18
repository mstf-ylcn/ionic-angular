import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormGroup,FormBuilder,Validator, Validators, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

import * as moment from 'moment';

import CryptoJS from 'crypto-js';
import { VeritabService } from '../../veritab.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private modalCtrl:ModalController,private formbuilder:FormBuilder,
    public veritab:VeritabService,public alertController: AlertController,
    public loadingController: LoadingController) {
    console.log("sign-up modal acıldı")
   }
   


  


 
  max_time;
  ngOnInit() {
    this.max_time=new Date().toISOString();//günlük olarak girilebilecek en buyuk tarih sayısı değişecek
    this.validator();
    this.validator2();
    console.log(this.max_time);
  }

  modal_kapat() {

    this.modalCtrl.dismiss();
    }



  //sign-up 1. sayfa kontrolleri icin
    form : FormGroup;
    data1:any;

    validator(){
      this.form = new FormGroup({
        tc_no: new FormControl(null,{validators:[Validators.required,Validators.minLength(11),Validators.pattern('[0-9]*')]}),
  

        ad: new FormControl(null,{validators:[Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z şŞ çÇ ğĞ ıI iİ üÜ öÖ]*')]}),
        soyad: new FormControl(null,{validators:[Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-ZşŞçÇğĞıIiİüÜöÖ]*')]}),
        cinsiyet: new FormControl(null,{validators:[Validators.required]}),
        tarih: new FormControl(null,{validators:[Validators.required]}),
        politika: new FormControl(null,{validators:[Validators.requiredTrue]}),


      });
    }
    

    //sign-up 2. sayfa kontrolleri icin
    form2 : FormGroup;
    validator2(){
      this.form2 = new FormGroup({
   
        password1: new FormControl(null,{validators:[Validators.required,Validators.minLength(8),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&+/|.,#^()_-])[A-Za-z\d$@$!%*?&+/|.,#^()_-].{7,}')]}),
        // password2: new FormControl(null,{validators:[Validators.required,Validators.minLength(8),]}),
        tel: new FormControl(null,{validators:[Validators.required,Validators.minLength(11),Validators.pattern('[0-9]*')]}),
        email: new FormControl(null,{validators:[Validators.required,Validators. pattern("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})")]}),

    
      });
    }



    
    get tc_no()
    {
      return this.form.get('tc_no');
    }

    get ad()
    {
      return this.form.get('ad');
    }
    get soyad()
    {
      return this.form.get('soyad');
    }

    get cinsiyet()
    {
      return this.form.get('cinsiyet');
    }
    get tarih()
    {
      return this.form.get('tarih');
    }
 
    get politika()
    {
      return this.form.get('politika');
    }


    get password1()
    {
      return this.form2.get('password1');
    }
 
    get password2()
    {
      return this.form2.get('password2');
    }
    get email()
    {
      return this.form2.get('email');
    }

    get tel()
    {
      return this.form2.get('tel');
    }
  


    page=1;//kayıt  sayfası icin 
    deneme;
    next()  //2. sayfaya gecmek icin
    {
      if(!this.form.valid)
      {
        this.form.markAllAsTouched();//submit butonuna basıldıgında uyarı vermesi icin

        console.log("Sayfa gecilemdi");
      }
      else
      {
        if(this.page=1)
        {

       

        this.page=2;
        console.log("Sayfa 2 geçti");
        }
      }
    }

    //1. sayfaya geri donmek icin
    previous()
    {
      if(this.page==2)
      this.page=1;
    }

    
    //eşleşen kayıtlar var mı?
    kayıt_kontrol;


     //kayıt olmak için
    sign_up()
    {
      if(!this.form2.valid)
      {
        this.form2.markAllAsTouched();//submit butonuna basıldıgında uyarı vermesi icin
        console.log("Giriş yapılamadı");
    }
    else
    {

      //kayıt olurken gırılen daha once aynı tc ile kayıt olunmussa
      let pw = CryptoJS.SHA256(this.password1.value).toString(CryptoJS.enc.Hex); //sifre hashlendi
      this.veritab.user_control(this.tc_no.value).subscribe((res:any)=>{
        this.kayıt_kontrol=res;
        console.log("Succes===",res);

         
      if(this.kayıt_kontrol.length)
      {
        console.log("Hata Girilen kayıt mevcut");
        this.hata_loading();

      }
      else
      {
        console.log("Bilgiler veritab gonderılıyor");
         this.data1=this.form.getRawValue();//Sign-up page den gelen datalar
         console.log("yeni "+this.data1.value);
        this.deneme = moment(this.tarih.value).format('YYYY-MM-DD');//yıl gun ay a cevirdik
        // let pw = CryptoJS.SHA256(this.password1.value).toString(CryptoJS.enc.Hex); //gelen sifreyi sha256 ile hashledik
      
   
      
        let data ={
          tc:this.tc_no.value,
          isim:this.ad.value,
          soyisim:this.soyad.value,
          dogum_tarihi:this.deneme,
          cinsiyet:this.cinsiyet.value,
          tel:this.tel.value,
          mail:this.email.value,
          sifre:pw
        };

        
        console.log('giden dizi:'+data.tc,data.tel,data.soyisim,data.sifre,data.mail,data.isim,data.dogum_tarihi,data.cinsiyet);

        // this.veritab.register(data).subscribe((res:any)=>{
        //   console.log("Basarılı===",res);
        //  this.loading();
      //  tc,isim,soyisim,dogum_tarihi,cinsiyet,tel,mail,sifre
        this.veritab.register(data.tc,data.isim,data.soyisim,data.dogum_tarihi,data.cinsiyet,data.tel,data.mail,data.sifre).subscribe((res:any)=>{
         console.log("Basarılı===",res);
        this.loading();
 
         
       },(error:any)=>
       {
         console.log("Hata geldi===",error);
         console.log("Giris basarısız");
       })
      }
   
      },(error:any)=>
      {
        console.log("ERORR===",error);
      })

    }
    }
   

 
    async loading() {
      const loading = await this.loadingController.create({
        cssClass: 'lutfen_bekleyin_class',
        message: 'Lütfen bekleyin...',
        duration: 400,
        spinner:'crescent'
      });
      await loading.present();
      console.log('kayıt basarılır loading');
      this.randevu_onay_alert();
    }



    async hata_loading() {
      const loading = await this.loadingController.create({
        cssClass: 'lutfen_bekleyin_class',
        message: 'Lütfen bekleyin...',
        duration: 400,
        spinner:'crescent'
      });
      await loading.present();
      console.log('kayıt basarısız loading');
      this.hata_alert();
    }

    async hata_alert() {
      const alert = await this.alertController.create({
        cssClass: 'giris_hata_css',
        header: 'Hata',
        message: 'Lütfen bilgilerinizi kontrol ederek tekrar deneyiniz.',
        buttons: ['TAMAM']
      });
    
      await alert.present();
    }



    async randevu_onay_alert() {
      const alert = await this.alertController.create({
        cssClass: 'gif_alert_css',
        message:`<div class="success-checkmark">
        <div class="check-icon">
          <span class="icon-line line-tip"></span>
          <span class="icon-line line-long"></span>
          <div class="icon-circle"></div>
          <div class="icon-fix"></div>
        </div>
      </div>`+'Başarılı bir şekilde kayıt oldunuz.',
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


  //  student;
  //   getstudent()
  //   {
  //     this.veritab.getdoktorappointment().subscribe((res:any)=>{
  //       this.student=res;
  //       console.log("Succes===",res);
  //     },(error:any)=>
  //     {
  //       console.log("ERORR===",error);
  //     })
  //     console.log(this.student+"son gelen");

  //   }

   



//sifre gorunebilirlik kontrol
    password_type="password";
    show = false;
    hide=1;
  
    
    password_type2="password";
    hide2=1;

    show_pw1()
    {
     if(this.show){
       this.password_type="text";
       this.show=false;
       this.hide=0;
     } 
     else
     {
      this.show=true;
       this.password_type="password";
       this.hide=1;
  
     }
    }

     show_pw2(){
      if(this.hide2){
        this.password_type2="text";
        this.hide2=0;
      } 
      else
      {
        this.password_type2="password";
        this.hide2=1;
      }
     

    }



  

    
  //   date:any;

  //     //tarih format

  // cevir()
  // {
  //   this.date=format(new Date(this.date), "yyyy-MM-dd");
  // }

}
