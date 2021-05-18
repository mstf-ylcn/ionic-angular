import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsonucPage } from './tabsonuc.page';

const routes: Routes = [
  {
    path: '',
    component: TabsonucPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsonucPageRoutingModule {}
