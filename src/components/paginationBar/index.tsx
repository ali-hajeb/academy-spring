import React from 'react';
import  {useParams } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { NavLink } from 'react-router-dom';

export interface PaginationBarProps {

}

const PaginationBar: React.FunctionComponent<PaginationBarProps> = (props) => {
const {paginationPagesCount, coursesList, rawCoursesList} =  useAppSelector(state=>state.courses);
const currentPageNumber = useParams().pageNumber || 1;

const isSearchActive = coursesList.length !== rawCoursesList.length;
const isPaginationAvailable = paginationPagesCount > 1 && !isSearchActive;


const paginationNavLinks = [];

for (let index = 1; index <= paginationPagesCount; index++) {
 const newNavLinkObject ={
  number: index,
  className:(navData:any) =>
    navData.isActive
      ? 'md:mb-4 bg-slate-500 rounded-md text-slate-200 '
      : 'md:mb-4 text-black ',
 };



 paginationNavLinks.push(newNavLinkObject)
  
}
return <nav className='flex p-2 bg-slate-200 rounded justify-evenly' >
{ isPaginationAvailable && paginationNavLinks.map((linkData)=>{
  return <NavLink key={linkData.number} className={linkData.className} to={`/${linkData.number}`}><span className='p-2 rounded-full' >{linkData.number}</span></NavLink>
})}

</nav>;



};

export default PaginationBar;