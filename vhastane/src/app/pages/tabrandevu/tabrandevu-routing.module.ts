import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabrandevuPage } from './tabrandevu.page';

const routes: Routes = [
  {
    path: '',
    component: TabrandevuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabrandevuPageRoutingModule {}
