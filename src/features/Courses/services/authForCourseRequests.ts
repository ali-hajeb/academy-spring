import IUser from '../../UserAuthentication/types/user';

export default function authForCourseRequests() {
  const user = JSON.parse(localStorage.getItem('user_data') ?? '{}') as IUser;

  if (user?.token) {
    return { 'x-auth-token': user.token, userId: user._id };
  }

  return {};
}
