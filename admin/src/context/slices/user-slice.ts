import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "netflix-malet-types";

type StateType = {
  pending: boolean;
  currentUser: UserModel | null;
  error: boolean;
};

const initialState: StateType = {
  pending: false,
  currentUser: null,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      return {
        ...state,
        pending: true,
      };
    },
    loginSuccess: (state, action: PayloadAction<UserModel>) => {
      return {
        ...state,
        currentUser: { ...action.payload },
        pending: false,
      };
    },
    loginFailure: (state) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
    resetAuth: () => {
      return {
        ...initialState,
      };
    },
    logoutUser: (state) => {
      return {
        ...state,
        currentUser: null,
        error: false,
      };
    },
  },
});
export default userSlice.reducer;
export const { loginFailure, loginStart, loginSuccess, resetAuth, logoutUser } =
  userSlice.actions;
