import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { NbIconModule } from '@nebular/theme';

@NgModule({
  imports: [CommonModule, NbIconModule],
  declarations: [DropdownComponent],
  exports: [DropdownComponent],
})
export class DropdownModule {}
