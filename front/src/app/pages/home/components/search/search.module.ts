import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { NbIconModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, NbIconModule, FormsModule],
  declarations: [SearchComponent],
  exports: [SearchComponent],
})
export class SearchModule {}
