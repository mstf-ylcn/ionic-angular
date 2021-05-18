import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnuttumPageRoutingModule } from './unuttum-routing.module';

import { UnuttumPage } from './unuttum.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    UnuttumPageRoutingModule
  ],
  declarations: [UnuttumPage]
})
export class UnuttumPageModule {}
