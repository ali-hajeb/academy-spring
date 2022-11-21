import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import coursesAction from '../features/Courses/store/coursesAction';
import { useAppDispatch, useAppSelector } from '../store';

export interface HomePageProps {
  
}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
  
  const dispatch = useAppDispatch();
  const courses = useAppSelector(state=>state.courses)
  useEffect(()=>{dispatch(coursesAction.getAllCourses())},[dispatch])
  return (
    <>
      <h1 className='bg-red-100'>Home</h1>
      <div className='grid grid-cols-12' >
{courses.coursesList?.map(course=>{
  return <Link state={course} to={`courses/${course._id}`} key={course._id} >{course.title}</Link>
})}
      </div>
    </>
  );
}

export default HomePage;