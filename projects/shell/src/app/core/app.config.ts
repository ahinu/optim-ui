import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BASE_ROUTES } from '../app.routes';
import { shellInitializer } from './app.initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(BASE_ROUTES),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: shellInitializer
    }
  ]
};