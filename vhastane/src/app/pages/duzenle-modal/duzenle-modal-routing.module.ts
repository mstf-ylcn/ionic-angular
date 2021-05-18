import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DuzenleModalPage } from './duzenle-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DuzenleModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuzenleModalPageRoutingModule {}
