import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CovidModalPage } from './covid-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CovidModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CovidModalPageRoutingModule {}
