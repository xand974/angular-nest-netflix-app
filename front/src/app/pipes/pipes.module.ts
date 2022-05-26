import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluralPipe } from './plural/plural.pipe';

@NgModule({
  declarations: [PluralPipe],
  imports: [CommonModule],
  exports: [PluralPipe],
})
export class PipesModule {}
