import { createReducer, on } from '@ngrx/store';
import { UserModel, ProfileModel } from 'netflix-malet-types';
import * as fromProfile from '../actions/profiles.actions';

export interface ProfileState {
  profiles: ProfileModel[];
  loading: boolean;
  currentProfile: ProfileModel | null;
}

export const initialState: ProfileState = {
  profiles: [],
  loading: false,
  currentProfile: null,
};

export const profilesReducer = createReducer(
  initialState,

  on(fromProfile.setProfilesStart, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromProfile.setProfilesSuccess, (state, action) => ({
    ...state,
    profiles: action.profiles,
    loading: false,
  })),
  on(fromProfile.setProfilesFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(fromProfile.addProfilesStart, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromProfile.addProfilesSuccess, (state, action) => ({
    ...state,
    profiles: [...state.profiles, action.profile],
    loading: false,
  })),
  on(fromProfile.addProfilesFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(fromProfile.setCurrentProfile, (state, action) =>
    selectProfile(state, action.id)
  )
);

const selectProfile = (state: ProfileState, id: string) => {
  const profile = state.profiles.find((profile) => profile._id === id) ?? null;
  if (!profile) return { ...state };
  return {
    ...state,
    currentProfile: profile,
  };
};
