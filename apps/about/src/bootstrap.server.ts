import { bootstrapApplication } from '@angular/platform-browser';
import { RemoteEntryComponent } from './app/remote-entry/entry.component';
import { config } from './app/app.config.server';
import { API_BASE_URL } from '@portafolio/shared-data';

const bootstrap = () => bootstrapApplication(RemoteEntryComponent, {
    ...config,
    providers:[
        ...config.providers!,
        { provide: API_BASE_URL, useValue: API_BASE_URL }
    ]
});

export default bootstrap;
