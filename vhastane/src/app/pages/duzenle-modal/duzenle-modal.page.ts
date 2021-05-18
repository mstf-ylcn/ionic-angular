import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup,FormBuilder,Validator, Validators, FormControl } from '@angular/forms';
import { VeritabService } from '../../veritab.service';
import { Veri } from '../../tabservice';
import CryptoJS from 'crypto-js';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-duzenle-modal',
  templateUrl: './duzenle-modal.page.html',
  styleUrls: ['./duzenle-modal.page.scss'],
})
export class DuzenleModalPage implements OnInit {
 tc_no;
  constructor(public modalctrl:ModalController,private formbuilder:FormBuilder,
    public veritab:VeritabService, private veri: Veri,public alertController: AlertController,public loadingController: LoadingController) { 

      this.tc_no =this.veri.tc_no;
      console.log(this.tc_no);
    }

  ngOnInit() { this.validator2();
    this.validator();
    this.validator3();
  }

  form2 : FormGroup;
  validator2(){
    this.form2 = new FormGroup({
 
      password1: new FormControl(null,{validators:[Validators.required,Validators.minLength(8),
       ]}),
      tel: new FormControl(null,{validators:[Validators.required,Validators.minLength(11),Validators.pattern('[0-9]*')]}),
     
  
    });
  }
  form : FormGroup;
  validator(){
    this.form = new FormGroup({
 
       password2: new FormControl(null,{validators:[Validators.required,Validators.minLength(8),]}),
      email: new FormControl(null,{validators:[Validators.required,Validators. pattern("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})")]}),

  
    });
  }



  form3 : FormGroup;
  validator3(){
    this.form3 = new FormGroup({
 
       password3: new FormControl(null,{validators:[Validators.required,Validators.minLength(8),]}),
       password4: new FormControl(null,{validators:[Validators.required,Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&+/|.,#^()_-])[A-Za-z\d$@$!%*?&+/|.,#^()_-].{7,}')]}),

  
    });
  }





  get password1()
    {
      return this.form2.get('password1');
    }
    get tel()
    {
      return this.form2.get('tel');
    }
    get password2()
    {
      return this.form.get('password2');
    }
    get email()
    {
      return this.form.get('email');
    }

    get password3()
    {
      return this.form3.get('password3');
    }

    get password4()
    {
      return this.form3.get('password4');
    }
  


  

  modal_kapat() {

    this.modalctrl.dismiss();
    }

    hide=1;
    password_type="password";
    show_pw()
    {
     if(this.hide){
       this.password_type="text";
       this.hide=0;
     } 
     else
     {
       this.password_type="password";
       this.hide=1;
     }
    }

    hide2=1;
    password_type2="password";


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


    hide3=1;
    password_type3="password";


    show_pw3(){
      if(this.hide3){
        this.password_type3="text";
        this.hide3=0;
      } 
      else
      {
        this.password_type3="password";
        this.hide3=1;
      }
     
    }


    hide4=1;
    password_type4="password";


    show_pw4(){
      if(this.hide4){
        this.password_type4="text";
        this.hide4=0;
      } 
      else
      {
        this.password_type4="password";
        this.hide4=1;
      }
     
    }




  sifre_guncelle()
  {
  
    if(!this.form3.valid)
    {
    console.log(this.password3.value);
    console.log(this.password4.value);
      this.form3.markAllAsTouched();//submit butonuna basıldıgında uyarı vermesi icin
      console.log("Giriş yapılamadı");
    }
    else
    {
      let eski = CryptoJS.SHA256(this.password3.value).toString(CryptoJS.enc.Hex);
      let yeni = CryptoJS.SHA256(this.password4.value).toString(CryptoJS.enc.Hex);

      this.veritab.getuser(this.tc_no,eski).subscribe((res:any)=>{
        this.giris_bilgi=res;
        console.log("Succes===",res);
        if(this.giris_bilgi.length)
        {
          console.log("sifre guncelleme basarılı");
           //kayıt işlemi icin gidecek
           this.veritab.updatepw(this.tc_no,yeni).subscribe((res:any)=>{
            console.log("Succes===");
            this.loading_pw();
          },(error:any)=>
          {
            console.log("ERORR===",error);
          })
        }
        else
        {
        this.hata_loading_pw();
          console.log("sifre guncelleme basarısız");
        }
    
    
    
      },(error:any)=>
      {
        console.log("ERORR===",error);
      })
    
    }
  }






password;
giris_bilgi;






    email_guncelle()
    {
      if(!this.form.valid)
      {
      console.log(this.email.value);

        this.form.markAllAsTouched();//submit butonuna basıldıgında uyarı vermesi icin
        console.log("Giriş yapılamadı");
    }
    else
   {
  let hash = CryptoJS.SHA256(this.password2.value).toString(CryptoJS.enc.Hex);
  this.veritab.getuser(this.tc_no,hash).subscribe((res:any)=>{
    this.giris_bilgi=res;
    console.log("Succes===",res);
    if(this.giris_bilgi.length)
    {
      console.log("email guncelleme basarılı");
       //kayıt işlemi icin gidecek
       this.veritab.updatemail(this.tc_no,this.email.value).subscribe((res:any)=>{
        console.log("Succes===");
       this.loading_mail();
      },(error:any)=>
      {
        console.log("ERORR===",error);
      })
    }
    else
    {
     this.hata_loading_mail();
      console.log("email guncelleme basarısız");
    }



  },(error:any)=>
  {
    console.log("ERORR===",error);
  })

}
    }

    tel_guncelle()
    {
      if(!this.form2.valid)
      {
      console.log(this.email.value);

        this.form2.markAllAsTouched();//submit butonuna basıldıgında uyarı vermesi icin
        console.log("Giriş yapılamadı");
    }
    else
   {
  let hash = CryptoJS.SHA256(this.password1.value).toString(CryptoJS.enc.Hex);
  this.veritab.getuser(this.tc_no,hash).subscribe((res:any)=>{
    this.giris_bilgi=res;
    console.log("Succes===",res);
    if(this.giris_bilgi.length)
    {
      console.log("tel guncelleme basarılı");
       //kayıt işlemi icin gidecek
       this.veritab.updatetel(this.tc_no,this.tel.value).subscribe((res:any)=>{
        console.log("Succes===");
       this.loading_tel();
      },(error:any)=>
      {
        console.log("ERORR===",error);
      })
    }
    else
    {
       this.hata_loading_tel();
      console.log("tel guncelleme basarısız");
    }



  },(error:any)=>
  {
    console.log("ERORR===",error);
  })

}
    }


    async mail_alert() {
      const alert = await this.alertController.create({
        cssClass: 'gif_alert_css',
    message:`<div class="success-checkmark">
    <div class="check-icon">
      <span class="icon-line line-tip"></span>
      <span class="icon-line line-long"></span>
      <div class="icon-circle"></div>
      <div class="icon-fix"></div>
    </div>
  </div>`+'Mail adresiniz güncellenmiştir.',
        buttons: ['TAMAM']
      });
  
      await alert.present();
      this.modal_kapat();  
      const { role } = await alert.onDidDismiss();

    }

    
    async pw_alert() {
      const alert = await this.alertController.create({
        cssClass: 'gif_alert_css',
    message:`<div class="success-checkmark">
    <div class="check-icon">
      <span class="icon-line line-tip"></span>
      <span class="icon-line line-long"></span>
      <div class="icon-circle"></div>
      <div class="icon-fix"></div>
    </div>
  </div>`+'Şifreniz güncellenmiştir.',
        buttons: ['TAMAM']
      });
  
      await alert.present();
      this.modal_kapat();  
      const { role } = await alert.onDidDismiss();

    }


    async mail_hata_alert() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'HATA',
        message: 'Hatalı şifre! Mail adresiniz güncellenemedi..',
        buttons: ['TAMAM']
      });
      await alert.present(); 
      const { role } = await alert.onDidDismiss();

    }

