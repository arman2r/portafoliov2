import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { API_BASE_URL } from '@portafolio/shared-data';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // o 'enabled'
        anchorScrolling: 'enabled',
      })), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    { provide: API_BASE_URL, useValue: environment.apiUrl }
  ],
};
