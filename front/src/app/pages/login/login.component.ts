import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public error: boolean;
  public loading: boolean;
  public credential = this.formBuilder.group({
    password: '',
    username: '',
    souvenir: false,
  });
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.loading = false;
    this.error = false;
  }

  ngOnInit(): void {}

  public async login(e: MouseEvent) {
    try {
      this.error = false;
      this.loading = true;
      e.preventDefault();
      await this.loginService.login(this.credential.value);
      this.loading = false;
      this.router.navigate(['/browse']);
    } catch (err) {
      this.error = true;
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}
