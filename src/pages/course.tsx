import { useParams } from 'react-router-dom';
import React from 'react';
import { useFetchCourseById } from '../features/Courses/hooks/useFetchCourseById';
import CoursePanel from '../containers/CoursePanel';

export interface CoursePageProps {}
const btnStyle =
  'bg-slate-400 hover:bg-slate-500 text-slate-100 p-2 rounded-md';
const CoursePage: React.FunctionComponent<CoursePageProps> = () => {
  const { id } = useParams() as { id: string };
  const { course, likeCourse, disLikeCourse, addStudentToCourse } =
    useFetchCourseById(id);

  return course.payload ?(<CoursePanel {...course.payload} />
    // <div className="w-full bg-slate-200 gap-3 p-2 flex flex-col min-h-screen">
    //   <h1>Course_{course.status}</h1>
    //   <button onClick={likeCourse} className={btnStyle}>
    //     like
    //   </button>
    //   <button onClick={disLikeCourse} className={btnStyle}>
    //     disLike
    //   </button>
    //   <button onClick={addStudentToCourse} className={btnStyle}>
    //     Enroll
    //   </button>
    //   <div className="bg-zinc-300 p-2 rounded-md">{`likeCount: ${course.count.like}`}</div>
    // </div>
  ) : <></>;
};

export default CoursePage;
