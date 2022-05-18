import { Injectable } from '@angular/core';
import { ListModel } from 'netflix-malet-types';
import { ComponentStore } from '@ngrx/component-store';
interface HomeState {
  movies: ListModel[];
  loading: boolean;
  error: boolean;
}

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
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

  setMovies = this.updater((state, value: ListModel[]) => ({
    ...state,
    movies: value,
  }));

  constructor() {
    super({ movies: [], loading: false, error: false });
  }
}
