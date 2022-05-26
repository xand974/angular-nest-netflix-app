import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NbSpinnerModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NbSpinnerModule, RouterModule],
  declarations: [LoginComponent],
  providers: [LoginService],
  exports: [LoginComponent],
})
export class LoginModule {}
