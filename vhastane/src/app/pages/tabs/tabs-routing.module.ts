import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'tabev',
        loadChildren: () => import('../tabev/tabev.module').then( m => m.TabevPageModule)
      },
      {
        path: 'tabrandevu',
        loadChildren: () => import('../tabrandevu/tabrandevu.module').then( m => m.TabrandevuPageModule)
      },
      {
        path: 'tabsonuc',
        loadChildren: () => import('../tabsonuc/tabsonuc.module').then( m => m.TabsonucPageModule)
      },
      {
        path: 'tabhesap',
        loadChildren: () => import('../tabhesap/tabhesap.module').then( m => m.TabhesapPageModule)
      }
    ]
  },
  {
    path:'',
    redirectTo: '/tabs/tabev',
    pathMatch:'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
