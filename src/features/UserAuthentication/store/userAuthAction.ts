import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { userLocalStorageKey } from '../constants';
import authService from '../services/authService';
import userService from '../services/userService';
import {
  IUserLoginObject,
  IUserRedux,
  IUserAuthResponseObject,
  IUserSignUpObject,
  IResponse,
  ILoginResponse,
  IStudent,
  IUserForgotPasswordTokenObject,
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
        if (error.status !== 500)
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

      const userFP: IUserForgotPasswordTokenObject = JSON.parse(
        localStorage.getItem('user_fp') || '{}'
      );

      if (
        !userFP.resetPasswordToken ||
        (userFP.resetPasswordExpires &&
          new Date(userFP.resetPasswordExpires).getMilliseconds() <
            new Date().getMilliseconds())
      ) {
        console.log('here');
        try {
          await authService.forgetPassword(userData.result.studentModel.email);
        } catch (error) {}

        try {
          const userDataResponse = await userService.getUser(
            userData.result.studentModel._id
          );
          const student = userDataResponse.data.result as IStudent;

          console.log('here 1', student.resetPasswordExpires);

          if (student.resetPasswordExpires && student.resetPasswordToken) {
            const _userfp: IUserForgotPasswordTokenObject = {
              email: student.email,
              resetPasswordExpires: student.resetPasswordExpires,
              resetPasswordToken: student.resetPasswordToken,
            };
            console.log('here 2', _userfp);

            localStorage.setItem('user_fp', JSON.stringify(_userfp));
          }
        } catch (error) {}
      }

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
