import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MovieModel } from 'netflix-malet-types';
import { Observable, take, firstValueFrom } from 'rxjs';
import { MyListStore } from './my-list.store';
import { MoviesService } from '../../services/movies/movies.service';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/auth/reducer/auth.reducer';
import { selectUser } from '../../store/auth/selectors/auth.selectors';

@Component({
  selector: 'malet-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MyListStore],
})
export class MyListComponent implements OnInit {
  loading$: Observable<boolean>;
  movies$: Observable<MovieModel[]>;

  constructor(
    private cStore: MyListStore,
    private movieService: MoviesService,
    private userStore: Store<AuthState>
  ) {
    this.loading$ = this.cStore.loading$;
    this.movies$ = this.cStore.movies$;
  }

  ngOnInit(): void {
    this.initData();
  }

  private async initData() {
    try {
      this.cStore.setLoading(true);
      const user = await firstValueFrom(
        this.userStore.select(selectUser).pipe(take(1))
      );
      if (!user) this.cStore.setError(true);
      this.cStore.setMovies(
        this.movieService.getFavoriteMovies(user?._id ?? '')
      );
      this.cStore.setLoading(false);
    } catch (error) {
      this.cStore.setError(true);
      this.cStore.setLoading(false);
      throw error;
    }
  }
}
