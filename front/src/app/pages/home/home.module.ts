import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { NavbarModule } from './components/navbar/navbar.module';

@NgModule({
  imports: [CommonModule, NavbarModule],
  declarations: [HomeComponent],
  providers: [HomeService],
  exports: [HomeComponent],
})
export class HomeModule {}
