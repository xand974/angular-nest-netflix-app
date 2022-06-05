import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarLinksComponent } from './navbar-links.component';
import { NbIconModule } from '@nebular/theme';

@NgModule({
  imports: [CommonModule, NbIconModule],
  declarations: [NavbarLinksComponent],
  exports: [NavbarLinksComponent],
})
export class NavbarLinksModule {}
