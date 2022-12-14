import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { userLocalStorageKey } from '../constants';
import authService from '../services/authService';
import {
  IUserLoginObject,
  IUserRedux,
  IUserAuthResponseObject,
  IUserSignUpObject,
} from '../types/user';
import { logout } from './userSlice';

const signUp = createAsyncThunk(
  'auth/signup',
  async (user: IUserSignUpObject, { dispatch, rejectWithValue }) => {
    try {
      await authService.signUp(user);
      dispatch(
        login({
          email: user.email,
          password: user.password,
          // remember: false,
        })
      );
    } catch (error) {
      let errorResponse = { code: 500, message: 'Something went wrong!' };
      if (axios.isAxiosError(error)) {
        errorResponse.code = error.status || 500;
        errorResponse = { ...errorResponse, ...error.response?.data };
      }
      return rejectWithValue(errorResponse);
    }
  }
);

const login = createAsyncThunk(
  'auth/login',
  async (userCredentials: IUserLoginObject, { dispatch, rejectWithValue }) => {
    try {
      const response = await authService.login(userCredentials);
      const userData = response.data as IUserAuthResponseObject;

      localStorage.setItem(
        userLocalStorageKey,
        JSON.stringify({
          _id: userData.result.studentModel._id,
          token: userData.result.jwtToken,
        })
      );

      return {
        ...userData.result.studentModel,
        token: userData.result.jwtToken,
        isLoggedIn: true,
      };
    } catch (error) {
      let errorResponse = { code: 500, message: 'Something went wrong!' };
      if (axios.isAxiosError(error)) {
        errorResponse.code = error.status || 500;

        errorResponse = { ...errorResponse, ...error.response?.data };
      }
      return rejectWithValue(errorResponse);
    }
  }
);

const checkAuthState = createAsyncThunk(
  'auth/checkState',
  async (_, { dispatch, getState }) => {
    const { user } = getState() as { user: IUserRedux };
    const userData = JSON.parse(
      localStorage.getItem(userLocalStorageKey) || '{}'
    ) as IUserRedux;

    if (!userData || !userData.token) {
      user.token && dispatch(logout());
    } else {
      return { ...userData, isLoggedIn: true };
    }
  }
);

const userAuthAction = {
  login,
  signUp,
  checkAuthState,
};

export default userAuthAction;
