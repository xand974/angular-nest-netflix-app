import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { MovieModel, UserModel } from 'netflix-malet-types';
import { Router } from '@angular/router';
import { formatGenres } from '../../../helpers/utils.helper';
import { Observable, firstValueFrom, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/auth/reducer/auth.reducer';
import { favorites as favAction } from 'src/app/store/auth/actions/auth.actions';
import { selectUser } from '../../../store/auth/selectors/auth.selectors';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'malet-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  @Input() movie: MovieModel;
  public genre: string;
  public favorites: string[];
  public loading: boolean;

  user$: Observable<UserModel>;

  constructor(
    private ref: NbDialogRef<PreviewComponent>,
    private router: Router,
    private userStore: Store<AuthState>,
    private userService: UserService
  ) {
    this.movie = {} as MovieModel;
    this.genre = '';
    this.favorites = [];
    this.user$ = userStore.select(selectUser);
    this.loading = false;
  }

  async ngOnInit(): Promise<void> {
    this.genre = formatGenres(this.movie.genre);
    const user = await firstValueFrom(this.user$.pipe(take(1)));
    if (!user || !user?._id) return;
    this.favorites = user.favorites ?? [];
  }

  goToPlay(id: string) {
    if (!id || id === '') return;
    this.router.navigate([`/watch/${id}`]);
  }

  async addToFavorites(id: string) {
    if (!id || id === '') return;
    try {
      this.loading = true;
      const user = await firstValueFrom(this.user$.pipe(take(1)));
      if (!user || !user?._id) return;
      const favorites = user.favorites ?? [];
      const isInFav = favorites.includes(id);
      if (isInFav) this.favorites = favorites.filter((item) => item !== id);
      else this.favorites = [...favorites, id];

      await this.userService.favorites(user._id, id);
      this.userStore.dispatch(favAction({ movieId: this.movie?._id ?? '' }));

      this.loading = false;
    } catch (err) {
      this.loading = false;
      throw err;
    }
  }

  dismiss() {
    this.ref.close();
  }
}
