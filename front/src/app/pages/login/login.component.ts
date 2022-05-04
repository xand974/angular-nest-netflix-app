import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public credential = this.formBuilder.group({
    password: '',
    username: '',
  });
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  login(e: KeyboardEvent) {
    e.preventDefault();
    const email = this.credential.value['email'];
    if (!this.checkEmailValid(email)) return;
    this.loginService.login(this.credential.value);
  }

  checkEmailValid(email: string) {
    if (!email || email === '') return false;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(pattern)) return true;
    return false;
  }
}
