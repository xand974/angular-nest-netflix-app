import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProfileCardComponent } from './manage-profile-card.component';
import { NbIconModule, NbSpinnerModule } from '@nebular/theme';

@NgModule({
  imports: [CommonModule, NbIconModule, NbSpinnerModule],
  declarations: [ManageProfileCardComponent],
  exports: [ManageProfileCardComponent],
})
export class ManageProfileCardModule {}
