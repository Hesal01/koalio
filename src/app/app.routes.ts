import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
