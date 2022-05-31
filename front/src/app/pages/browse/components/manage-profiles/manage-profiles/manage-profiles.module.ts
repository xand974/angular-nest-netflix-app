import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProfilesComponent } from './manage-profiles.component';
import { NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { ManageProfileCardModule } from '../../manage-profile-card/manage-profile-card.module';

@NgModule({
  imports: [
    CommonModule,
    NbIconModule,
    ManageProfileCardModule,
    NbSpinnerModule,
  ],
  declarations: [ManageProfilesComponent],
  exports: [ManageProfilesComponent],
})
export class ManageProfilesModule {}
