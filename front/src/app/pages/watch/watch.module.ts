import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchComponent } from './watch.component';
import { WatchService } from './watch.service';
import { InfosMovieModule } from './infos-movie/infos-movie.module';
import { NbIconModule } from '@nebular/theme';
import { WatchRoutingModule } from './watch-routing.module';

@NgModule({
  imports: [CommonModule, WatchRoutingModule, InfosMovieModule, NbIconModule],
  declarations: [WatchComponent],
  providers: [WatchService],
  exports: [WatchComponent],
})
export class WatchModule {}
