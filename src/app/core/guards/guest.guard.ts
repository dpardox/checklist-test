import { inject } from '@angular/core';
import { user } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { map, tap } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    tap(user => {
      user && router.navigate(['/tasks']);
    }),
    map(user => !user),
  );
};
