import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public svgLogo = '../../../assets/images/netflix.svg';
  public isEmailValid: boolean = false;
  public credential = this.formBuilder.group({
    email: '',
    password: '',
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  register(e: MouseEvent) {
    e.preventDefault();
    const email = this.credential.value['email'];
    if (!this.checkEmailValid(email)) return;
    this.isEmailValid = true;
  }

  checkEmailValid(email: string) {
    if (!email || email === '') return false;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(pattern)) return true;
    return false;
  }
}
