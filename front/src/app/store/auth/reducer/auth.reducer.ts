import { createReducer, on } from '@ngrx/store';
import { UserModel } from 'netflix-malet-types';
import { browserReload, favorites } from '../actions/auth.actions';
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from '../actions/auth.actions';

export interface AuthState {
  pending: boolean;
  error: boolean;
  user: UserModel;
}

export const initialState: AuthState = {
  pending: false,
  error: false,
  user: {} as UserModel,
};

export const authReducer = createReducer(
  initialState,
  on(loginStart, (state) => ({
    ...state,
    pending: true,
    error: false,
  })),
  on(loginSuccess, browserReload, (state, action) => ({
    ...state,
    pending: false,
    error: false,
    user: action.user,
  })),
  on(loginFailure, (state) => ({
    ...state,
    pending: false,
    error: true,
  })),
  on(favorites, (state, action) => handleFavorites(state, action))
);

const handleFavorites = (
  state: AuthState,
  action: { movieId: string }
): AuthState => {
  if (!action.movieId)
    return {
      ...state,
    };
  const favorites = state.user?.favorites ?? [];
  let newFav: string[] = [];
  if (favorites.includes(action.movieId))
    newFav = favorites.filter((item) => item !== action.movieId);
  else newFav = [...favorites, action.movieId];

  return {
    ...state,
    user: {
      ...state.user,
      favorites: newFav,
    },
  };
};
