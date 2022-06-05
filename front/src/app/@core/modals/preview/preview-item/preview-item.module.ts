import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewItemComponent } from './preview-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PreviewItemComponent],
  exports: [PreviewItemComponent],
})
export class PreviewItemModule {}
