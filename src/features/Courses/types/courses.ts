
export interface ITeacher {
  _id:string,
  fullName: string,
  email: string,
  profile: string
}

export interface ILesson {

  topics: string[] ,
_id: string,
lessonName: string,
description: string,
image: string
}

export interface IStudent{
  _id: string,
  fullName: string,
  email: string,
  profile: string
}

export interface ICourse {
lesson: ILesson,
teacher: ITeacher,
  _id: string,
  title: string,
  cost: number,
  endDate: string,
  startDate: string,
  capacity: number,
  students: IStudent[],
  __v: number
};

export interface IResponseMessage {
  eventId: number;
  message: string;
}

export interface ICoursesResponseObject{
  success: Boolean,
  result:ICourse[],
  message:IResponseMessage[]
}

export interface ICoursesRedux {
  coursesList: ICourse[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  response: { code: number; message: string } | null;
} 