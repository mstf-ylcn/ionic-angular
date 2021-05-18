import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabrandevuPageRoutingModule } from './tabrandevu-routing.module';

import { TabrandevuPage } from './tabrandevu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabrandevuPageRoutingModule
  ],
  declarations: [TabrandevuPage]
})
export class TabrandevuPageModule {}
