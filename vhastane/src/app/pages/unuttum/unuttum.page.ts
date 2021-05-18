import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup,FormBuilder,Validator, Validators, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import * as moment from 'moment';

import CryptoJS from 'crypto-js';
import { VeritabService } from '../../veritab.service';

@Component({
  selector: 'app-unuttum',
  templateUrl: './unuttum.page.html',
  styleUrls: ['./unuttum.page.scss'],
})
export class UnuttumPage implements OnInit {

  constructor(private modalctrl:ModalController,private formbuilder:FormBuilder,
    public veritab:VeritabService,
    public loadingController: LoadingController,public alertController: AlertController) { }

  ngOnInit() {
    this.validator();
    this.validator2();
  }
  form : FormGroup;
    data:any;

    validator(){
      this.form = new FormGroup({
        tc_no: new FormControl(null,{validators:[Validators.required,Validators.minLength(11),Validators.pattern('[0-9]*')]}),
        email: new FormControl(null,{validators:[Validators.required,Validators. pattern("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})")]}),
      });
    }

    form2 : FormGroup;
    data2:any;

    validator2(){
      this.form2 = new FormGroup({
        password: new FormControl(null,{validators:[Validators.required,Validators.minLength(8),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&+/|.,#^()_-])[A-Za-z\d$@$!%*?&+/|.,#^()_-].{7,}')]}),
  
      });
    }



    get tc_no()
    {
      return this.form.get('tc_no');
    }
    get email()
    {
      return this.form.get('email');
    }
    get password()
    {
      return this.form2.get('password');
    }

  giris_bilgi;
    unuttum()
    {

    if(!this.form.valid)
    {
      this.form.markAllAsTouched();//submit butonuna basıldıgında uyarı vermesi icin
      console.log("Giriş yapılamadı");
    }
    else
    {
   

      this.veritab.forgetpw(this.tc_no.value,this.email.value).subscribe((res:any)=>{
        this.giris_bilgi=res;
        console.log("Succes===",res);
        if(this.giris_bilgi.length)
        {
          this.loading();
        }
        else
       {
        this.hata_loading();
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
  console.log('basarılı loading');
  this.sayfa=0;
}


async loading2() {
  const loading = await this.loadingController.create({
    cssClass: 'lutfen_bekleyin_class',
    message: 'Lütfen bekleyin...',
    duration: 400,
    spinner:'crescent'
  });
  await loading.present();
  console.log('basarılı loading');
  this.pw_alert();
}



async hata_loading() {
  const loading = await this.loadingController.create({
    cssClass: 'lutfen_bekleyin_class',
    message: 'Lütfen bekleyin...',
    duration: 500,
    spinner:'crescent'
  });
  await loading.present();
  console.log('sifre hata loading');
 this.hata_alert();

}

    
async hata_alert() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'HATA',
    message: 'Hatalı T.C. Kimlik No veya E-Posta !.Lütfen tekrar deneyiniz.',
    buttons: ['TAMAM']
  });
  await alert.present();
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




sayfa=1;
sifre_sifirla()
{


  if(!this.form2.valid)
  {
    this.form2.markAllAsTouched();//submit butonuna basıldıgında uyarı vermesi icin
    console.log("Giriş yapılamadı");
  }
  else
  {

  let pw = CryptoJS.SHA256(this.password.value).toString(CryptoJS.enc.Hex);
  this.veritab.updatepw(this.tc_no.value,pw).subscribe((res:any)=>{
    console.log("Succes===");
    this.loading2();
  },(error:any)=>
  {
    console.log("ERORR===",error);
  })
}
}




  modal_kapat()
  {
    this.modalctrl.dismiss();
  }


  hide=1;
  password_type="password";
  show_pw1()
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








}
