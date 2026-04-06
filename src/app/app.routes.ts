import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'dashboard3',
    loadComponent: () => import('./features/dashboard3/dashboard3.component').then(m => m.Dashboard3Component),
  },
  {
    path: 'dashboard4',
    loadComponent: () => import('./features/dashboard4/dashboard4.component').then(m => m.Dashboard4Component),
  },
  {
    path: 'dashboard5',
    loadComponent: () => import('./features/dashboard5/dashboard5.component').then(m => m.Dashboard5Component),
  },
  {
    path: 'dashboard6',
    loadComponent: () => import('./features/dashboard6/dashboard6.component').then(m => m.Dashboard6Component),
  },
  {
    path: 'dashboard7',
    loadComponent: () => import('./features/dashboard7/dashboard7.component').then(m => m.Dashboard7Component),
  },
  {
    path: 'dashboard8',
    loadComponent: () => import('./features/dashboard8/dashboard8.component').then(m => m.Dashboard8Component),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'generate',
    loadComponent: () => import('./features/generator/generator-form.component').then(m => m.GeneratorFormComponent),
  },
  {
    path: 'result/:id',
    loadComponent: () => import('./features/generator/generator-result.component').then(m => m.GeneratorResultComponent),
  },
  {
    path: 'history',
    loadComponent: () => import('./features/history/history.component').then(m => m.HistoryComponent),
  },
];
