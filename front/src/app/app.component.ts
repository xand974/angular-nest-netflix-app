import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './store/auth/reducer/auth.reducer';
import { CookieService } from './services/cookie/cookie.service';
import { UserService } from './services/user/user.service';
import { take, lastValueFrom } from 'rxjs';
import { browserReload } from './store/auth/actions/auth.actions';
import { LoginService } from './pages/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
