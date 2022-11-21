import { createAsyncThunk } from '@reduxjs/toolkit';
import courseRequest from '../../UserAuthentication/services/courseService';
import { ICoursesResponseObject } from '../types/courses';


const getAllCourses = createAsyncThunk(
  'courses/getAllCourses',
   async() => {
   const res = await courseRequest.getAllCourses();
   const coursesData = res.data as ICoursesResponseObject;
   return coursesData;
  },
);




const coursesAction = {
getAllCourses
};

export default coursesAction;
