import { Injectable } from '@angular/core';
import { MovieModel, ProfileModel } from 'netflix-malet-types';
import { ComponentStore } from '@ngrx/component-store';

interface BrowseState {
  profiles: ProfileModel[];
  loading: boolean;
  error: boolean;
}

@Injectable()
export class BrowseStore extends ComponentStore<BrowseState> {
  /* States */
  profiles$ = this.select((state) => state.profiles);
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

  setProfiles = this.updater((state, value: ProfileModel[]) => ({
    ...state,
    profiles: value,
  }));

  addProfile = this.updater((state, value: ProfileModel) => {
    return {
      ...state,
      profiles: [...state.profiles, value],
    };
  });

  updateProfile = this.updater((state, value: Partial<ProfileModel>) => {
    const profiles = state.profiles.map((profile) => {
      if (profile._id === value._id) {
        return {
          ...profile,
          ...value,
        };
      }
      return profile;
    });
    return {
      ...state,
      profiles: profiles,
    };
  });

  removeProfile = this.updater((state, id: string) => {
    const filteredProfiles = state.profiles.filter((item) => item._id !== id);
    return {
      ...state,
      profiles: filteredProfiles,
    };
  });

  constructor() {
    super({ profiles: [], loading: false, error: false });
  }
}
