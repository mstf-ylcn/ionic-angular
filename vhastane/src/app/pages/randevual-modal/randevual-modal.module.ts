import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RandevualModalPageRoutingModule } from './randevual-modal-routing.module';

import { RandevualModalPage } from './randevual-modal.page';
import { CalendarModule } from 'ion2-calendar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RandevualModalPageRoutingModule,
    CalendarModule
  ],
  declarations: [RandevualModalPage]
})
export class RandevualModalPageModule {}
