import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import SignUpPanel from '../containers/SignupPanel';
import { useAppSelector } from '../store';

export interface SignUpPageProps {
  
}

const SignUpPage: React.FunctionComponent<SignUpPageProps> = () => {
  const { state } = useLocation();

  const token = useAppSelector((state) => state.user.token);

  const redirectPath = state?.from !== '/logout' ? state?.from || '/' : '/';
  const redirect = token ? <Navigate to={redirectPath} replace /> : null;
  
  return redirect || <SignUpPanel />;
}

export default SignUpPage;