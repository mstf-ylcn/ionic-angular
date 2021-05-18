import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CovidModalPageRoutingModule } from './covid-modal-routing.module';

import { CovidModalPage } from './covid-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CovidModalPageRoutingModule
  ],
  declarations: [CovidModalPage]
})
export class CovidModalPageModule {}
