import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from '../reducers/profiles.reducer';

export const profilesSelectors =
  createFeatureSelector<ProfileState>('profiles');

export const selectLoading = createSelector(
  profilesSelectors,
  (state: ProfileState) => state.loading
);

export const selectProfiles = createSelector(
  profilesSelectors,
  (state: ProfileState) => state.profiles
);
