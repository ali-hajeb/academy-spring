import { useForm } from '@mantine/form';
import axios from 'axios';
import React, { useState } from 'react';
import Alert from '../../components/Alert';
import CardContainer from '../../components/Card/CardContainer';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import TextInput, {
  InputGroup,
  InputWrapper,
} from '../../components/TextInput';
import UserFormBox from '../../components/UserFormBox';

export interface ContactUsPanelProps {}

const ContactUsPanel: React.FunctionComponent<ContactUsPanelProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{
    eventId: number;
    message: string;
  } | null>(null);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      text: '',
    },
    validate: {
      email: (value) =>
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
          ? null
          : 'ایمیل معتبر نیست!',
    },
    validateInputOnChange: true,
  });

  const contactUsHandler = form.onSubmit((values, e) => {
    setIsLoading(true);
    setResponse(null);
    axios
      .post(process.env.REACT_APP_API_URL + '/api/contactUs', { ...values })
      .then((res) => {
        setIsLoading(false);
        setResponse({ eventId: 200, message: 'ارسال شد!' });
      })
      .catch((err) => {
        console.error(err);
        setResponse({ eventId: 500, message: 'مشکلی در ارسال پیام پیش آمد!' });
      });
  });
  return (
    <Header>
      <UserFormBox formSubmitHandler={contactUsHandler}>
        <CardContainer>
          <div className="p-3">
            <h1 className="text-lg font-bold text-center">تماس با ما</h1>
            <Alert response={response} />
            <TextInput
              id="name"
              label="نام"
              type={'text'}
              placeholder="محمد"
              required
              {...form.getInputProps('name')}
            />
            <TextInput
              id="email"
              label="ایمیل"
              type={'email'}
              placeholder="example@example.com"
              dir="ltr"
              required
              {...form.getInputProps('email')}
            />
            <InputGroup>
              <label htmlFor="text">پیام</label>
              <InputWrapper>
                <textarea
                  id="text"
                  dir="auto"
                  className="appearance-none relative block grow placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  {...form.getInputProps('text')}
                />
              </InputWrapper>
            </InputGroup>
            <div className="mt-3">
              <button
                className="flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1.5 rounded-md shadow-md w-full disabled:bg-gray-300"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Spinner />}
                <div>ارسال</div>
              </button>
            </div>
          </div>
        </CardContainer>
      </UserFormBox>
    </Header>
  );
};

export default ContactUsPanel;
