import { ApplicationConfig, inject, InjectionToken, provideZoneChangeDetection, provideAppInitializer } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { AuthService } from './features/auth/login/auth.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { provideServerRendering } from '@angular/ssr';

export const AUTH_SERVICE_TOKEN = new InjectionToken<AuthService>('Auth Service');

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient(
    withFetch(),
    withInterceptors([
      (req, next) => {
        const cloned = req.clone({ withCredentials: true });
        return next(cloned);
      },
    ])
  ),
  provideRouter(routes), provideClientHydration(withEventReplay(),)]
};
