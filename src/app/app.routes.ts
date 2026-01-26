import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { NotFound } from './shared/components/not-found/not-found'
import { Dashboard } from './features/dashboard/dashboard';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginGuard } from './core/auth/login.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login, canActivate: [LoginGuard] },
    { path: 'register', component: Register },
    { path: 'tasks', component: Dashboard, canActivate: [AuthGuard] },
    { path: '**', component: NotFound }
];
