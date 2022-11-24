import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { userLocalStorageKey } from '../constants';
import authService from '../services/authService';
import {
  IUserLoginObject,
  IUserRedux,
  IUserAuthResponseObject,
  IUserSignUpObject,
  IResponse,
  ILoginResponse,
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
      let errorResponse: IResponse = {
        success: false,
        message: [{ eventId: 500, message: 'یه مشکلی پیش اومده!' }],
      };
      if (axios.isAxiosError(error)) {
        errorResponse.message[0].eventId = error.status || 500;
        errorResponse = { ...errorResponse, ...error.response?.data };
        console.log(errorResponse);
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
      let errorResponse: ILoginResponse = {
        success: false,
        message: {
          eventId: 500,
          message: [{ eventId: 500, message: 'یه مشکلی پیش اومده!' }],
        },
      };
      if (axios.isAxiosError(error)) {
        errorResponse.message.message[0].eventId = error.status || 500;
        errorResponse = { ...errorResponse, ...error.response?.data };
        console.log(errorResponse);
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
