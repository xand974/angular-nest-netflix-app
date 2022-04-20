import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchComponent } from './watch.component';
import { WatchService } from './watch.service';

@NgModule({
  imports: [CommonModule],
  declarations: [WatchComponent],
  providers: [WatchService],
  exports: [WatchComponent],
})
export class WatchModule {}
