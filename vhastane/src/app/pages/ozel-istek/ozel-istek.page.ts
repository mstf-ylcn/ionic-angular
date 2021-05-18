import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ozel-istek',
  templateUrl: './ozel-istek.page.html',
  styleUrls: ['./ozel-istek.page.scss'],
})
export class OzelIstekPage implements OnInit {

  constructor(private modalctrl:ModalController, public loadingController: LoadingController,public alertController: AlertController) { }

  ngOnInit() {
  }

  modal_kapat()
  {
    this.modalctrl.dismiss();

  }


  
async loading() {
  const loading = await this.loadingController.create({
    cssClass: 'lutfen_bekleyin_class',
    message: 'Lütfen bekleyin...',
    duration: 400,
    spinner:'crescent'
  });
  await loading.present();
  console.log('İstek loading');
  this.onay_alert();
}


async onay_alert() {
  const alert = await this.alertController.create({
    cssClass: 'gif_alert_css',
message:`<div class="success-checkmark">
<div class="check-icon">
  <span class="icon-line line-tip"></span>
  <span class="icon-line line-long"></span>
  <div class="icon-circle"></div>
  <div class="icon-fix"></div>
</div>
</div>`+'İstek veya Şikayetiniz başarıyla gönderilmiştir.',
    buttons: ['TAMAM']
  });

  await alert.present();
  this.modal_kapat();  
  const { role } = await alert.onDidDismiss();

}

  gonder()
  {
 
    console.log("geldi");



  //veritab gonder



    this.loading();
  }






}
