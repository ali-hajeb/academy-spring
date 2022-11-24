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
  // remember: boolean;
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

export interface IResponseMessage {
  eventId: number;
  message: string;
}

export interface IResponse {
  success: boolean;
  message: IResponseMessage[];
}

export interface ILoginResponse {
  success: boolean;
  message: {
    eventId: number,
    message: IResponseMessage[]
  };
}

export interface IUserAuthResponseObject extends IResponse {
  result: {
    studentModel: IStudent;
    jwtToken: string;
  };
}

export interface IUserRedux extends IUser {
  isLoggedIn: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  response: IResponse | ILoginResponse | null;
}

export default interface IUser extends IStudent {
  token: string;
}
