import { createReducer, on } from '@ngrx/store';
import { UserModel, ProfileModel } from 'netflix-malet-types';
import { updateProfile, removeProfile } from '../actions/profiles.actions';
import {
  addProfilesStart,
  addProfilesSuccess,
} from '../actions/profiles.actions';
import {
  setProfilesSuccess,
  setProfilesStart,
  setProfilesFailure,
  addProfilesFailure,
} from '../actions/profiles.actions';

export interface ProfileState {
  profiles: ProfileModel[];
  loading: boolean;
}

export const initialState: ProfileState = {
  profiles: [],
  loading: false,
};

export const profilesReducer = createReducer(
  initialState,

  on(setProfilesStart, (state) => ({
    ...state,
    loading: true,
  })),
  on(setProfilesSuccess, (state, action) => ({
    ...state,
    profiles: action.profiles,
    loading: false,
  })),
  on(setProfilesFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(addProfilesStart, (state) => ({
    ...state,
    loading: true,
  })),
  on(addProfilesSuccess, (state, action) => ({
    ...state,
    profiles: [...state.profiles, action.profile],
    loading: false,
  })),
  on(setProfilesFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(updateProfile, (state, action) => update(state, action.profile)),
  on(removeProfile, (state, action) => remove(state, action._id))
);

const update = (state: ProfileState, profile: Partial<ProfileModel>) => {
  if (!profile._id) return { ...state };
  const profiles = state.profiles.map((item) => {
    if (item._id === profile._id) {
      return {
        ...item,
        ...profile,
      };
    }
    return item;
  });
  return {
    ...state,
    profiles,
  };
};

const remove = (state: ProfileState, _id: string) => {
  if (!_id) return { ...state };
  const profiles = state.profiles.filter((item) => item._id !== _id);
  return {
    ...state,
    profiles,
  };
};
