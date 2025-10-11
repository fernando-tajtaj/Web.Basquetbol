import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Verifica si el usuario está logueado
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const expectedRole = route.data['expectedRole'];
  const userRole = authService.getRole();

  if (expectedRole && userRole !== expectedRole) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
