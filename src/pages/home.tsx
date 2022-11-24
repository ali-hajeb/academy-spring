import React, { useEffect, useState, useCallback } from 'react';
import TextInput from '../components/TextInput';
import Header from '../containers/Header';
import Section from '../containers/Section';
import coursesAction from '../features/Courses/store/coursesAction';
import { searchCourse, setSearchClue } from '../features/Courses/store/coursesSlice';
import { useAppDispatch, useAppSelector } from '../store';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import CourseCard, { CourseCardSkeleton } from '../components/Card/CourseCard';
import { debounce } from '../utils';
import ErrorBox from '../components/Error';

export interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
  const [search, setSearch] = useState('');

  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.courses);

  const searchHandler = useCallback(debounce(setSearch, 500), []);
  const getCoursesHandler = useCallback(
    () => dispatch(coursesAction.getCourses({pageSize: 'ALL'})),
    [dispatch]
  );

  useEffect(() => {
    getCoursesHandler();
  }, [getCoursesHandler]);
  return (
    <>
      <Header />
      <Section title="دوره‌های آکادمی بهار" className="isolate mt-5">
        <div className="search-box mx-4 my-4">
          <TextInput
            type={'search'}
            id="search"
            icon={<MagnifyingGlassIcon height="2rem" />}
            placeholder="نام دوره ..."
            // value={search}
            onChange={(e) => searchHandler(e.target.value)}
          />
        </div>
        <div className="p-5">
          {courses.status === 'loading' ? (
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <CourseCardSkeleton count={12} />
            </div>
          ) : courses.status === 'failed' ? (
            <div className="py-20">
              <ErrorBox
                message="مشکلی در دریافت اطلاعات پیش آمد!"
                retry={getCoursesHandler}
                withSadFace
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {courses.coursesList
                ?.filter((course) =>
                  search
                    ? course.title.toLowerCase().includes(search.toLowerCase())
                    : course
                )
                .map((course) => {
                  return <CourseCard key={course._id} {...course} />;
                })}
            </div>
          )}
        </div>
      </Section>
    </>
  );
};

export default HomePage;
