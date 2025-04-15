import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'about',
    loadChildren: () => import('about/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'sidenavmenu',
    loadChildren: () =>
      import('sidenavmenu/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'admin',
    loadChildren: () => import('admin/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about',
  },
];
