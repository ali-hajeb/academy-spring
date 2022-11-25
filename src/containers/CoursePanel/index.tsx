import React from 'react';
import moment from 'jalali-moment';
import CardContainer from '../../components/Card/CardContainer';
import Header from '../../components/Header';
import { ICourse } from '../../features/Courses/types/courses';
import {
  CodeBracketIcon,
  UserIcon,
  UsersIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  BookmarkIcon as OutlineBookmarkIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon } from '@heroicons/react/24/solid';
import { numberWithCommas } from '../../utils';
import { useAppSelector } from '../../store';
import { useNavigate } from 'react-router-dom';

export interface CoursePanelProps {
  course: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: { message: string } | undefined;
    payload: ICourse;
    isLiked: boolean;
    count: number;
    isStudentEnrolled: boolean;
  };
  toggleLike: () => void;
  addStudentToCourse: () => void;
}

const CoursePanel: React.FunctionComponent<CoursePanelProps> = (props) => {
  const isUserLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  return (
    <Header>
      <div dir="ltr" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="">
          <CardContainer>
            <header className="flex items-center justify-center min-h-[200px]">
              <CodeBracketIcon strokeWidth={1} width={'128px'} />
            </header>
            <section className="card-content p-2">
              <h2 dir="auto" className="font-bold text-3xl text-center">
                {props?.course?.payload?.title}
              </h2>
              <div className="flex items-center gap-2">
                {isUserLoggedIn && (
                  <button
                    onClick={props.toggleLike}
                    className={`flex justify-center items-center my-2 px-2 py-1 disabled:bg-gray-300`}
                  >
                    {props.course.isLiked ? (
                      <BookmarkIcon
                        color="rgb(99, 102, 241)"
                        height={'1.5rem'}
                      />
                    ) : (
                      <OutlineBookmarkIcon
                        color="rgb(99, 102, 241)"
                        height={'1.5rem'}
                      />
                    )}
                  </button>
                )}
                <button
                  type="button"
                  className={`flex justify-center items-center grow my-2 bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1.5 rounded-md shadow-md w-full ${
                    props.course.isStudentEnrolled
                      ? 'disabled:bg-green-500'
                      : 'disabled:bg-gray-300'
                  } `}
                  onClick={() => {
                    if (isUserLoggedIn) {
                      props.addStudentToCourse();
                    } else {
                      navigate('/login', {
                        state: { from: `/courses/${props.course.payload._id}` },
                      });
                    }
                  }}
                  disabled={
                    props?.course?.payload?.students?.length >=
                      props?.course?.payload?.capacity ||
                    moment
                      .from(props?.course?.payload?.startDate, 'fa')
                      .isBefore(moment(), 'milliseconds') ||
                    props.course.isStudentEnrolled
                  }
                >
                  {props?.course?.payload?.students?.length >=
                  props?.course?.payload?.capacity
                    ? 'ظرفیت تکمیل است!'
                    : moment
                        .from(props?.course?.payload?.startDate, 'fa')
                        .isBefore(moment(), 'milliseconds')
                    ? 'پایان مهلت نام‌نویسی'
                    : props.course.isStudentEnrolled
                    ? 'ثبت نام موفق'
                    : 'نام‌نویسی'}
                </button>
              </div>

              <div className="text-gray-400 mt-2 text-sm">
                <div dir="rtl" className="flex items-center gap-2">
                  <div>
                    <CalendarDaysIcon height={'1.5rem'} />
                  </div>
                  {/* <div>بازه ثبت نام</div> */}
                  <div className="persian-digits">
                    {`${moment(props?.course?.payload?.endDate).format(
                      'YYYY/MM/DD'
                    )} تا ${moment(props?.course?.payload?.startDate).format(
                      'YYYY/MM/DD'
                    )}`}
                  </div>
                </div>
                <div dir="rtl" className="flex items-center mt-2 gap-2">
                  <div>
                    <UsersIcon height={'1.5rem'} />
                  </div>
                  {/* <div>ظرفیت باقی‌مانده:</div> */}
                  <div className="persian-digits">
                    {`${
                      props?.course?.payload?.capacity -
                      props?.course?.payload?.students?.length
                    } نفر باقی‌مانده`}
                  </div>
                </div>
                <div dir="rtl" className="flex items-center mt-2 gap-2">
                  <div>
                    <BanknotesIcon height={'1.5rem'} />
                  </div>
                  {/* <div>قیمت: </div> */}
                  <div className="persian-digits">
                    {`${numberWithCommas(props?.course?.payload?.cost)} تومان`}
                  </div>
                </div>
              </div>
            </section>
          </CardContainer>
        </div>
        <div className="col-span-2">
          <CardContainer>
            <section className="card-content p-2 md:min-h-[400px]">
              <h2 dir="auto" className="font-bold text-lg">
                {props?.course?.payload?.lesson?.lessonName}
              </h2>
              <p dir="auto" className="mb-5">
                {props?.course?.payload?.lesson?.description}
              </p>
              <h2 dir="auto" className="font-bold ">
                Topics
              </h2>
              <div className="flex items-center gap-2 mb-5">
                {props?.course?.payload?.lesson?.topics.map((t, i) => (
                  <div
                    key={t + i}
                    className="rounded-3xl bg-blue-100 text-blue-500 px-3 py-1 text-sm"
                  >
                    #{t}
                  </div>
                ))}
              </div>
              <h2 dir="auto" className="font-bold ">
                Teacher
              </h2>
              <div className="flex items-center gap-2">
                <div>
                  <UserIcon height={'2rem'} />
                </div>
                <div>
                  <div className="font-bold">
                    {props?.course?.payload?.teacher?.fullName}
                  </div>
                  <div className="text-gray-500 text-sm">Programmer</div>
                </div>
              </div>
            </section>
          </CardContainer>
        </div>
      </div>
    </Header>
  );
};

export default CoursePanel;
