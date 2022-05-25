import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowseService } from './browse.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../shared/auth/reducer/auth.reducer';
import { Observable, firstValueFrom, take } from 'rxjs';
import { ProfileModel, UserModel } from 'netflix-malet-types';
import { selectUser } from 'src/app/shared/auth/selectors/auth.selectors';
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { NbDialogService } from '@nebular/theme';
import { ProfileState } from 'src/app/shared/profiles/reducers/profiles.reducer';
import { ManageProfilesComponent } from './components/manage-profiles/manage-profiles/manage-profiles.component';
import {
  selectProfiles,
  selectLoading,
} from '../../shared/profiles/selectors/profiles.selectors';
import {
  setProfilesStart,
  setProfilesSuccess,
  setProfilesFailure,
  addProfilesStart,
  addProfilesSuccess,
  addProfilesFailure,
} from '../../shared/profiles/actions/profiles.actions';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseComponent implements OnInit {
  user$: Observable<UserModel>;
  loading$: Observable<boolean>;
  profiles$: Observable<ProfileModel[]>;

  constructor(
    private router: Router,
    private browseService: BrowseService,
    private userStore: Store<AuthState>,
    private dialogRef: NbDialogService,
    private store: Store<ProfileState>
  ) {
    this.user$ = this.userStore.select(selectUser);
    this.profiles$ = this.store.select(selectProfiles);
    this.loading$ = this.store.select(selectLoading);
  }

  async ngOnInit() {
    await this.initData();
    await this.initProfiles();
  }

  async initData() {}
  async initProfiles() {
    const user = await firstValueFrom(this.user$);
    if (!user || !user._id) return;

    try {
      this.store.dispatch(setProfilesStart());
      const profiles = await this.browseService.getAllProfilesByUser(user._id);
      this.store.dispatch(setProfilesSuccess({ profiles }));
    } catch (err) {
      this.store.dispatch(setProfilesFailure());
    }
  }

  public selectUser(id: string) {
    if (!id) {
      throw new Error('something went wrong');
    }
    this.router.navigate([`/home`], { queryParams: { user: id } });
  }

  public async openAddProfileModal() {
    const user = await firstValueFrom(this.user$);
    if (!user || !user._id) return;

    const ref = this.dialogRef.open(AddProfileComponent);
    ref.onClose
      .pipe(take(1))
      .subscribe(
        async (val: { data: string; profile: Partial<ProfileModel> }) => {
          if (val.data === 'success') {
            this.store.dispatch(addProfilesStart());
            try {
              const res = await this.browseService.addProfile(
                val.profile,
                user._id!
              );
              this.store.dispatch(addProfilesSuccess({ profile: res.profile }));
            } catch (err) {
              this.store.dispatch(addProfilesFailure());
            }
          }
        }
      );
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
