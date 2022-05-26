import { Injectable } from '@angular/core';
import { MovieModel } from 'netflix-malet-types';
import { ComponentStore } from '@ngrx/component-store';
interface MoviesState {
  movies: MovieModel[];
  loading: boolean;
  error: boolean;
}

@Injectable()
export class SearchStore extends ComponentStore<MoviesState> {
  /* States */
  movies$ = this.select((state) => state.movies);
  loading$ = this.select((state) => state.loading);
  error$ = this.select((state) => state.error);

  /* Modifier */

  setLoading = this.updater((state, value: boolean) => ({
    ...state,
    loading: value,
  }));

  setError = this.updater((state, value: boolean) => ({
    ...state,
    error: value,
  }));

  setMovies = this.updater((state, value: MovieModel[]) => ({
    ...state,
    movies: value,
  }));

  constructor() {
    super({ movies: [], loading: false, error: false });
  }
}
