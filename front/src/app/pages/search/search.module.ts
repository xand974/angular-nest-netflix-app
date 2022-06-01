import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { MovieListItemModule } from '../home/components/movie-list-item/movie-list-item.module';
import { SearchService } from './search.service';
import { PipesModule } from '../../pipes/pipes.module';
import { NbSpinnerModule, NbIconModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    MovieListItemModule,
    PipesModule,
    NbSpinnerModule,
    NbIconModule,
  ],
  declarations: [SearchComponent],
  exports: [SearchComponent],
  providers: [SearchService],
})
export class SearchModule {}
