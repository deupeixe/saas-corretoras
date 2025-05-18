import { Routes } from '@angular/router';
import { NotfoundComponent } from './views/notfound/notfound.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'links',
    loadComponent: () => import('./views/link/link.component').then(c => c.LinkComponent)
  },
  {
    path: 'imoveis-no-maranhao',
    loadComponent: () => import('./views/imoveis/imoveis.component').then(c => c.ImoveisComponent)
  },
  {
    path: 'imovel-no-maranhao/:slug',
    loadComponent: () => import('./views/property-details/property-details.component').then(c => c.PropertyDetailsComponent)
  },
  {
    path: 'quem-sou',
    loadComponent: () => import('./views/quem-sou/quem-sou.component').then(c => c.QuemSouComponent)
  },
  {
    path: 'servicos',
    loadComponent: () => import('./views/servicos/servicos.component').then(c => c.ServicosComponent)
  },
  {
    path: 'politica-de-privacidade',
    loadComponent: () => import('./views/politica-privacidade/politica-privacidade.component').then(c => c.PoliticaPrivacidadeComponent)
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
  },
  { path: '**', component: NotfoundComponent }
];
