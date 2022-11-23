import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PaginationBar from '../components/paginationBar';
import coursesAction from '../features/Courses/store/coursesAction';
import { searchCourse, setSearchClue } from '../features/Courses/store/coursesSlice';
import { useAppDispatch, useAppSelector } from '../store';

interface IOption{value:'ALL'|number, label: string}

export interface HomePageProps {}

const PageSizeSelectOptions: IOption[] = [
  {value:1,label:'1'},
  {value:2,label:'2'},
  {value:3,label:'3'},
  {value:4,label:'4'},
  {value:5,label:'5'},
  {value:6,label:'6'},
  {value:7,label:'7'},
  {value:8,label:'8'},
  {value:9,label:'9'},
  {value:'ALL',label:'ALL'},
]

const HomePage: React.FunctionComponent<HomePageProps> = () => {
  
  const dispatch = useAppDispatch();
  const courses = useAppSelector(state=>state.courses);
  const [pageSize, setPageSize] = useState <number | 'ALL'>('ALL');
  const pageNumber = useParams().pageNumber || 1;
  const navigate = useNavigate()
  useEffect(()=>{
    
    dispatch(coursesAction.getCourses({pageSize,pageNumber:+pageNumber}));
    if (pageNumber > courses.paginationPagesCount) {
      navigate('/1');
    }
    
  },[pageSize, pageNumber]);  




  return (
    <>
     <form className='flex gap-2' onSubmit={(e)=>{
      e.preventDefault()
      dispatch(coursesAction.searchAllCourses())
      
     }} >
      <div><input  value={courses.searchClue} onChange={(e)=>{dispatch(setSearchClue(e.target.value))}} className='bg-slate-300 p-2 rounded-md ring-4 outline-none ring-blue-200' id='courseSearchInput' type="text" />
      <button className='bg-slate-200 p-2 rounded-md hover:bg-slate-100' type='submit' >search</button></div>
      <div>
        <select className='p-2' value={pageSize} onChange={(e)=>{ 
          const value = e.target.value ;
          if (isNaN(+value) && value !== 'ALL') {
            throw new Error('unvalued type in select options.')
          } else{ setPageSize(value === 'ALL' ? value : +value);}
          
           }} >{PageSizeSelectOptions.map(option=>{ return<option key={option.value} value={option.value} >{option.label}</option>})} </select>
        
      </div>
     </form>
      <div className='grid grid-cols-12 gap-2' >
{courses?.coursesList?.map(course=>{
  return <Link className='col-span-12 md:col-span-6'  state={course} to={`/courses/${course._id}`} key={course._id} > <article className='row-span-5 p-4 bg-slate-500' >{course.title}</article> </Link>
})}
      </div>

      <PaginationBar/>
    </>
  );
}

export default HomePage;