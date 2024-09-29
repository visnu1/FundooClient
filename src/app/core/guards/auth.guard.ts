import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token: string | null = localStorage.getItem('token');
  const router = inject(Router);

  if (token)
    return true;
  else {
    // Redirect to login page if no token is found
    router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
