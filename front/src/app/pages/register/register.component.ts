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
  public credential = this.formBuilder.group({
    email: '',
    password: '',
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  register(e: MouseEvent) {
    e.preventDefault();
    console.log(this.credential.value);
  }
}
