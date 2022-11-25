import { Navigate, useParams } from 'react-router-dom';
import React from 'react';
import { useFetchCourseById } from '../features/Courses/hooks/useFetchCourseById';
import CoursePanel from '../containers/CoursePanel';

import LoadingAnimation from '../components/loadingAnimation/loadingAnimation';

export interface CoursePageProps {}

const CoursePage: React.FunctionComponent<CoursePageProps> = () => {
  const { id } = useParams() as { id: string };
  const { course, toggleLike, addStudentToCourse } = useFetchCourseById(id);

  return course.status === 'succeeded' ? (
    <CoursePanel
      course={course}
      toggleLike={toggleLike}
      addStudentToCourse={addStudentToCourse}
    />
  ) : course.status === 'failed'?<Navigate to={'/1'} />: (
    <div className="w-screen min-h-screen relative flex justify-center items-center">
      <LoadingAnimation />
    </div>
  );
};

export default CoursePage;
