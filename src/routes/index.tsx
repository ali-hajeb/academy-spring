import { RouteObject } from 'react-router-dom';
import CoursePage from '../pages/course';
import CoursesPage from '../pages/courses';
import Arash from '../pages/arash';
import ForgetPassPage from '../pages/forget_pass';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import ResetPassPage from '../pages/reset_pass';
import SignUpPage from '../pages/signup';
import LogoutPage from '../pages/logout';

const protectedRoutes: RouteObject[] = [
  // { index: true, element: <HomePage /> },
];
const publicRoutes: RouteObject[] = [
  { index: true, element: <HomePage /> },
  { path: '/:pageNumber', element: <HomePage /> },
  { path: '/courses/:id', element: <CoursePage /> },
  { path: '/courses', element: <CoursesPage /> },
  { path: '/arash', element: <Arash /> },
];
const authenticationRoutes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  { path: '/logout', element: <LogoutPage /> },
  { path: '/signup', element: <SignUpPage /> },
  { path: '/reset_pass', element: <ResetPassPage /> },
  { path: '/forget_pass', element: <ForgetPassPage /> },
];

const routes = { protectedRoutes, publicRoutes, authenticationRoutes };
export default routes;
