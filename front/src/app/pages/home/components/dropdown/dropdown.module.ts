import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { ManageProfilesModule } from '../../../../@core/modals/manage/manage-profiles/manage-profiles.module';

@NgModule({
  imports: [CommonModule, NbIconModule, ManageProfilesModule, NbSpinnerModule],
  declarations: [DropdownComponent],
  exports: [DropdownComponent],
})
export class DropdownModule {}
