import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'imoveis/:slug',
    loadComponent: () => import('./views/property-details/property-details.component').then(c => c.PropertyDetailsComponent)
  }
];
