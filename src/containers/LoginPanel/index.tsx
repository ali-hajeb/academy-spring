import React from 'react';
import { useForm } from '@mantine/form';
import TextInput from '../../components/TextInput';
import UserFormBox from '../../components/UserFormBox';
import {
  resetResponse,
  userAuthActions,
} from '../../features/UserAuthentication';
import { useAppDispatch, useAppSelector } from '../../store';
import Spinner from '../../components/Spinner';
import Alert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';

export interface LoginPanelProps {}

const LoginPanel: React.FunctionComponent<LoginPanelProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { status, response } = useAppSelector((state) => state.user);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) =>
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
          ? null
          : 'ایمیل معتبر نیست!',
    },
    validateInputOnChange: true,
  });

  const loginHanlder = form.onSubmit(
    (values, e) => {
      console.log(values, e);
      dispatch(userAuthActions.login(values));
    },
    (err) => {
      console.error(err);
    }
  );

  const buttonNavigateHandler = () => {
    dispatch(resetResponse());
    navigate('/signup');
  };
  return (
    <UserFormBox formSubmitHandler={loginHanlder}>
      <h1 className="text-xl text-center font-bold">ورود به آکادمی!</h1>
      <Alert
        response={(response?.message && response?.message[0]) || null}
        title="ای بابا!"
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
      <TextInput
        id="password"
        label="گذرواژه"
        type="password"
        placeholder="گذرواژه کاربر"
        required
        {...form.getInputProps('password')}
      />
      <div className="mt-3">
        <button
          className="flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1.5 rounded-md shadow-md w-full disabled:bg-gray-300"
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' && <Spinner />}
          <div>ورود</div>
        </button>
        <button
          type="button"
          className="mt-1 text-indigo-600 px-2 py-1.5 rounded-md hover:bg-indigo-200/20 w-full"
          onClick={buttonNavigateHandler}
        >
          تازه واردی؟ ثبت نام کن!
        </button>
      </div>
    </UserFormBox>
  );
};

export default LoginPanel;
