import IUser from '../types/user';

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user_data') ?? '{}') as IUser;

  if (user?.token) {
    return { 'x-auth-token': user.token };
  }

  return {};
}
