import { createReducer, on } from '@ngrx/store';
import { UserModel } from 'netflix-malet-types';
import { browserReload } from '../actions/auth.actions';
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
  })),
  on(loginSuccess, browserReload, (state, action) => ({
    ...state,
    pending: false,
    user: action.user,
  })),
  on(loginFailure, (state) => ({
    ...state,
    pending: false,
    error: true,
  }))
);
