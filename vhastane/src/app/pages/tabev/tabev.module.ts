import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabevPageRoutingModule } from './tabev-routing.module';

import { TabevPage } from './tabev.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabevPageRoutingModule
  ],
  declarations: [TabevPage]
})
export class TabevPageModule {}
