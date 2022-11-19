import axios from 'axios';
import { AUTH_API_URL } from '../constants';

const getUserProfile = (username: string) => {
  return axios.get(`${AUTH_API_URL}/user/${username}`);
};

const userService = {
  getUserProfile,
};

export default userService;
