import React from 'react';
import Header from '../components/Header';
import ForgetPassPanel from '../containers/ForgetPassPanel';

export interface ForgetPassPageProps {}

const ForgetPassPage: React.FunctionComponent<ForgetPassPageProps> = () => {
  return (
    <Header>
      <ForgetPassPanel />
    </Header>
  );
};

export default ForgetPassPage;
