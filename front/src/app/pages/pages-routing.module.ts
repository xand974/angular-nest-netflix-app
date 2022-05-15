import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
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
