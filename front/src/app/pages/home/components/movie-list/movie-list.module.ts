import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list.component';
import { MovieListItemModule } from '../movie-list-item/movie-list-item.module';
import { NbIconModule } from '@nebular/theme';

@NgModule({
  imports: [CommonModule, MovieListItemModule, NbIconModule],
  declarations: [MovieListComponent],
  exports: [MovieListComponent],
})
export class MovieListModule {}
