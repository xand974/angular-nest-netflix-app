import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse.component';
import { BrowseService } from './browse.service';
import { BrowseCardModule } from './components/browse-card/browse-card.module';
import { NbIconModule } from '@nebular/theme';

@NgModule({
  imports: [CommonModule, BrowseCardModule, NbIconModule],
  declarations: [BrowseComponent],
  providers: [BrowseService],
  exports: [BrowseComponent],
})
export class BrowseModule {}
