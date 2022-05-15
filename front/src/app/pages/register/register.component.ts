import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { checkEmailValid } from 'src/app/helpers/utils.helper';
import { RegisterService } from './register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public loading;
  public svgLogo = '../../../assets/images/netflix.svg';
  public isEmailValid: boolean;
  public error: boolean;
  public credential = this.formBuilder.group({
    email: '',
    password: '',
    username: '',
  });
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loading = false;
    this.error = false;
    this.isEmailValid = false;
  }

  ngOnInit(): void {}

  async register(e: MouseEvent) {
    try {
      this.error = false;
      e.preventDefault();
      const email = this.credential.value['email'];
      if (!checkEmailValid(email)) return;
      this.isEmailValid = true;
      if (this.credential.value['password'].length === 0) return;
      this.loading = true;
      const res = await this.registerService.signIn(this.credential.value);
      if (res.data === 'success') this.router.navigate(['login']);
      this.loading = false;
    } catch (err) {
      this.error = true;
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  checkEmail(email: string): boolean {
    return checkEmailValid(email);
  }
}
