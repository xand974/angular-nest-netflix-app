import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './shared/auth/reducer/auth.reducer';
import { CookieService } from './shared/cookie/cookie.service';
import { UserService } from './shared/user/user.service';
import { take, lastValueFrom } from 'rxjs';
import { browserReload } from './shared/auth/actions/auth.actions';
import { LoginService } from './pages/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AuthState>,
    private cookieService: CookieService,
    private loginService: LoginService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const userFromStore = await lastValueFrom(
      this.store.select('user').pipe(take(1))
    );
    if (!userFromStore) {
      const userFromLS = this.cookieService.getUserInLocalStorage();
      if (!userFromLS) {
        await this.loginService.logout();
        this.router.navigate(['/login']);
        return;
      }
      this.store.dispatch(browserReload({ user: userFromLS }));
    }
  }
}
