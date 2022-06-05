import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview.component';
import { NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { PreviewItemModule } from './preview-item/preview-item.module';

@NgModule({
  imports: [CommonModule, NbIconModule, PreviewItemModule, NbSpinnerModule],
  declarations: [PreviewComponent],
  exports: [PreviewComponent],
})
export class PreviewModule {}
