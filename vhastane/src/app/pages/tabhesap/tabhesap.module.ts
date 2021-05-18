import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabhesapPageRoutingModule } from './tabhesap-routing.module';

import { TabhesapPage } from './tabhesap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabhesapPageRoutingModule
  ],
  declarations: [TabhesapPage]
})
export class TabhesapPageModule {}
