import { createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import courseRequest from '../services/courseService';
import { ICoursesPaginationResponseObject, ICoursesRedux, ICoursesResponseObject, IGetCoursesParams} from '../types/courses';
import { searchCourse } from './coursesSlice';




const searchAllCourses = createAsyncThunk(
  'courses/searchAllCourses',
   async(_, {dispatch, getState,rejectWithValue}) => {
    const { courses } = getState() as { courses: ICoursesRedux };
    if (courses.paginationPagesCount > 1) {
      const res = await courseRequest.getAllCourses();
      const coursesData = res.data as ICoursesResponseObject;
      return coursesData;
    }else{
      dispatch(searchCourse());
      return rejectWithValue(undefined);
    }
   
  },
);

const getCourses = createAsyncThunk(
  'courses/getCourses',
   async({pageNumber, pageSize='ALL'}:IGetCoursesParams, { rejectWithValue}) => {
    try {
    
    let coursesData: ICoursesResponseObject | ICoursesPaginationResponseObject ;
   if (pageSize === 'ALL') {
    const res = await courseRequest.getAllCourses() 
    coursesData = res.data as ICoursesResponseObject;
   } else if(typeof pageNumber === 'number' ) {
    const res = await courseRequest.getCoursesForPagination(pageNumber,pageSize); 
    coursesData = res.data as ICoursesPaginationResponseObject;
   } else{
    throw Error('please pass valid parameters to courses/getCourses thunk')
   }


   
   return coursesData;
      
    } catch (error) {
      let errorResponse = { code: 500, message: 'Something went wrong!' };
      if (axios.isAxiosError(error)) {
        errorResponse.code = error.status || 500;

        errorResponse = { ...errorResponse, ...error.response?.data };
      }
  
      
      return rejectWithValue(errorResponse);
    }
    
  },
);




const coursesAction = {
getCourses,
searchAllCourses
};

export default coursesAction;
