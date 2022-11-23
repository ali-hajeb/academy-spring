import { log } from 'console';
import React from 'react';
import { Link } from 'react-router-dom';
import coursesAction from '../features/Courses/store/coursesAction';
import { useAppDispatch, useAppSelector } from '../store';
export interface HomePageProps {
  
}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
  
  const [modal, setModal] = React.useState(false);

  const dispatch = useAppDispatch();
  const courses = useAppSelector(state=>state.courses)
 React.useEffect(()=>{dispatch(coursesAction.getAllCourses())},[dispatch])
const handleContact = () => {
  setModal((p) => !p); 
}

  return (
    <>
    {modal &&  
      
      <div className=' w-full h-full fixed flex flex-row justify-center items-center'>

<div className="bg-gray-100 flex flex-col w-1/2 h-2/3 rounded-md justify-center items-center shadow-2xl">

<div className="fixed w-1/3 bg-white border-2 border-blue-600 rounded-md ">
  <button onClick={handleContact} className="absolute top-0 bg-red-700 text-white px-3 h-full">X</button>
  <div className='m-4 flex flex-col mx-auto justify-center'>
  <textarea defaultValue="انتقادات و پیشنهادات خود را بنویسید ... " className=" rounded-md w-3/4 p-3 mx-auto my-4 h-36 border-2 focus:outline-blue-600"/>
  <button className="bg-blue-800 p-3 rounded-md text-white w-16 mx-auto">ارسال</button>
  </div>
</div>

      
      </div>



      </div>
      }

  
      <div className="bg-white m-3 p-4 rounded-sm">
          <div className="flex flex-row w-full justify-between ">
            <Link to={`/login`} className="bg-blue-800 p-4 text-lg rounded-md text-white px-6">ورود</Link>
            <button className="bg-green-800 p-4 text-lg rounded-md text-white px-6" onClick={handleContact}>تماس</button>
           
          </div>
          
          <div className=" rounded-lg w-4/5 h-96 mx-auto flex flex-row justify-center items-center shadow-lg text-white m-3" 
          style={{backgroundImage: "linear-gradient(33deg, rgb(60, 4, 4) 0%, rgb(105, 4, 152) 100%)"}}>
            <h1 className="text-3xl">مسیر توسعه وب رو با ما طی کنید 💪🏼😄</h1>
          </div>
          
          
          <div className="rounded-md w-4/5 bg-gray-100 mt-10 mx-auto flex flex-col">
          {/* <div className="mx-auto p-4 ">
              <input type="text" placeholder="Search ... " className=" rounded-md outline-none w-full p-2"/>
          </div> */}
          <div className="mx-auto mt-10 w-4/5 grid grid-cols-4 gap-3">

          {
            courses.coursesList?.map(c => {
              return (
                <>
                <Link state={c} to={`/courses/${c._id}`} key={c._id} >
                  <div className='flex flex-col border-blue-600 border-2 rounded-md m-2 hover:shadow-2xl'>
                  <div className="mb-2 bg-no-repeat bg-cover w-full h-48 bg-center shadow-lg"
                      style={{ backgroundImage: `url(/lesson.jpg)` }}
                    ></div>
                    
                      <h1 className='flex flex-row-reverse px-1 my-1 '>{c.title}</h1>
                     <div className=' px-1 my-1 flex flex-row-reverse items-center'>
                      <div
                        className="bg-no-repeat bg-cover w-6 h-6 bg-center rounded-xl shadow-lg"
                        style={{ backgroundImage: `url(/ostad.jfif)` }}
                      ></div>
                       <h1 className='flex flex-row-reverse ml-1'>{c.teacher.fullName}</h1>
                     </div>
                    <div className=' px-1 my-1 flex flex-row-reverse text-sm items-end '>
                      <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth="1.5" 
                      stroke="currentColor"
                      className='w-6 h-6'>
                            <path 
                            strokeLinecap="round"
                            strokeLinejoin="round" 
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                          </svg>


                        <h1 className='text-sm ml-1'>{new Date(c.startDate).toLocaleDateString()}</h1>
                        <h1 className='ml-3 text-sm'>{new Date(c.endDate).toLocaleDateString()}</h1>
                     </div>
                     <div className=' px-1 my-1 flex flex-row-reverse items-center justify-between'>
                        <div className='flex flex-row-reverse items-center'> 
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mb-1">
                               <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                              </svg>
                              <h1 style={{direction:"ltr"}} className="text-sm ml-1">{c.capacity - c.students.length} person available</h1>
                         
                        </div>
                        <div className='text-sm'>{c.cost}$</div>
                    </div>
                  </div>
                  </Link>
                </>
              )
            })
          }
          </div>
          </div>
        
       
        
        
        </div>
        <div className="bg-black text-white p-3 w-full" style={{direction:"ltr"}}>
            <h1>made with love ❤️</h1>
          </div>
    </>
  );
}

export default HomePage;

// linear-gradient(45deg, rgba(55,5,65,1) 0%, RGBA(69, 44, 187, 1) 46%, rgba(54,78,106,1) 100%)