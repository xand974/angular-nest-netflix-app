import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';
import { NbIconModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, NbIconModule, ReactiveFormsModule],
  declarations: [RegisterComponent],
  providers: [RegisterService],
  exports: [RegisterComponent],
})
export class RegisterModule {}
