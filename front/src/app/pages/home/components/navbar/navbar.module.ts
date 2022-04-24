import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { NavbarLinksModule } from '../navbar-links/navbar-links.module';
import { SearchModule } from '../search/search.module';
import { DropdownModule } from '../dropdown/dropdown.module';

@NgModule({
  imports: [CommonModule, NavbarLinksModule, SearchModule, DropdownModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
