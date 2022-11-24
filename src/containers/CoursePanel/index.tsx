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
} from '@heroicons/react/24/outline';
import { numberWithCommas } from '../../utils';

export interface CoursePanelProps extends ICourse {}

const CoursePanel: React.FunctionComponent<CoursePanelProps> = (props) => {
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
                {props.title}
              </h2>
              <button
                type="button"
                className="flex justify-center items-center my-2 bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1.5 rounded-md shadow-md w-full disabled:bg-gray-300"
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
              <div className="text-gray-500 mt-2">
                <div dir="rtl" className="flex items-center gap-2">
                  <div>
                    <CalendarDaysIcon height={'1.5rem'} />
                  </div>
                  {/* <div>بازه ثبت نام</div> */}
                  <div className="persian-digits">
                    {`${moment(props.endDate).format('YYYY/MM/DD')} تا ${moment(
                      props.startDate
                    ).format('YYYY/MM/DD')}`}
                  </div>
                </div>
                <div dir="rtl" className="flex items-center gap-2">
                  <div>
                    <UsersIcon height={'1.5rem'} />
                  </div>
                  {/* <div>ظرفیت باقی‌مانده:</div> */}
                  <div className="persian-digits">
                    {`${props.capacity - props.students.length} نفر باقی‌مانده`}
                  </div>
                </div>
                <div dir="rtl" className="flex items-center gap-2">
                  <div>
                    <BanknotesIcon height={'1.5rem'} />
                  </div>
                  {/* <div>قیمت: </div> */}
                  <div className="persian-digits">
                    {`${numberWithCommas(props.cost)} تومان`}
                  </div>
                </div>
              </div>
            </section>
          </CardContainer>
        </div>
        <div className="col-span-2">
          <CardContainer>
            <section className="card-content p-2 md:min-h-[376px]">
              <h2 dir="auto" className="font-bold text-lg">
                {props.lesson.lessonName}
              </h2>
              <p dir="auto" className="mb-5">
                {props.lesson.description}
              </p>
              <h2 dir="auto" className="font-bold ">
                Topics
              </h2>
              <div className="flex items-center gap-2 mb-5">
                {props.lesson.topics.map((t, i) => (
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
                  <div className="font-bold">{props.teacher.fullName}</div>
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
