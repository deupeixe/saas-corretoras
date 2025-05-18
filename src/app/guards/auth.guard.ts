import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStoreService } from '../store/auth-store.service';
import { Auth } from '@angular/fire/auth';

export const authGuard: CanActivateFn = async (route, state) => {
  const auth = inject(Auth);
  const authStore = inject(AuthStoreService);
  const router = inject(Router);
  await authStore.actionIsAuth()
  if(authStore.select.isAuth() || auth.currentUser){
    return true
  }
  router.navigate(['/admin/login']);
  return false;
};
