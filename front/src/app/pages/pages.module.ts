import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { NotFoundModule } from './not-found/not-found.module';
import { WatchModule } from './watch/watch.module';
import { BrowseModule } from './browse/browse.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NavbarLayoutModule } from '../layout/navbar-layout/navbar-layout.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterModule,
    LoginModule,
    NotFoundModule,
    WatchModule,
    BrowseModule,
    PagesRoutingModule,
    NavbarLayoutModule,
  ],
})
export class PagesModule {}
