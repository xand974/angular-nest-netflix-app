import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { NavbarLayoutComponent } from '../layout/navbar-layout/navbar-layout.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: NavbarLayoutComponent,
    loadChildren: () =>
      import('../layout/navbar-layout/navbar-layout.module').then(
        (m) => m.NavbarLayoutModule
      ),
  },
  {
    path: 'watch/:id',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./watch/watch.module').then((m) => m.WatchModule),
  },
  {
    path: 'browse',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./browse/browse.module').then((m) => m.BrowseModule),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
