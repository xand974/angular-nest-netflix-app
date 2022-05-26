import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarLayoutComponent } from './navbar-layout.component';
import { NavbarModule } from '../../pages/home/components/navbar/navbar.module';
import { NavbarLayoutRoutingModule } from './navbar-layout-router.module';
import { HomeModule } from '../../pages/home/home.module';
import { SearchModule } from 'src/app/pages/search/search.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    NavbarLayoutRoutingModule,
    HomeModule,
    RouterModule,
    SearchModule,
  ],
  declarations: [NavbarLayoutComponent],
  exports: [NavbarLayoutComponent],
})
export class NavbarLayoutModule {}
