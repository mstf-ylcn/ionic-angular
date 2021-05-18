import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetePageRoutingModule } from './recete-routing.module';

import { RecetePage } from './recete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetePageRoutingModule
  ],
  declarations: [RecetePage]
})
export class RecetePageModule {}
