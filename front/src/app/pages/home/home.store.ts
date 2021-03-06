import { Injectable } from '@angular/core';
import { ListModel } from 'netflix-malet-types';
import { ComponentStore } from '@ngrx/component-store';
interface HomeState {
  lists: ListModel[];
  loading: boolean;
  error: boolean;
}

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  /* States */
  lists$ = this.select((state) => state.lists);
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

  setLists = this.updater((state, value: ListModel[]) => ({
    ...state,
    lists: value,
  }));

  constructor() {
    super({ lists: [], loading: false, error: false });
  }
}
