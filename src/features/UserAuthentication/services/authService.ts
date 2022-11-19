import axios from 'axios';
import { AUTH_API_URL } from '../constants';
import { IUserLoginObject, IUserSignUpObject } from '../types/user';

const signUp = (user: IUserSignUpObject) => {
  return axios.post(`${AUTH_API_URL}/register`, user);
};

const login = (userCredentials: IUserLoginObject) => {
  return axios.post(`${AUTH_API_URL}/login`, userCredentials);
};

const authService = {
  signUp,
  login,
};

export default authService;
