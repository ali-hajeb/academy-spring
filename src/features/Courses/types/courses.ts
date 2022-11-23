
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
  eventId?: number;
  code?: string,
  message: string;
}

export interface ICoursesResponseObject{
  success: Boolean,
  result:ICourse[],
  message:IResponseMessage[]
}
export interface ICoursesPaginationResponseObject{
  success: Boolean,
  result:ICourse[],
  count: number,
  message:IResponseMessage[]
}

export interface ICoursesRedux {
  coursesList: ICourse[],
  rawCoursesList: ICourse[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  response: IResponseMessage | null;
  searchClue: string;
  paginationPagesCount:number;
} 

export interface IGetPaginatedCoursesParams {
  pageNumber: number,
  pageSize: number ;
}
export interface IGetCoursesParams {
  pageNumber?: number,
  pageSize: number|'ALL' ;
}