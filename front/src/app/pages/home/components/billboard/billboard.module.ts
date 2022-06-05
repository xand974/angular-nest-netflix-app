import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillboardComponent } from './billboard.component';
import { NbIconModule } from '@nebular/theme';
import { PreviewModule } from '../../../../@core/modals/preview/preview.module';

@NgModule({
  imports: [CommonModule, NbIconModule, PreviewModule],
  declarations: [BillboardComponent],
  exports: [BillboardComponent],
})
export class BillboardModule {}
