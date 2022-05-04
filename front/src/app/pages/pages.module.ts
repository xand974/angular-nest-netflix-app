import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { NotFoundModule } from './not-found/not-found.module';
import { WatchModule } from './watch/watch.module';
import { BrowseModule } from './browse/browse.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterModule,
    LoginModule,
    NotFoundModule,
    WatchModule,
    BrowseModule,
    PagesRoutingModule,
  ],
})
export class PagesModule {}
