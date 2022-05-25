import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProfilesComponent } from './manage-profiles.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ManageProfilesComponent],
  exports: [ManageProfilesComponent],
})
export class ManageProfilesModule {}
