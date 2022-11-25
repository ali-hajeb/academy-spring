/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import TextInput from '../components/TextInput';
import Header from '../components/Header';
import Section from '../components/Section';
import coursesAction from '../features/Courses/store/coursesAction';
import PaginationBar from '../components/paginationBar';
import { setSearchClue } from '../features/Courses/store/coursesSlice';
import { useAppDispatch, useAppSelector } from '../store';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import CourseCard, { CourseCardSkeleton } from '../components/Card/CourseCard';
import { debounce } from '../utils';
import ErrorBox from '../components/Error';
import Navbar from '../components/Navbar/Navbar';
import { INavItem } from '../components/Navbar/types';
import { useNavigate, useParams } from 'react-router-dom';

const navbarItems: INavItem[] = [
  { id: '1', title: 'خانه', to: '/' },
  { id: '2', title: 'تماس با ما', to: '/contact-us' },
];

export interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dispatch = useAppDispatch();
  const isUserLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const courses = useAppSelector((state) => state.courses);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchHandler = useCallback(
    debounce((value: string) => {
      dispatch(setSearchClue(value));
      dispatch(coursesAction.searchAllCourses())
    }, 500),
    []
  );
  const pageNumber = useParams().pageNumber;
  const navigate = useNavigate();
  const getCoursesHandler = useCallback(
    () =>
      dispatch(
        coursesAction.getCourses({
          pageSize: 6,
          pageNumber: pageNumber ? +pageNumber : 1,
        })
      ),
    [dispatch, pageNumber]
  );

  useEffect(() => {
    getCoursesHandler();
    if (
      pageNumber === undefined ||
      +pageNumber > courses.paginationPagesCount
    ) {
      navigate('/1');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCoursesHandler]);
  return (
    <>
      <Header
        navbar={
          <Navbar
            items={navbarItems}
            isUserLoggedIn={isUserLoggedIn}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        }
      >
        <div className="academy-logo flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="rgb(79, 70, 229)"
            className="w-[128px] h-[128px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
          آکادمی بهار
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
          فضایی برای یادگیری، رشد حرفه‌ای و همگرایی توسعه‌دهندگان
        </p>
        <div className="mt-8 flex gap-x-4 sm:justify-center">
          <a
            href="#"
            className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
          >
            دوره‌ها
          </a>
          <a
            href="#"
            className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
          >
            درباره‌ی ما
          </a>
        </div>
      </Header>
      <Section title="دوره‌های آکادمی بهار" className="isolate mt-5">
        <TextInput
          type={'search'}
          id="search"
          icon={<MagnifyingGlassIcon height="2rem" />}
          placeholder="نام دوره ..."
          // value={search}
          onChange={(e) => searchHandler(e.target.value)}
        />
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
              {courses.coursesList?.map((course) => {
                return <CourseCard key={course._id} {...course} />;
              })}
            </div>
          )}
        </div>
        <PaginationBar />
      </Section>
    </>
  );
};

export default HomePage;
