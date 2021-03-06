import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarLayoutComponent } from './navbar-layout.component';
import { NavbarModule } from '../../@core/navbar/navbar/navbar.module';
import { NavbarLayoutRoutingModule } from './navbar-layout-router.module';
import { HomeModule } from '../../pages/home/home.module';
import { SearchModule } from 'src/app/pages/search/search.module';
import { RouterModule } from '@angular/router';
import { MyListModule } from '../../pages/my-list/my-list.module';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    NavbarLayoutRoutingModule,
    HomeModule,
    RouterModule,
    SearchModule,
    MyListModule,
  ],
  declarations: [NavbarLayoutComponent],
  exports: [NavbarLayoutComponent],
})
export class NavbarLayoutModule {}
