import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-covid-modal',
  templateUrl: './covid-modal.page.html',
  styleUrls: ['./covid-modal.page.scss'],
})
export class CovidModalPage implements OnInit {

  constructor(private modalctrl:ModalController) {
    console.log("covid modal acıldı");
   }

  ngOnInit() {
  }


  modaldismiss() {

    this.modalctrl.dismiss();
    }

}
