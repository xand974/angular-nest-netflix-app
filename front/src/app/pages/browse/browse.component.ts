import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowseStore } from './browse.store';
import { BrowseService } from './browse.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../shared/auth/reducer/auth.reducer';
import { Observable, firstValueFrom, take } from 'rxjs';
import { ProfileModel, UserModel } from 'netflix-malet-types';
import { selectUser } from 'src/app/shared/auth/selectors/auth.selectors';
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BrowseStore],
})
export class BrowseComponent implements OnInit {
  user$: Observable<UserModel>;
  loading$: Observable<boolean>;
  profiles$: Observable<ProfileModel[]>;

  constructor(
    private router: Router,
    private cStore: BrowseStore,
    private browseService: BrowseService,
    private userStore: Store<AuthState>,
    private dialogRef: NbDialogService
  ) {
    this.user$ = this.userStore.select(selectUser);
    this.loading$ = this.cStore.loading$;
    this.profiles$ = this.cStore.profiles$;
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
      this.cStore.setLoading(true);
      this.cStore.setProfiles(
        this.browseService.getAllProfilesByUser(user._id)
      );
      this.cStore.setLoading(false);
    } catch (err) {
      this.cStore.setLoading(false);
      this.cStore.setError(true);
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
            this.cStore.setLoading(true);
            const res = await this.browseService.addProfile(
              val.profile,
              user._id!
            );
            this.cStore.addProfile(res.profile);
            this.cStore.setLoading(false);
          }
        }
      );
  }
}
