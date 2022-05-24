import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse.component';
import { BrowseService } from './browse.service';
import { BrowseCardModule } from './components/browse-card/browse-card.module';
import { NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { BrowseRoutingModule } from './browse-routing.module';
import { AddProfileModule } from './components/add-profile/add-profile.module';

@NgModule({
  imports: [
    CommonModule,
    BrowseCardModule,
    NbIconModule,
    BrowseRoutingModule,
    NbSpinnerModule,
    AddProfileModule,
  ],
  declarations: [BrowseComponent],
  providers: [BrowseService],
  exports: [BrowseComponent],
})
export class BrowseModule {}
