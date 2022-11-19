export interface IUserSignUpObject {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string;
  nationalId: string;
  profile: string;
}

export interface IUserLoginObject {
  email: string;
  password: string;
  remember: boolean;
}

export interface IStudent {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  role: string;
  isActive: true;
  nationalId: string;
  registerDate: Date | null;
  profile: string;
}

export interface IUserAuthResponseObject {
  success: boolean;
  results: {
    studentModel: IStudent;
    jwtToken: string;
  };
  message: IResponseMessage[];
}

export interface IResponseMessage {
  eventId: number;
  message: string;
}

export interface IUserRedux extends IUser {
  isLoggedIn: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  response: { code: number; message: string } | null;
}

export default interface IUser extends IStudent{
  token: string;
}