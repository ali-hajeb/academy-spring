import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAuthActions } from '../features/UserAuthentication';
import { useAppDispatch } from '../store';

const LogoutPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userAuthActions.logout());
    navigate('/', { replace: true });
  }, [dispatch]);

  return <></>;
};

export default LogoutPage;
