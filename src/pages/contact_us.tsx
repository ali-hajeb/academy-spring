import React from 'react';
import ContactUsPanel from '../containers/ContactUsPanel';

export interface ContactUsPageProps {}

const ContactUsPage: React.FunctionComponent<ContactUsPageProps> = () => {
  return (
    <>
      <ContactUsPanel />
    </>
  );
};

export default ContactUsPage;
