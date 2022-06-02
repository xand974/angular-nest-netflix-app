import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { NavbarModule } from '../../@core/navbar/navbar/navbar.module';
import { BillboardModule } from './components/billboard/billboard.module';
import { MovieListModule } from './components/movie-list/movie-list.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeStore } from './home.store';
import { NbSpinnerModule } from '@nebular/theme';
import { LoadingModule } from 'src/app/ui/loading/loading/loading.module';
@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    BillboardModule,
    HomeRoutingModule,
    MovieListModule,
    NbSpinnerModule,
    LoadingModule,
  ],
  declarations: [HomeComponent],
  providers: [HomeService, HomeStore],
  exports: [HomeComponent],
})
export class HomeModule {}
