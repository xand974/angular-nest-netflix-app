import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { NavbarLinksModule } from '../navbar-links/navbar-links.module';
import { SearchInputModule } from '../search-input/search-input.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NavbarLinksModule,
    SearchInputModule,
    DropdownModule,
    RouterModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
