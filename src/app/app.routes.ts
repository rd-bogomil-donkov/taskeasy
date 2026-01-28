import { Routes } from '@angular/router';
import { NotFound } from './shared/components/not-found/not-found'
import { Dashboard } from './features/dashboard/dashboard';
import { AuthGuard } from './core/auth/auth.guard';
import { DashboardGuard } from './core/auth/login.guard';
import { Auth } from './core/auth/auth';
import { Register } from './core/register/register';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Auth, canActivate: [DashboardGuard] },
    { path: 'register', component: Register, canActivate: [DashboardGuard] },
    { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
    { path: '**', component: NotFound }
];
