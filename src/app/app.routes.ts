import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component'; // <-- New Import

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'access-denied', component: AccessDeniedComponent }, // <-- New route
];
