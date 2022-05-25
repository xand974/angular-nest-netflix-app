import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { authReducer, AuthState } from '../auth/reducer/auth.reducer';
import {
  profilesReducer,
  ProfileState,
} from '../profiles/reducers/profiles.reducer';

interface AppState {
  auth: AuthState;
  profiles: ProfileState;
}
export const reducers = {
  auth: authReducer,
  profiles: profilesReducer,
};

export function localStorageSyncReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return localStorageSync({
    keys: Object.keys(reducers),
    rehydrate: true,
  })(reducer);
}
export const metaReducers: Array<MetaReducer<AppState>> = [
  localStorageSyncReducer,
];
