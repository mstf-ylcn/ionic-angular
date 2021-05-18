import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DuzenleModalPageRoutingModule } from './duzenle-modal-routing.module';

import { DuzenleModalPage } from './duzenle-modal.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    DuzenleModalPageRoutingModule
  ],
  declarations: [DuzenleModalPage]
})
export class DuzenleModalPageModule {}
