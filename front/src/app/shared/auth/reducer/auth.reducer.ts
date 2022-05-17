import { createReducer, on } from '@ngrx/store';
import { UserModel } from 'netflix-malet-types';
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

export const initalState: AuthState = {
  pending: false,
  error: false,
  user: {} as UserModel,
};

export const authReducer = createReducer(
  initalState,
  on(loginStart, (state) => ({
    ...state,
    pending: true,
  })),
  on(loginSuccess, (state, action) => ({
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
