import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { APP_INITIALIZER, isDevMode } from '@angular/core';
import { inject } from '@vercel/analytics';

// Factory function to initialize Vercel Analytics
export function initializeAnalytics() {
  return () => {
    inject({ mode: isDevMode() ? 'development' : 'production' });
  };
}

// Add APP_INITIALIZER to appConfig
const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAnalytics,
      multi: true,
    },
  ],
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .catch((err) => console.error(err));
