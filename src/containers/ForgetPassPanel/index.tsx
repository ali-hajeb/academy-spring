import { useForm } from '@mantine/form';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';
import CardContainer from '../../components/Card/CardContainer';
import Spinner from '../../components/Spinner';
import TextInput from '../../components/TextInput';
import UserFormBox from '../../components/UserFormBox';
import {
  IResponse,
  IUserForgotPasswordTokenObject,
} from '../../features/UserAuthentication/types/user';

export interface ForgetPassPanelProps {}

const ForgetPassPanel: React.FunctionComponent<ForgetPassPanelProps> = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<IResponse | null>(null);

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) =>
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
          ? null
          : 'ایمیل معتبر نیست!',
    },
    validateInputOnChange: true,
  });

  const forgetPassHanlder = form.onSubmit(
    (values, e) => {
      console.log(values, e);
      setIsLoading(true);
      setResponse(null);
      try {
        const userFP: IUserForgotPasswordTokenObject = JSON.parse(
          localStorage.getItem('user_fp') || '{}'
        );
        if (
          userFP.resetPasswordExpires &&
          userFP.email === values.email &&
          new Date(userFP.resetPasswordExpires).getMilliseconds() <
            new Date().getMilliseconds()
        ) {
          setIsLoading(false);
          navigate(`/reset_pass/${userFP.resetPasswordToken}`);
        } else {
          setIsLoading(false);
          const errorResponse: IResponse = {
            success: false,
            message: [{ eventId: 500, message: 'یه مشکلی پیش اومده!' }],
          };
          setResponse(errorResponse);
        }
      } catch (error) {
        setIsLoading(false);
        let errorResponse: IResponse = {
          success: false,
          message: [{ eventId: 500, message: 'یه مشکلی پیش اومده!' }],
        };
        if (axios.isAxiosError(error)) {
          if (error.status !== 500)
            errorResponse = { ...errorResponse, ...error.response?.data };
        }
        setResponse(errorResponse);
      }
    },
    (err) => {
      console.error(err);
    }
  );
  return (
    <UserFormBox formSubmitHandler={forgetPassHanlder}>
      <CardContainer>
        <div className="p-3">
          <h1 className="text-xl text-center font-bold">فراموشی گذرواژه</h1>
          <Alert
            response={(response?.message && response?.message[0]) || null}
          />
          <TextInput
            id="email"
            label="ایمیل"
            type={'email'}
            placeholder="example@example.com"
            dir="auto"
            required
            {...form.getInputProps('email')}
          />
          <div className="mt-3">
            <button
              className="flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1.5 rounded-md shadow-md w-full disabled:bg-gray-300"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Spinner />}
              <div>تأیید</div>
            </button>
          </div>
        </div>
      </CardContainer>
    </UserFormBox>
  );
};

export default ForgetPassPanel;
