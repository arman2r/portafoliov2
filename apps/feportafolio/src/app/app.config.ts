import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { API_BASE_URL, AuthInterceptor, environment } from '@portafolio/shared-data';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { provideServerRendering } from '@angular/platform-server';
 
export function tokenGetter() {
  return localStorage.getItem('auth_token_ingrubio');
}

// HTTP Providers
const httpProviders = [
  provideHttpClient(withFetch(), withInterceptorsFromDi()),
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

// JWT Providers
const jwtProviders = [
  importProvidersFrom(
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ["ingrubio.com", "localhost:4200", "localhost:3000", "https://portafolio-be.onrender.com"],
        disallowedRoutes: [],
      },
    }),
  ),
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  JwtHelperService,
];

// Router Providers
const routerProviders = [
  provideRouter(
    appRoutes,
    withComponentInputBinding(),
    withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })
  )
];

// Global App Providers
export const appConfig: ApplicationConfig = {
  providers: [
    //provideServerRendering(),
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    { provide: API_BASE_URL, useValue: environment.apiUrl },
    ...jwtProviders,
    ...routerProviders,
    ...httpProviders,
    
  ],
};