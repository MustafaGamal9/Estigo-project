import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'top' // scroll to top when navigate to any page
    })), 
    // provideRouter(routes) , replace with this to remove the scroll effect
    provideClientHydration(withEventReplay()),
    provideHttpClient()
  ]
};
