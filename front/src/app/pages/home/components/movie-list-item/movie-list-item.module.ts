import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListItemComponent } from './movie-list-item.component';
import { NbSpinnerModule, NbIconModule } from '@nebular/theme';
import { InfosHoverModule } from '../infos-hover/infos-hover.module';

@NgModule({
  imports: [CommonModule, NbSpinnerModule, InfosHoverModule, NbIconModule],
  declarations: [MovieListItemComponent],
  exports: [MovieListItemComponent],
})
export class MovieListItemModule {}
