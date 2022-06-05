import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProfilesComponent } from 'src/app/@core/modals/manage/manage-profiles/manage-profiles.component';
import { ManageProfileCardModule } from '../manage-profile-card/manage-profile-card.module';
import { NbSpinnerModule, NbIconModule } from '@nebular/theme';

@NgModule({
  declarations: [ManageProfilesComponent],
  imports: [
    CommonModule,
    ManageProfileCardModule,
    NbSpinnerModule,
    NbIconModule,
  ],
  exports: [ManageProfilesComponent],
})
export class ManageProfilesModule {}
