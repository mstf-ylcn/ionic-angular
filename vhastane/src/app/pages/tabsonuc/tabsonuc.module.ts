import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsonucPageRoutingModule } from './tabsonuc-routing.module';

import { TabsonucPage } from './tabsonuc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsonucPageRoutingModule
  ],
  declarations: [TabsonucPage]
})
export class TabsonucPageModule {}
