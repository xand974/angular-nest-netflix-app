import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListItemComponent } from './movie-list-item.component';
import { NbSpinnerModule } from '@nebular/theme';

@NgModule({
  imports: [CommonModule, NbSpinnerModule],
  declarations: [MovieListItemComponent],
  exports: [MovieListItemComponent],
})
export class MovieListItemModule {}
