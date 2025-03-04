import { RenderMode, ServerRoute } from '@angular/ssr';
// src\app\app.routes.server.ts
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
