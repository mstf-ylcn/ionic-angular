import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetePage } from './recete.page';

const routes: Routes = [
  {
    path: '',
    component: RecetePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetePageRoutingModule {}
