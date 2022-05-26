import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';
import { NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NbIconModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    RouterModule,
  ],
  declarations: [RegisterComponent],
  providers: [RegisterService],
  exports: [RegisterComponent],
})
export class RegisterModule {}
