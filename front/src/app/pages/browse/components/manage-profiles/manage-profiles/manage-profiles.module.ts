import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProfilesComponent } from './manage-profiles.component';
import { NbIconModule } from '@nebular/theme';

@NgModule({
  imports: [CommonModule, NbIconModule],
  declarations: [ManageProfilesComponent],
  exports: [ManageProfilesComponent],
})
export class ManageProfilesModule {}
