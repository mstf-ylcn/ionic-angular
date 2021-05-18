import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-hakkimizda',
  templateUrl: './hakkimizda.page.html',
  styleUrls: ['./hakkimizda.page.scss'],
})
export class HakkimizdaPage implements OnInit {

  constructor(private modalctrl:ModalController) { }

  ngOnInit() {
  }
  
  modal_kapat()
  {
   this.modalctrl.dismiss();
  }
}
