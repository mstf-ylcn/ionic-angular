import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {LoginPage} from '../pages/login/login.page';
import {SignUpPage} from '../pages/sign-up/sign-up.page';
import {format} from "date-fns";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalCtr:ModalController) {
    console.log("home sayfası acıldı");
  }

date:any;
 async login()
  {
    const modal = await this.modalCtr.create({
      component: LoginPage,
      cssClass: 'modal_login_class'
    });
     await modal.present();
  }

  async sign_up()
  {
    const modal = await this.modalCtr.create({
      component: SignUpPage,
      cssClass: 'modal_sign_class'
    });
     await modal.present();
  }


  //tarih format
  cevir()
  {
    this.date=format(new Date(this.date), "yyyy-MM-dd");
  }

}
