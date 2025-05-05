import { Routes } from '@angular/router';
import { SignInComponent } from './features/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => import('./features/sign-in/sign-in.component').then(m => m.SignInComponent)
  },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
];
