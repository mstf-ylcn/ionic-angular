import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { VeritabService } from '../../veritab.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import CryptoJS from 'crypto-js';
import { Veri } from '../../tabservice';
import { UnuttumPage } from '../unuttum/unuttum.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private modalCtrl:ModalController, private formbuilder:FormBuilder,
    public veritab:VeritabService,public alertController: AlertController,
    public loadingController: LoadingController,private router:Router,
    private veri: Veri) {
    console.log("login modal acildi");
   }


  form : FormGroup;
  data=new Date().toISOString(); 

  ngOnInit() {
   this.validator();
  }

  //Tc ve şifre için kosullar
  validator(){
    this.form = new FormGroup({
      tc_no: new FormControl(null,{validators:[Validators.required,Validators.minLength(11)]}),//11 yap
      password: new FormControl(null,{validators:[Validators.required,Validators.minLength(8)]}),
    });
  }

  get tc_no()
  {
    return this.form.get('tc_no');
  }

  get password()
  {
    return this.form.get('password');
  }


giris_bilgi;

  login()
  {
    if(!this.form.valid)
    {
      this.form.markAllAsTouched();//submit butonuna basıldıgında uyarı vermesi icin
      console.log("Giriş yapılamadı");
  }
  else
  {
       let hash = CryptoJS.SHA256(this.password.value).toString(CryptoJS.enc.Hex); //sifre hashlendi
      this.veritab.getuser(this.tc_no.value,hash).subscribe((res:any)=>{
        this.giris_bilgi=res;
        console.log("Succes===",res);

         
      if(this.giris_bilgi.length)
      {
        console.log("Grisi basarılı");
        this.giris_loading();
      }
      else
      {
        this.hata_loading();
        console.log("Giris basarısız");
      }
   
      },(error:any)=>
      {
        console.log("ERORR===",error);
      })



  
  // this.data=this.form.getRawValue();//login page den gelen datalar
      // console.log("Giriş yapıldı");
  
  }
}



async hata() {
  const alert = await this.alertController.create({
    cssClass: 'giris_hata_css',
    header: 'Hata',
    message: 'Hatalı T.C. No veya Şifre girişi yapılmıştır! Lütfen bilgilerinizi kontrol ederek tekrar deneyiniz.',
    buttons: ['TAMAM']
  });

  await alert.present();
}


async hata_loading() {
  const loading = await this.loadingController.create({
    cssClass: 'lutfen_bekleyin_class',
    message: 'Lütfen bekleyin...',
    duration: 300,
    spinner:'crescent'
  });
  await loading.present();
  console.log('Yükleme bitti');
  this.hata();
}


async giris_loading() {
  const loading = await this.loadingController.create({
    cssClass: 'lutfen_bekleyin_class',
    message: 'Lütfen bekleyin...',
    duration: 300,
    spinner:'crescent'
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
  console.log('Yükleme bitti');
  

  // this.router.navigate(  ['tabs/tabev'], { state: { tc: this.tc_no.value } }); servis olmadan gonderdıgım
 
  this.veri.gonder(this.tc_no.value); //Her sayfadan ulasabılmek icin tc_no servis tabservice dosyasına yolladık.
  this.router.navigate(['tabs/tabev']);
  // this.router.navigate(["tabs/tabev",{"tc":this.tc_no.value}]);

  this.modaldismiss();
}




  password_type="password";//sifre gorunebilirlik icin
  hide=1;
  tc="tel";


  modaldismiss() {

  this.modalCtrl.dismiss();
  }


  //sifrenin gorunurluk fonksiyonu
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
  
  // //tc icin sayı kosulu
  // tc_validate(event)
  // {
  //     return event.charCode >= 48 && event.charCode <= 57;
  // }
 async sifremi_unuttum()
  {
   
      const modal = await this.modalCtrl.create({
        component: UnuttumPage,
        cssClass: 'modal_unuttum_class'
      });
       await modal.present();
    }
  }
  
