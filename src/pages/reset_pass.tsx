import React from 'react';
import Header from '../components/Header';
import ResetPassPanel from '../containers/ResetPassPanel';

export interface ResetPassPageProps {}

const ResetPassPage: React.FunctionComponent<ResetPassPageProps> = () => {
  return (
    <Header>
      <ResetPassPanel />
    </Header>
  );
};

export default ResetPassPage;
