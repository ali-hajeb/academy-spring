import React from 'react';
import { useParams } from 'react-router-dom';

export interface CoursePageProps {
  
}

const CoursePage: React.FunctionComponent<CoursePageProps> = () => {
  const {id} = useParams();
  return (
    <>
      <h1>Course{id}</h1>
    </>
  );
}

export default CoursePage;