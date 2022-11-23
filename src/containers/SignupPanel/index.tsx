import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker, {
  DayValue,
} from '@amir04lm26/react-modern-calendar-date-picker';
import Alert from '../../components/Alert';
import Spinner from '../../components/Spinner';
import TextInput, {
  InputGroup,
  InputWrapper,
} from '../../components/TextInput';
import UserFormBox from '../../components/UserFormBox';
import {
  resetResponse,
  userAuthActions,
} from '../../features/UserAuthentication';
import { useAppDispatch, useAppSelector } from '../../store';
import '@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css';

export interface SignUpPanelProps {}

const SignUpPanel: React.FunctionComponent<SignUpPanelProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { status, response } = useAppSelector((state) => state.user);

  const [birthDate, setBirthDate] = useState<DayValue>(null);

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      nationalId: '',
    },
    validate: {
      email: (value) =>
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
          ? null
          : 'ایمیل معتبر نیست!',
      confirmPassword: (value, values) =>
        value !== values.password ? 'گذرواژه یکسان نیست' : null,
    },
    validateInputOnChange: true,
  });

  const loginHanlder = form.onSubmit(
    (values, e) => {
      console.log(values, e);
      const { firstName, lastName, email, password, phoneNumber, nationalId } =
        values;
      dispatch(
        userAuthActions.signUp({
          fullName: `${firstName} ${lastName}`,
          email,
          password,
          phoneNumber,
          birthDate: `${birthDate?.year}/${birthDate?.month}/${birthDate?.day}`,
          nationalId,
          profile:
            'https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg',
        })
      );
    },
    (err) => {
      console.error(err);
    }
  );

  const buttonNavigateHandler = () => {
    dispatch(resetResponse());
    navigate('/login');
  };
  return (
    <UserFormBox formSubmitHandler={loginHanlder}>
      <h1 className="text-xl text-center font-bold">نام‌نویسی در آکادمی!</h1>
      <Alert
        response={(response?.message && response?.message[0]) || null}
        title="ای بابا!"
      />
      <div className="grid grid-cols-2 gap-2 mt-2">
        <TextInput
          id="firstname"
          label="نام"
          type={'text'}
          placeholder="محمد"
          required
          {...form.getInputProps('firstName')}
        />
        <TextInput
          id="lastname"
          label="نام خانوادگی"
          type={'text'}
          placeholder="محمدی"
          required
          {...form.getInputProps('lastName')}
        />
      </div>
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
      <TextInput
        id="confirmpassword"
        label="تکرار گذرواژه"
        type="password"
        placeholder="گذرواژه خود را دوباره وارد کنید"
        required
        {...form.getInputProps('confirmPassword')}
      />
      <TextInput
        id="nationalId"
        label="کد ملی"
        type={'number'}
        placeholder="6745556256"
        inputClassName="persian-digits"
        dir="ltr"
        required
        {...form.getInputProps('nationalId')}
      />
      <TextInput
        id="phoneNumber"
        label="تلفن همراه"
        type={'tel'}
        placeholder="0912XXXXXXX"
        inputClassName="persian-digits"
        dir="ltr"
        required
        {...form.getInputProps('phoneNumber')}
      />
      <InputGroup>
        <label htmlFor="">تاریخ تولد</label>
        <InputWrapper>
          <DatePicker
            inputPlaceholder="انتخاب تاریخ تولد"
            inputClassName="rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm"
            wrapperClassName="w-full"
            value={birthDate}
            onChange={setBirthDate}
            shouldHighlightWeekends
            locale={'fa'}
          />
        </InputWrapper>
      </InputGroup>
      <div className="mt-3">
        <button
          className="flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1.5 rounded-md shadow-md w-full disabled:bg-gray-300"
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' && <Spinner />}
          <div>نام‌نویسی</div>
        </button>
        <button
          type="button"
          className="mt-1 text-indigo-600 px-2 py-1.5 rounded-md hover:bg-indigo-200/20 w-full"
          onClick={buttonNavigateHandler}
        >
          قبلاً ثبت نام کردی؟ وارد شو!
        </button>
      </div>
    </UserFormBox>
  );
};

export default SignUpPanel;
