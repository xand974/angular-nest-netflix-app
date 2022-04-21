import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse.component';
import { BrowseService } from './browse.service';

@NgModule({
  imports: [CommonModule],
  declarations: [BrowseComponent],
  providers: [BrowseService],
  exports: [BrowseComponent],
})
export class BrowseModule {}
