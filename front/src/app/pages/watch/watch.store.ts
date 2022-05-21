import { Injectable } from '@angular/core';
import { MovieModel } from 'netflix-malet-types';
import { ComponentStore } from '@ngrx/component-store';
interface WatchState {
  movies: MovieModel | null;
  loading: boolean;
  error: boolean;
}

@Injectable()
export class WatchStore extends ComponentStore<WatchState> {
  /* States */
  movie$ = this.select((state) => state.movies);
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

  setMovie = this.updater((state, value: MovieModel) => ({
    ...state,
    movies: value,
  }));

  constructor() {
    super({ movies: null, loading: false, error: false });
  }
}
