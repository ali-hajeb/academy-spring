import { useParams } from 'react-router-dom';
import React from 'react';
import { useFetchCourseById } from '../features/Courses/hooks/useFetchCourseById';

export interface CoursePageProps {
  
}
const btnStyle = 'bg-slate-400 hover:bg-slate-500 text-slate-100 p-2 rounded-md';
const CoursePage: React.FunctionComponent<CoursePageProps> = () => {
  const {id} = useParams() as {id: string};
  const {course, likeCourse, disLikeCourse, addStudentToCourse} = useFetchCourseById(id)

  return (
    <div className='w-full bg-slate-200 gap-3 p-2 flex flex-col min-h-screen' >
      <h1>Course_{course.status}</h1>
<button onClick={likeCourse} className={btnStyle}  >like</button>
<button className={btnStyle}  >addStudent</button>
<button onClick={disLikeCourse} className={btnStyle}  >disLike</button>
<div className='bg-zinc-300 p-2 rounded-md'>{`likeCount:$`}</div>
    </div>
  );
}

export default CoursePage;