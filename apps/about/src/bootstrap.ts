import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { RemoteEntryComponent } from './app/remote-entry/entry.component';
import { API_BASE_URL, SkillsService } from '@portafolio/shared-data';
import { environment } from '@portafolio/shared-data';

bootstrapApplication(RemoteEntryComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers!,
    { provide: API_BASE_URL, useValue: environment.apiUrl },
    SkillsService
  ],
}).catch((err) =>
  console.error(err)
);
