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
  ),
  on(fromProfile.updateProfile, (state, action) =>
    update(state, action.profile)
  ),
  on(fromProfile.removeProfile, (state, action) => remove(state, action._id))
);

const selectProfile = (state: ProfileState, id: string) => {
  const profile = state.profiles.find((profile) => profile._id === id) ?? null;
  if (!profile) return { ...state };
  return {
    ...state,
    currentProfile: profile,
  };
};

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
