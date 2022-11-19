import { createSlice } from '@reduxjs/toolkit';
import { userLocalStorageKey } from '../constants';
import { IUserRedux } from '../types/user';
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
  extraReducers: {
    [userAuthAction.signUp.pending.toString()]: (state) => {
      return { ...state, status: 'loading', isLoggedIn: false, response: null };
    },
    [userAuthAction.signUp.fulfilled.toString()]: (state, action) => {
      return {
        ...state,
        ...action.payload,
        status: 'succeeded',
        response: null,
      };
    },
    [userAuthAction.signUp.rejected.toString()]: (state, action) => {
      state.status = 'failed';
      state.response = action.payload;
    },
    [userAuthAction.login.pending.toString()]: (state) => {
      return { ...state, status: 'loading', isLoggedIn: false, response: null };
    },
    [userAuthAction.login.fulfilled.toString()]: (state, action) => {
      return {
        ...state,
        ...action.payload,
        status: 'succeeded',
        isLoggedIn: true,
        response: null,
      };
    },
    [userAuthAction.login.rejected.toString()]: (state, action) => {
      state.status = 'failed';
      state.isLoggedIn = false;
      state.response = action.payload;
    },
    [userAuthAction.checkAuthState.pending.toString()]: (state) => {
      return { ...state, status: 'loading', response: null };
    },
    [userAuthAction.checkAuthState.fulfilled.toString()]: (state, action) => {
      return {
        ...state,
        ...action.payload,
        status: 'succeeded',
        response: null,
      };
    },
  },
});

export const { logout, resetResponse } = userSlice.actions;
export default userSlice.reducer;
