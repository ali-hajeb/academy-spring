  import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ICourse } from '../types/courses';
import courseRequest from '../services/courseService';
import { useAppSelector } from '../../../store';


interface IInitialState{
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: { message:string} | undefined;
  payload?:ICourse |undefined;
}



export const useFetchCourseById = (id:string)=>{

  const initialState:IInitialState = {
    status: 'idle',
    error:undefined,
    payload:undefined
  };
 const [course, setCourse] = useState<IInitialState>({...initialState});
 const user = useAppSelector(state=>state.user);
  useEffect(()=>{ 
    setCourse({...course, status: 'loading'});
    courseRequest.getCoursesById(id).then((res)=>{
      const data = JSON.parse(res.data);
      console.log(data);
      setCourse({ status:'succeeded', payload:data.result })
      
    }).catch(error=>{
      setCourse({status:'failed', error:{message:error.message}})
    })
  },[]);

  const likeCourse = async()=>{
    try {
      const res = await courseRequest.likeCourse(id,user._id)
      console.log(JSON.parse(res.data),'try');
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
  const disLikeCourse = async()=>{
    try{
      console.log(id, user._id);
      
    const res = await courseRequest.disLikeCourse(id,user._id);
    console.log(JSON.parse(res.data),'try');
    
  } catch (error) {
    console.log(error);
    
  }
  }
  const addStudentToCourse = ()=>{

  }
  return {course, likeCourse, disLikeCourse, addStudentToCourse}

}

