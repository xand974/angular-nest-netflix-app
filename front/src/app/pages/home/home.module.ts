import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { NavbarModule } from './components/navbar/navbar.module';
import { BillboardModule } from './components/billboard/billboard.module';
import { MovieListModule } from './components/movie-list/movie-list.module';

@NgModule({
  imports: [CommonModule, NavbarModule, BillboardModule, MovieListModule],
  declarations: [HomeComponent],
  providers: [HomeService],
  exports: [HomeComponent],
})
export class HomeModule {}
