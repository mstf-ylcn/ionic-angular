import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RandevualModalPage } from './randevual-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RandevualModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RandevualModalPageRoutingModule {}
