import { DropdownItem } from 'src/types/dropdown.types';
import { Router } from '@angular/router';
import { LoginService } from '../../../login/login.service';
import { firstValueFrom, map, Observable } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AuthState } from 'src/app/shared/auth/reducer/auth.reducer';
import { ProfileModel, UserModel } from 'netflix-malet-types';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/shared/auth/selectors/auth.selectors';
import { ProfileState } from 'src/app/shared/profiles/reducers/profiles.reducer';
import { selectProfiles } from '../../../../shared/profiles/selectors/profiles.selectors';
import { NbDialogService } from '@nebular/theme';
import { ManageProfilesComponent } from 'src/app/pages/browse/components/manage-profiles/manage-profiles/manage-profiles.component';

@Component({
  selector: 'malet-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit {
  /* Observables */
  user$: Observable<UserModel>;
  profiles$: Observable<ProfileModel[]>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private userStore: Store<AuthState>,
    private profileStore: Store<ProfileState>,
    private dialogRef: NbDialogService
  ) {
    this.user$ = this.userStore.select(selectUser);
    this.profiles$ = this.profileStore.select(selectProfiles);
  }

  public settingsDropdown: DropdownItem[] = [
    {
      tag: 'helpCenter',
      icon: 'question-mark-circle-outline',
      text: 'Help Center',
    },
    {
      tag: 'account',
      icon: 'person-outline',
      text: 'Account',
    },
    {
      tag: 'logOut',
      icon: 'log-out-outline',
      text: 'Log out',
    },
  ];

  ngOnInit(): void {}

  public handleDropdownSettings(tag: string): void {
    switch (tag) {
      case 'helpCenter':
        this.router.navigate(['/help']);
        return;
      case 'account':
        this.router.navigate(['/global-account']);
        return;
      case 'logOut':
        this.logout();
        return;
    }
  }

  public goToAccount(id: string): void {
    if (!id || id.length === 0) return;
    this.router.navigate([`/home`], { queryParams: { user: id } });
  }

  public async logout() {
    const res = await this.loginService.logout();
    if (res.data && res.data === 'success') {
      this.router.navigate(['/login']);
    }
  }

  public async openManageProfileModal() {
    const profiles = await firstValueFrom(this.profiles$);
    this.dialogRef.open(ManageProfilesComponent, {
      context: {
        profiles: profiles,
      },
    });
  }
}
