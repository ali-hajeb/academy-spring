import axios from 'axios';
import { AUTH_API_URL } from '../constants';
import { IUserLoginObject, IUserSignUpObject } from '../types/user';

const signUp = (user: IUserSignUpObject) => {
  return axios.post(`${AUTH_API_URL}/auth/register`, user);
};

const login = (userCredentials: IUserLoginObject) => {
  return axios.post(`${AUTH_API_URL}/auth/login`, userCredentials);
};

const forgetPassword = (email: string) => {
  return axios.post(`${AUTH_API_URL}/forgetpassword`, { email });
};

const resetPassword = (token: string) => {
  return axios.post(`${AUTH_API_URL}/resetPassword/${token}`);
};

const authService = {
  signUp,
  login,
  forgetPassword,
  resetPassword
};

export default authService;
