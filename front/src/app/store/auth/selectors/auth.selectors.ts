import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducer/auth.reducer';

export const authSelector = createFeatureSelector<AuthState>('auth');

export const selectPending = createSelector(
  authSelector,
  (state: AuthState) => state.pending
);

export const selectUser = createSelector(
  authSelector,
  (state: AuthState) => state.user
);

export const selectError = createSelector(
  authSelector,
  (state: AuthState) => state.error
);
