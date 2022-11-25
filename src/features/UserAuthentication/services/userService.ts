import axios from 'axios';
import { AUTH_API_URL } from '../constants';
import authHeader from './authHeader';

const getUser = (user_id: string) => {
  return axios.get(`${AUTH_API_URL}/student/${user_id}`, {
    headers: authHeader(),
  });
};

const userService = {
  getUser,
};

export default userService;
