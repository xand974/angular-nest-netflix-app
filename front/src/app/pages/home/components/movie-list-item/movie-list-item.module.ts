import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListItemComponent } from './movie-list-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MovieListItemComponent],
  exports: [MovieListItemComponent],
})
export class MovieListItemModule {}
