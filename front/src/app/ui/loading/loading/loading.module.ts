import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { NbSpinnerModule } from '@nebular/theme';
@NgModule({
  imports: [CommonModule, NbSpinnerModule],
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
})
export class LoadingModule {}
