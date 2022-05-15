import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { RegisterService } from './register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public loading = false;
  public svgLogo = '../../../assets/images/netflix.svg';
  public isEmailValid: boolean = false;
  public error: boolean = false;
  public credential = this.formBuilder.group({
    email: '',
    password: '',
    username: '',
  });
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async register(e: MouseEvent) {
    try {
      e.preventDefault();
      const email = this.credential.value['email'];
      if (!this.checkEmailValid(email)) return;
      this.isEmailValid = true;
      if (this.credential.value['password'].length === 0) return;
      this.loading = true;
      debugger;
      const res = await this.registerService.signIn(this.credential.value);
      if (res.data === 'success') this.router.navigate(['login']);
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.error = true;
    }
  }

  checkEmailValid(email: string) {
    if (!email || email === '') return false;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(pattern)) return true;
    return false;
  }
}
