import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieModel } from 'netflix-malet-types';
import {
  Observable,
  Subject,
  takeUntil,
  take,
  lastValueFrom,
  map,
  tap,
} from 'rxjs';
import { SearchStore } from './search.store';
import { filter } from 'rxjs/operators';
import { MoviesService } from '../../services/movies/movies.service';

@Component({
  selector: 'malet-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchStore],
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchTextFromParam: string;
  private _destroy$: Subject<boolean>;

  movies$: Observable<MovieModel[]>;
  movies: MovieModel[];
  loading$: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private cStore: SearchStore,
    private cdr: ChangeDetectorRef
  ) {
    this.searchTextFromParam = '';
    this.movies$ = this.cStore.movies$;
    this.loading$ = this.cStore.loading$;
    this._destroy$ = new Subject<boolean>();
    this.movies = [];
  }

  async ngOnInit(): Promise<void> {
    this.checkEmptyInput();
    await this.getAllMovies();
  }

  /**
   * @name checkEmptyInput
   * @description
   * - checks if the query param is empty
   *  - subscribe to it
   * - then redirect to home page
   * @returns
   */
  checkEmptyInput() {
    this.route.queryParamMap
      .pipe(takeUntil(this._destroy$))
      .subscribe((val) => {
        const query = val.get('q') ?? '';
        this.searchTextFromParam = query;
        this.filterMovies(this.searchTextFromParam);
      });
  }

  async getAllMovies() {
    this.cStore.setLoading(true);
    this.cStore.setMovies(
      this.movieService
        .getAllMovies()
        .pipe(takeUntil(this._destroy$.asObservable()))
    );
    this.cStore.setLoading(false);
  }

  filterMovies(str: string) {
    this.movies$
      .pipe(
        takeUntil(this._destroy$.asObservable()),
        map((val) => {
          if (str === '') return val;
          return val.filter((item) =>
            item.name.toLowerCase().includes(str.toLowerCase())
          );
        })
      )
      .subscribe((val) => {
        this.cStore.setLoading(true);
        this.movies = val;
        this.cStore.setLoading(false);
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }
}
