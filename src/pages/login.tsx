import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import LoginPanel from '../containers/LoginPanel';
import { useAppSelector } from '../store';

export interface LoginPageProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
  const { state } = useLocation();

  const token = useAppSelector((state) => state.user.token);

  const redirectPath = state?.from !== '/logout' ? state?.from || '/' : '/';
  const redirect = token ? <Navigate to={redirectPath} replace /> : null;

  return (
    redirect || (
      <Header>
        <LoginPanel />
      </Header>
    )
  );
};

export default LoginPage;
