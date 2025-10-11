import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth-guard';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegisterComponent } from './components/register/register/register.component';

export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'team',
        loadChildren: () => import('./pages/team/team.module').then((m) => m.TeamModule),
      },
      {
        path: 'player',
        loadChildren: () => import('./pages/player/player.module').then((m) => m.PlayerModule),
      },
      {
        path: 'match',
        loadChildren: () => import('./pages/match/match.module').then((m) => m.MatchModule),
      },
      {
        path: 'report',
        loadChildren: () => import('./pages/report/report.module').then((m) => m.ReportModule),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: '/login' },
];
