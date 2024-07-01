import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'map',
    loadComponent: () => import('./pages/map/map.page').then( m => m.MapPage)
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then( m => m.AuthPage)
  },
  {
    path: 'reference',
    loadComponent: () => import('./pages/reference/reference.page').then( m => m.ReferencePage)
  },
  {
    path: 'card-image',
    loadComponent: () => import('./pages/card-image/card-image.page').then( m => m.CardImagePage)
  },
  {
    path: 'trips',
    loadComponent: () => import('./pages/trips/trips.page').then( m => m.TripsPage)
  },
  {
    path: 'stations',
    loadComponent: () => import('./pages/stations/stations.page').then( m => m.StationsPage)
  },

];
