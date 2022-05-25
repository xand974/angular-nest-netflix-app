import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { NbIconModule } from '@nebular/theme';
import { ManageProfilesModule } from '../../../browse/components/manage-profiles/manage-profiles/manage-profiles.module';

@NgModule({
  imports: [CommonModule, NbIconModule, ManageProfilesModule],
  declarations: [DropdownComponent],
  exports: [DropdownComponent],
})
export class DropdownModule {}
