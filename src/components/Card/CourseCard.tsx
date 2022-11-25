import React from 'react';
import moment from 'jalali-moment';
import { ICourse } from '../../features/Courses/types/courses';
import CardContainer from './CardContainer';
import {
  CodeBracketIcon,
  UsersIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import { numberWithCommas } from '../../utils';
import { Link } from 'react-router-dom';

export interface CourseCardProps extends ICourse {}

const CourseCard: React.FunctionComponent<CourseCardProps> = (props) => {
  return (
    <CardContainer>
      <header className="flex items-center justify-center min-h-[200px]">
        <CodeBracketIcon strokeWidth={1} width={'128px'} />
      </header>
      <section className="card-content p-2">
        <h2 dir="auto" className="font-bold ">
          {props.title}
        </h2>
        <p dir="auto" className="">
          {props.lesson.description}
        </p>
        <div
          dir="ltr"
          className="flex justify-between items-center font-light sm:text-sm text-gray-600 gap-2 mt-2"
        >
          <div className="flex items-center gap-2">
            <div>
              <UsersIcon height={'1.5rem'} />
            </div>
            <div className="persian-digits">
              <span className="text-base text-black font-normal">
                {props.students.length}
              </span>
              {`/${props.capacity}`}
            </div>
          </div>
          <div dir="rtl" className="flex items-center gap-2">
            <div>
              <BanknotesIcon height={'1.5rem'} />
            </div>
            <div className="persian-digits">
              {`${numberWithCommas(props.cost)} تومان`}
            </div>
          </div>
        </div>
      </section>
      <footer className="my-2 px-2">
        <button
          className="flex justify-center items-center bg-indigo-500 cursor-default text-white px-2 py-1.5 rounded-md shadow-md w-full disabled:bg-gray-300"
          onClick={() => {}}
          disabled={
            props.students.length >= props.capacity ||
            moment
              .from(props.startDate, 'fa')
              .isBefore(moment(), 'milliseconds')
          }
        >
          {props.students.length >= props.capacity
            ? 'ظرفیت تکمیل است!'
            : moment
                .from(props.startDate, 'fa')
                .isBefore(moment(), 'milliseconds')
            ? 'پایان مهلت نام‌نویسی'
            : 'نام‌نویسی'}
        </button>
        <Link
          className="mt-1 block text-center w-full text-indigo-600 px-2 py-1.5 rounded-md hover:bg-indigo-200/20 w-full"
          to={`/courses/${props._id}`}
        >
          بیشتر...
        </Link>
      </footer>
    </CardContainer>
  );
};

export interface CourseCardSkeletonProps {
  count: number;
}

const CourseCardSkeleton: React.FC<CourseCardSkeletonProps> = ({ count }) => {
  const content = [...Array(count)].map((_, i) => (
    <div className="animate-pulse" key={i}>
      <CardContainer>
        <div className="h-[200px] bg-gray-300 rounded"></div>
        <section className="card-content p-2">
          <div className="h-3 mb-2 bg-gray-300 rounded"></div>

          <div className="h-2 mb-1 bg-gray-300 rounded"></div>
          <div className="h-2 mb-1 bg-gray-300 rounded"></div>
          <div className="h-2 mb-1 w-[50%] bg-gray-300 rounded"></div>
        </section>
        <footer className="p-2">
          <div className="h-[40px] bg-gray-300 rounded"></div>
        </footer>
      </CardContainer>
    </div>
  ));
  return <>{content}</>;
};

export { CourseCardSkeleton };

export default CourseCard;
