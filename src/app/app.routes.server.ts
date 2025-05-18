import { RenderMode, ServerRoute } from '@angular/ssr';
export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin/*',
    renderMode: RenderMode.Client,
  },
  {
    path: 'servicos',
    renderMode: RenderMode.Prerender,
  },  {
    path: 'quem-sou',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
