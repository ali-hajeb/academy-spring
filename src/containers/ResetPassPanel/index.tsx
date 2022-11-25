import { useForm } from '@mantine/form';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../../components/Alert';
import CardContainer from '../../components/Card/CardContainer';
import Spinner from '../../components/Spinner';
import TextInput from '../../components/TextInput';
import UserFormBox from '../../components/UserFormBox';
import authService from '../../features/UserAuthentication/services/authService';
import {
  IResponse,
  IUserForgotPasswordTokenObject,
} from '../../features/UserAuthentication/types/user';

export interface ResetPassPanelProps {}

const ResetPassPanel: React.FunctionComponent<ResetPassPanelProps> = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<IResponse | null>(null);
  const [invalidToken, setInvalidToken] = useState(false);

  useEffect(() => {
    if (!token) {
      const errorResponse: IResponse = {
        success: false,
        message: [{ eventId: 500, message: 'توکن نامعتبر است!' }],
      };
      setResponse(errorResponse);
      setInvalidToken(true);
    }
  }, [token]);

  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'گذرواژه یکسان نیست' : null,
    },
    validateInputOnChange: true,
  });

  const resetPassHanlder = form.onSubmit(
    async (values, e) => {
      console.log(values, e);
      if (token) {
        setIsLoading(true);
        setResponse(null);
        try {
          const response = await authService.resetPassword(
            token,
            values.password
          );

          navigate('/login', { replace: true });
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
      }
    },
    (err) => {
      console.error(err);
    }
  );
  return (
    <UserFormBox formSubmitHandler={resetPassHanlder}>
      <CardContainer>
        <div className="p-3">
          <h1 className="text-xl text-center font-bold">تغییر گذرواژه</h1>
          <Alert
            response={(response?.message && response?.message[0]) || null}
          />
          <TextInput
            id="password"
            label="گذرواژه"
            type="password"
            placeholder="گذرواژه کاربر"
            disabled={invalidToken}
            required
            {...form.getInputProps('password')}
          />
          <TextInput
            id="confirmpassword"
            label="تکرار گذرواژه"
            type="password"
            placeholder="گذرواژه خود را دوباره وارد کنید"
            disabled={invalidToken}
            required
            {...form.getInputProps('confirmPassword')}
          />
          <div className="mt-3">
            <button
              className="flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1.5 rounded-md shadow-md w-full disabled:bg-gray-300"
              type="submit"
              disabled={isLoading || invalidToken}
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

export default ResetPassPanel;
