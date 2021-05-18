import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HakkimizdaPageRoutingModule } from './hakkimizda-routing.module';

import { HakkimizdaPage } from './hakkimizda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HakkimizdaPageRoutingModule
  ],
  declarations: [HakkimizdaPage]
})
export class HakkimizdaPageModule {}