    async pw_hata_alert() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'HATA',
        message: 'Hatalı şifre! Şifreniz güncellenemedi..',
        buttons: ['TAMAM']
      });
      await alert.present(); 
      const { role } = await alert.onDidDismiss();

    }


    
    
    async tel_hata_alert() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'HATA',
        message: 'Hatalı şifre! Telefon numaranız güncellenemedi.',
        buttons: ['TAMAM']
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();

    }

    async tel_alert() {
      const alert = await this.alertController.create({
        cssClass: 'gif_alert_css',
        message:`<div class="success-checkmark">
        <div class="check-icon">
          <span class="icon-line line-tip"></span>
          <span class="icon-line line-long"></span>
          <div class="icon-circle"></div>
          <div class="icon-fix"></div>
        </div>
      </div>`+'Telefon numaranız güncellenmiştir.',
        buttons: ['TAMAM']
      });
  
      await alert.present();
      this.modal_kapat();  
      const { role } = await alert.onDidDismiss();

    }


    async loading_tel() {
      const loading = await this.loadingController.create({
        cssClass: 'lutfen_bekleyin_class',
        message: 'Lütfen bekleyin...',
        duration: 400,
        spinner:'crescent'
      });
      await loading.present();
      console.log('tel guncelleme basarılı loading');
      this.tel_alert();

    }

    async loading_pw() {
      const loading = await this.loadingController.create({
        cssClass: 'lutfen_bekleyin_class',
        message: 'Lütfen bekleyin...',
        duration: 400,
        spinner:'crescent'
      });
      await loading.present();
      console.log('tel guncelleme basarılı loading');
     this.pw_alert();

    }

    async hata_loading_pw() {
      const loading = await this.loadingController.create({
        cssClass: 'lutfen_bekleyin_class',
        message: 'Lütfen bekleyin...',
        duration: 400,
        spinner:'crescent'
      });
      await loading.present();
      console.log('mail guncelleme basarılı loading');
      this.pw_hata_alert();

    }


    
    async loading_mail() {
      const loading = await this.loadingController.create({
        cssClass: 'lutfen_bekleyin_class',
        message: 'Lütfen bekleyin...',
        duration: 400,
        spinner:'crescent'
      });
      await loading.present();
      console.log('mail guncelleme basarılı loading');
      this.mail_alert();

    }


    async hata_loading_mail() {
      const loading = await this.loadingController.create({
        cssClass: 'lutfen_bekleyin_class',
        message: 'Lütfen bekleyin...',
        duration: 400,
        spinner:'crescent'
      });
      await loading.present();
      console.log('mail guncelleme basarılı loading');
      this.mail_hata_alert();

    }

    async hata_loading_tel() {
      const loading = await this.loadingController.create({
        cssClass: 'lutfen_bekleyin_class',
        message: 'Lütfen bekleyin...',
        duration: 400,
        spinner:'crescent'
      });
      await loading.present();
      console.log('mail guncelleme basarılı loading');
      this.tel_hata_alert();

    }
  

    }
  

