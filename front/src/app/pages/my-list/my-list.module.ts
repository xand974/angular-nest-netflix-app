import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbSpinnerModule, NbIconModule } from '@nebular/theme';
import { MyListComponent } from './my-list.component';
import { MovieListItemModule } from '../home/components/movie-list-item/movie-list-item.module';
import { MyListRoutingModule } from './my-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NbSpinnerModule,
    MovieListItemModule,
    NbIconModule,
    MyListRoutingModule,
  ],
  declarations: [MyListComponent],
  exports: [MyListComponent],
})
export class MyListModule {}
