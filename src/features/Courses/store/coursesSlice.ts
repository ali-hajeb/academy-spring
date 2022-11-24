import { createSlice } from '@reduxjs/toolkit';


// import { userLocalStorageKey } from '../../constants';
import { ICourse, ICoursesRedux } from '../types/courses';
import coursesAction from './coursesAction';


const initialState: ICoursesRedux = {
  coursesList : [] as ICourse[] ,
  rawCoursesList:[] as ICourse[],
  status: 'idle',
  response: null,
  searchClue:'',
  paginationPagesCount: 1,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSearchClue:(state,action)=>{
state.searchClue = action.payload;
if (action.payload === '') {
  state.coursesList = state.rawCoursesList;
}
    },
    searchCourse:(state)=>{
     
     if (state.searchClue) {
          state.coursesList = state.rawCoursesList.filter(course=>{ 
      const doseContainCourseTitle = course.title.toLowerCase().includes(state.searchClue.toLowerCase()) ;
      const doseContainCourseTeacher = course.teacher.fullName.toLowerCase().includes(state.searchClue.toLowerCase());
      const doseContainCourseLessonName = course.lesson.lessonName.toLowerCase().includes(state.searchClue.toLowerCase());
      const doseContainCourseTopics = course.lesson.topics.includes(state.searchClue.toLowerCase());
      return doseContainCourseTeacher || doseContainCourseTitle || doseContainCourseTopics || doseContainCourseLessonName;     
     });
     } else{
      state.coursesList = state.rawCoursesList;
     }
    }
  },
  extraReducers: {
    [coursesAction.getCourses.pending.toString()]: (state, action) => {
      state.status = 'loading';
      state.coursesList =[];
      state.rawCoursesList = [];
      state.response = action.payload ;
    },
    [coursesAction.getCourses.fulfilled.toString()]: (state, action) => {
      const payload = JSON.parse(action.payload);
      state.status = 'succeeded';
      
      state.response = payload.message[0];
      if (action.meta.arg.pageSize === 'ALL') {
        // state.coursesList = payload.result;
      state.rawCoursesList = payload.result;
        state.paginationPagesCount = 1;
      }else{
        // state.coursesList = payload.result.courses;
      state.rawCoursesList = payload.result.courses;
        state.paginationPagesCount = Math.ceil(payload.result.count / action.meta.arg.pageSize)
      }
    },
    [coursesAction.getCourses.rejected.toString()]: (state, action) => {
      state.status = 'failed';
      state.coursesList = [];
      state.rawCoursesList = [];
      const {code, message} =  action?.error
      state.response = action.payload ? action.payload : {code,message};
      state.paginationPagesCount = 1;
    
    },




    [coursesAction.searchAllCourses.pending.toString()]: (state, action) => {
      state.status = 'loading';
      state.response = action.payload ;
      
    },
    [coursesAction.searchAllCourses.fulfilled.toString()]: (state, action) => {
      const payload = JSON.parse(action.payload);
      state.status = 'succeeded';
        state.rawCoursesList = payload.result;
        state.paginationPagesCount = 1;
      state.response = payload.message[0];
    },
    [coursesAction.searchAllCourses.rejected.toString()]: (state, action) => {
      if (action.error.message !== 'Rejected') {
        state.status = 'failed';
      const {code, message} =  action?.error;
      state.response = action.payload ? action.payload : {code,message};
      }
      
    },
  },
});

export const {searchCourse, setSearchClue} = coursesSlice.actions;
export default coursesSlice.reducer;
