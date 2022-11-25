import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { NavLink } from 'react-router-dom';

export interface PaginationBarProps {}

const PaginationBar: React.FunctionComponent<PaginationBarProps> = (props) => {
  const { paginationPagesCount, coursesList, rawCoursesList } = useAppSelector(
    (state) => state.courses
  );
  const currentPageNumber = useParams().pageNumber || 1;

  const isSearchActive = coursesList.length !== rawCoursesList.length;
  const isPaginationAvailable = paginationPagesCount > 1 && !isSearchActive;

  const paginationNavLinks = [];

  for (let index = 1; index <= paginationPagesCount; index++) {
    const newNavLinkObject = {
      number: index,
      className: (navData: any) =>
        navData.isActive
          ? ' bg-indigo-700 rounded-md text-indigo-200 rounded-full'
          : ' text-indigo-700  rounded-full',
    };

    paginationNavLinks.push(newNavLinkObject);
  }
  return (
    <nav className=" p-2 flex bg-indigo-200  justify-evenly items-center">
      {isPaginationAvailable &&
        paginationNavLinks.map((linkData) => {
          return (
            <NavLink
              key={linkData.number}
              className={linkData.className}
              to={`/${linkData.number}`}
            >
              <div className="p-2 text-xl rounded-full">{linkData.number}</div>
            </NavLink>
          );
        })}
    </nav>
  );
};

export default PaginationBar;
