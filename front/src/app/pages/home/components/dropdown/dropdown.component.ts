import { DropdownItem } from 'src/types/dropdown.types';
import { Router } from '@angular/router';
import { LoginService } from '../../../login/login.service';
import { firstValueFrom, map, Observable, take } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AuthState } from 'src/app/store/auth/reducer/auth.reducer';
import { ProfileModel, UserModel } from 'netflix-malet-types';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/auth/selectors/auth.selectors';
import { ProfileState } from 'src/app/store/profiles/reducers/profiles.reducer';
import { selectProfiles } from '../../../../store/profiles/selectors/profiles.selectors';
import { NbDialogService } from '@nebular/theme';
import { ManageProfilesComponent } from 'src/app/pages/browse/components/manage-profiles/manage-profiles/manage-profiles.component';
import {
  removeProfile,
  updateProfile,
} from 'src/app/store/profiles/actions/profiles.actions';

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

  public loading: boolean;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private userStore: Store<AuthState>,
    private profileStore: Store<ProfileState>,
    private dialogRef: NbDialogService
  ) {
    this.user$ = this.userStore.select(selectUser);
    this.profiles$ = this.profileStore.select(selectProfiles);
    this.loading = false;
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
    const ref = this.dialogRef.open(ManageProfilesComponent, {
      context: {
        profiles: profiles,
      },
    });
    ref.onClose
      .pipe<{
        status: string;
        profilesToUpdate: Partial<ProfileModel>[];
        profilesToDelete: string[];
      }>(take(1))
      .subscribe((res) => {
        if (!res) return;
        this.loading = true;
        if (res.profilesToDelete.length > 0) {
          for (const id of res.profilesToDelete) {
            this.profileStore.dispatch(removeProfile({ _id: id }));
          }
        }
        if (res.profilesToUpdate.length > 0) {
          for (const profile of res.profilesToUpdate) {
            this.profileStore.dispatch(updateProfile({ profile: profile }));
          }
        }
        this.loading = false;
      });
  }
}
