import { createAction, props } from '@ngrx/store';
import { ProfileModel } from 'netflix-malet-types';

export const setProfilesSuccess = createAction(
  '[Profile] Set Profile Success',
  props<{ profiles: ProfileModel[] }>()
);

export const setProfilesStart = createAction('[Profile] Set Profiles Start');

export const setProfilesFailure = createAction(
  '[Profile] Set Profiles Failure'
);

export const addProfilesFailure = createAction(
  '[Profile] Add Profiles Failure'
);
export const addProfilesStart = createAction('[Profile] Add Profiles Start');
export const addProfilesSuccess = createAction(
  '[Profile] Add Profiles Success',
  props<{ profile: ProfileModel }>()
);
