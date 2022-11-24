import { createSlice } from '@reduxjs/toolkit';
import { userLocalStorageKey } from '../constants';
import { ILoginResponse, IResponse, IUserRedux } from '../types/user';
import userAuthAction from './userAuthAction';

const initialState: IUserRedux = {
  isLoggedIn: false,
  _id: '',
  fullName: '',
  email: '',
  phoneNumber: '',
  birthDate: '',
  role: '',
  isActive: true,
  nationalId: '',
  registerDate: null,
  profile: '',
  token: '',
  status: 'idle',
  response: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetResponse: (state) => {
      state.response = null;
    },
    logout: () => {
      localStorage.removeItem(userLocalStorageKey);
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userAuthAction.signUp.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          isLoggedIn: false,
          response: null,
        };
      })
      .addCase(userAuthAction.signUp.fulfilled, (state) => {
        return {
          ...state,
          status: 'succeeded',
          response: null,
        };
      })
      .addCase(userAuthAction.signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.response = action.payload as IResponse;
      })
      .addCase(userAuthAction.login.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          isLoggedIn: false,
          response: null,
        };
      })
      .addCase(userAuthAction.login.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          status: 'succeeded',
          isLoggedIn: true,
          response: null,
        };
      })
      .addCase(userAuthAction.login.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoggedIn = false;
        state.response = action.payload as ILoginResponse;
      })
      .addCase(userAuthAction.checkAuthState.pending, (state) => {
        return { ...state, status: 'loading', response: null };
      })
      .addCase(userAuthAction.checkAuthState.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          status: 'succeeded',
          response: null,
        };
      });
  },
});

export const { logout, resetResponse } = userSlice.actions;
export default userSlice.reducer;
