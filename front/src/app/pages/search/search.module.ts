import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { MovieListItemModule } from '../home/components/movie-list-item/movie-list-item.module';
import { SearchService } from './search.service';
import { SearchStore } from './search.store';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    MovieListItemModule,
    PipesModule,
  ],
  declarations: [SearchComponent],
  exports: [SearchComponent],
  providers: [SearchService, SearchStore],
})
export class SearchModule {}
