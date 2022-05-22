import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowseCardInterface } from 'src/types/index';
import { BrowseStore } from './browse.store';
import { BrowseService } from './browse.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../shared/auth/reducer/auth.reducer';
import { Observable, firstValueFrom } from 'rxjs';
import { ProfileModel, UserModel } from 'netflix-malet-types';
import { selectUser } from 'src/app/shared/auth/selectors/auth.selectors';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BrowseStore],
})
export class BrowseComponent implements OnInit {
  user$: Observable<UserModel>;
  profiles$: Observable<ProfileModel[]>;
  public userCards: BrowseCardInterface[] = [
    {
      id: 's',
      name: 'Doe',
      imgURL: 'none',
    },
    {
      id: 'd',
      name: 'John',
      imgURL: 'none',
    },
    {
      id: 'z',
      name: 'Cena',
      imgURL: 'none',
    },
  ];
  constructor(
    private router: Router,
    private cStore: BrowseStore,
    private browseService: BrowseService,
    private userStore: Store<AuthState>
  ) {
    this.user$ = this.userStore.select(selectUser);
    this.profiles$ = this.cStore.profiles$;
  }

  async ngOnInit() {
    await this.initProfiles();
  }

  async initProfiles() {
    const user = await firstValueFrom(this.user$);

    if (!user || !user._id) return;
    try {
      this.cStore.setLoading(true);
      this.cStore.setProfiles(
        this.browseService.getAllProfilesByUser(user._id)
      );
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
}
