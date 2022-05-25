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
  public loading: boolean;
  constructor(
    private store: Store<AuthState>,
    private cookieService: CookieService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loading = false;
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.isUserInLoginOrRegisterPage();
    await this.checkUserInStore();
    this.loading = false;
  }

  isUserInLoginOrRegisterPage() {
    if (
      window.location.href.includes('login') ||
      window.location.href.includes('register')
    ) {
      this.loading = false;
      return;
    }
  }

  async checkUserInStore() {
    const userFromStore = await lastValueFrom(
      this.store.select('user').pipe(take(1))
    );
    if (!userFromStore) {
      const userFromLS = this.cookieService.getUserInLocalStorage();
      if (!userFromLS) {
        await this.loginService.logout();
        this.router.navigate(['/login']);
        this.loading = false;
        return;
      }
    }
  }
}
