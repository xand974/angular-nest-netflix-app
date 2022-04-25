import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillboardComponent } from './billboard.component';
import { NbIconModule } from '@nebular/theme';

@NgModule({
  imports: [CommonModule, NbIconModule],
  declarations: [BillboardComponent],
  exports: [BillboardComponent],
})
export class BillboardModule {}
