import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/shared/auth/reducer/auth.reducer';
import {
  loginStart,
  loginFailure,
  loginSuccess,
} from 'src/app/shared/auth/actions/auth.actions';
import { firstValueFrom, map, Observable, switchMap, take, tap } from 'rxjs';
import {
  selectError,
  selectPending,
} from 'src/app/shared/auth/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public error$: Observable<boolean>;
  public pending$: Observable<boolean>;
  public pending: boolean;
  public credential = this.formBuilder.group({
    password: '',
    username: '',
    souvenir: false,
  });
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private store: Store<AuthState>
  ) {
    this.error$ = this.store.select(selectError);
    this.pending$ = this.store.select(selectPending);
    this.pending = false;
  }

  async ngOnInit(): Promise<void> {
    this.pending$.pipe(map((value) => (this.pending = value)));
  }

  public async login(e: MouseEvent) {
    try {
      e.preventDefault();
      this.store.dispatch(loginStart());
      const user = await this.loginService.login(this.credential.value);
      this.store.dispatch(loginSuccess({ user }));
      this.router.navigate(['/browse']);
    } catch (err) {
      this.store.dispatch(loginFailure());
      this.cdr.detectChanges();
    }
  }
}
