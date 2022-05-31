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

export const setCurrentProfile = createAction(
  '[Profile] Set Current Profile',
  props<{ id: string }>()
);
export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{ profile: Partial<ProfileModel> }>()
);

export const removeProfile = createAction(
  '[Profile] Remove Profile',
  props<{ _id: string }>()
);
