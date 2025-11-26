import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../features/auth/login/auth.service';
import { Request } from 'express';
import { RequestHandlerFunction } from '@angular/ssr';


import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { catchError, map, of } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    console.log('Guard SSR → skip check');
    return of(true);
  }

  // Nếu user đã có trong AuthService thì cho qua
  // if (authService.isAuthenticated()) {
  //   console.log("a");
  //   return true;
  // }
  console.log("a");
  return authService.initAuthCheck().pipe(
    map(user => {
      console.log(user)
      if (user?.role == "ADMIN") {
        return true;
      }
      else {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false
      }

    }),
    catchError(() => {
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return of(false);
    })
  );

};