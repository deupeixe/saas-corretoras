import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'imovel-no-maranhao/:slug',
    loadComponent: () => import('./views/property-details/property-details.component').then(c => c.PropertyDetailsComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./views/admin/admin-container/admin-container.component').then(c => c.AdminContainerComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./views/admin/admin-dashboard/admin-dashboard.component').then(c => c.AdminDashboardComponent),
      },
      {
        path: 'imoveis',
        loadComponent: () => import('./views/admin/admin-properties/admin-properties.component').then(c => c.AdminPropertiesComponent),
      },
      {
        path: 'leads',
        loadComponent: () => import('./views/admin/admin-leads/admin-leads.component').then(c => c.AdminLeadsComponent),
      },
    ]
  }
];
