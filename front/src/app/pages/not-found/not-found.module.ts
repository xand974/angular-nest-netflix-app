import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { NotFoundService } from './not-found.service';

@NgModule({
  imports: [CommonModule],
  declarations: [NotFoundComponent],
  providers: [NotFoundService],
  exports: [NotFoundComponent],
})
export class NotFoundModule {}
