import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabevPage } from './tabev.page';

const routes: Routes = [
  {
    path: '',
    component: TabevPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabevPageRoutingModule {}
