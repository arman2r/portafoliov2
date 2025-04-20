import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { MenuComponent } from '../components/menu.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryComponent,
    children: [
      {
        path: '',
        component: MenuComponent,
        pathMatch: 'full',
      },
    ],
  },
];
