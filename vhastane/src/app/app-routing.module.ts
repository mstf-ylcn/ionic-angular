import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CalendarModule } from 'ion2-calendar';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'covid-modal',
    loadChildren: () => import('./pages/covid-modal/covid-modal.module').then( m => m.CovidModalPageModule)
  },
  {
    path: 'randevual-modal',
    loadChildren: () => import('./pages/randevual-modal/randevual-modal.module').then( m => m.RandevualModalPageModule)
  },
  {
    path: 'recete',
    loadChildren: () => import('./pages/recete/recete.module').then( m => m.RecetePageModule)
  },
  {
    path: 'duzenle-modal',
    loadChildren: () => import('./pages/duzenle-modal/duzenle-modal.module').then( m => m.DuzenleModalPageModule)
  },
  {
    path: 'unuttum',
    loadChildren: () => import('./pages/unuttum/unuttum.module').then( m => m.UnuttumPageModule)
  },
  {
    path: 'hakkimizda',
    loadChildren: () => import('./pages/hakkimizda/hakkimizda.module').then( m => m.HakkimizdaPageModule)
  },
  {
    path: 'ozel-istek',
    loadChildren: () => import('./pages/ozel-istek/ozel-istek.module').then( m => m.OzelIstekPageModule)
  }
];

@NgModule({
  imports: [FormsModule,ReactiveFormsModule,CommonModule,CalendarModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
