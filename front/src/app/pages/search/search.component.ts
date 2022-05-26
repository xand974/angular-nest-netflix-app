import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { MovieModel } from 'netflix-malet-types';
import { Observable, Subject, takeUntil, lastValueFrom } from 'rxjs';
import { SearchService } from './search.service';
import { SearchStore } from './search.store';

@Component({
  selector: 'malet-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchTextFromParam: string;
  private _destroy$: Subject<boolean>;

  movies$: Observable<MovieModel[]>;
  loading$: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private cStore: SearchStore,
    private cdr: ChangeDetectorRef
  ) {
    this.searchTextFromParam = '';
    this.movies$ = this.cStore.movies$;
    this.loading$ = this.cStore.loading$;
    this._destroy$ = new Subject<boolean>();
  }

  ngOnInit(): void {
    this.checkEmptyInput();
    this.getMoviesFromSearchQuery();
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
        const query = val.get('q') ?? undefined;
        if (!query || query.length === 0) {
          this.router.navigate(['/home']);
          return;
        }
        this.searchTextFromParam = query;
        this.getMoviesFromSearchQuery();
      });
  }

  getMoviesFromSearchQuery() {
    this.cStore.setLoading(true);
    this.cStore.setMovies(
      this.searchService.getMoviesFromSearch(this.searchTextFromParam)
    );
    this.cStore.setLoading(false);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }
}
