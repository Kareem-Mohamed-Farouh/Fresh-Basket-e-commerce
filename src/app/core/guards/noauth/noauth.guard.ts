import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const pLATFORM_ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(pLATFORM_ID)) {
    const token = localStorage.getItem('basketToken');
    if (token !== undefined && token !== '') {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }

  return true;
};
