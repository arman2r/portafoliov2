import { Route } from '@angular/router';
//import { RemoteEntryComponent } from './entry.component';
import { HomeComponent } from '../pages/home.component';
import { PresentationComponent } from '../pages/presentation/presentation.component';
import { SkillsComponent } from '../pages/skills/skills.component';
import { ExperienceComponent } from '../pages/experience/experience.component';
import { ContactComponent } from '../pages/contact/contact.component';

export const remoteRoutes: Route[] = [
  //{ path: '', component: RemoteEntryComponent },
  {
    path: '',
    redirectTo: 'home#presentacion',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'presentacion',
        component: PresentationComponent
      }
    ]
  },
  {
    path: 'skills',
    component: SkillsComponent
  },
  {
    path: 'experiencia',
    component: ExperienceComponent
  },
  {
    path: 'contactar',
    component: ContactComponent
  }
];
