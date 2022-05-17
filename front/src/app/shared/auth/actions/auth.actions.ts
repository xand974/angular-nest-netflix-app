import { createAction, props } from '@ngrx/store';
import { UserModel } from 'netflix-malet-types';

export const loginFailure = createAction('[Auth] Login Failure');

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: UserModel }>()
);
export const loginStart = createAction('[Auth] Login Start');
