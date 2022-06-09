import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfosHoverComponent } from './infos-hover.component';
import { PreviewModule } from '../../../../@core/modals/preview/preview.module';

@NgModule({
  imports: [CommonModule, PreviewModule],
  declarations: [InfosHoverComponent],
  exports: [InfosHoverComponent],
})
export class InfosHoverModule {}
