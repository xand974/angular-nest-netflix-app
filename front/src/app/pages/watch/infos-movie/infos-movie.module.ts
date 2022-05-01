import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfosMovieComponent } from './infos-movie.component';

@NgModule({
  imports: [CommonModule],
  declarations: [InfosMovieComponent],
  exports: [InfosMovieComponent],
})
export class InfosMovieModule {}
