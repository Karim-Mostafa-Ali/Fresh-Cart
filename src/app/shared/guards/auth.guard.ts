import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
  if (localStorage.getItem('eToken') != null) {
    //User Loged
    return true;
  } else {
    _router.navigate(['/login']);
    return false;
  }
};
