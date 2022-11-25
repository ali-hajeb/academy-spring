import {
  configureStore,
  createListenerMiddleware,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer from '../features/UserAuthentication/store/userSlice';
import courseReducer, {
  searchCourse,
  setSearchClue,
} from '../features/Courses/store/coursesSlice';
import coursesAction from '../features/Courses/store/coursesAction';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: coursesAction.getCourses.fulfilled,
  effect: (_, { dispatch }) => {
    dispatch(setSearchClue(''));
  },
});
listenerMiddleware.startListening({
  actionCreator: coursesAction.searchAllCourses.fulfilled,
  effect: (_, { dispatch }) => {
    dispatch(searchCourse());
  },
});

const store = configureStore({
  reducer: {
    user: userReducer,
    courses: courseReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(listenerMiddleware.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
