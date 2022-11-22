import React, { useEffect } from 'react';
import { userAuthActions } from '../features/UserAuthentication';
import { useAppDispatch } from '../store';

const LogoutPage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(userAuthActions.logout());
  }, [dispatch]);

  return <></>;
};

export default LogoutPage;
