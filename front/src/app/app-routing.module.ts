import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/browse',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RedirectGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
