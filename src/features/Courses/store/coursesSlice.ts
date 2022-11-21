import { createSlice } from '@reduxjs/toolkit';

// import { userLocalStorageKey } from '../../constants';
import { ICourse, ICoursesRedux } from '../types/courses';
import coursesAction from './coursesAction';


const initialState: ICoursesRedux = {
  coursesList : [] as ICourse[] ,
  status: 'idle',
  response: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
  },
  extraReducers: {
    [coursesAction.getAllCourses.pending.toString()]: (state) => {
      state.status = 'loading';
      state.coursesList =[]
    },
    [coursesAction.getAllCourses.fulfilled.toString()]: (state, action) => {
      const payload = JSON.parse(action.payload);
      console.log(payload);
      
      state.status = 'succeeded';
      state.coursesList = payload.result;
      state.response = payload.message;

    },
    [coursesAction.getAllCourses.rejected.toString()]: (state, action) => {
      
      const payload = JSON.parse(action.payload);
      console.log(payload);
      state.status = 'failed';
      
      state.coursesList = payload.result;
      state.response = payload.message;
    },
  },
});

// export const {} = coursesSlice.actions;
export default coursesSlice.reducer;
