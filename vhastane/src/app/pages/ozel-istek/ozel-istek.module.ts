import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OzelIstekPageRoutingModule } from './ozel-istek-routing.module';

import { OzelIstekPage } from './ozel-istek.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OzelIstekPageRoutingModule
  ],
  declarations: [OzelIstekPage]
})
export class OzelIstekPageModule {}
