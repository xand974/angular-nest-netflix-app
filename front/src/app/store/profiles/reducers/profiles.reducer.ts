import { createReducer, on } from '@ngrx/store';
import { UserModel, ProfileModel } from 'netflix-malet-types';
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
  }))
);
