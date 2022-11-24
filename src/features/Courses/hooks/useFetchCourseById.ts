import { useEffect, useState } from 'react';
import { ICourse } from '../types/courses';
import courseRequest from '../services/courseService';
import { useAppSelector } from '../../../store';


interface IInitialState{
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: { message:string} | undefined;
  payload?:ICourse |undefined;
  isLiked: boolean,
  count: {like:number, disLike:number},
  isStudentEnrolled: boolean
}



export const useFetchCourseById = (id:string)=>{

  const initialState:IInitialState = {
    status: 'idle',
    error:undefined,
    payload:undefined,
    isLiked:false,
    count:{like:0, disLike:0},
    isStudentEnrolled: false
  };
 const [course, setCourse] = useState<IInitialState>({...initialState});
 const user = useAppSelector(state=>state.user);
  useEffect(()=>{ 
    setCourse({...course, status: 'loading'});
    courseRequest.getCoursesById(id).then((res)=>{
      const data = JSON.parse(res.data);
      const isStudentEnrolled =  data.result.students.find((student:any)=>{
        return student.id === user._id;
      });
      console.log(isStudentEnrolled);
      
      setCourse({ ...course, status:'succeeded', payload:data.result, isStudentEnrolled })
      
    }).catch(error=>{
      setCourse({...course,status:'failed', error:{message:error.message}})
    })
  },[]);

  const likeCourse = async()=>{
    try {
      setCourse({...course, isLiked:true})
      const res = await courseRequest.likeCourse(id);
      console.log('try', res);
      
     if (!res.data.success && res.data.message[0].message !== "شما قبلا این دوره را لایک کردید") {
      setCourse({...course, isLiked: false})
    }
    } catch (error) {
      console.log(error);
      
    }
    try {
      const countRes =await courseRequest.countLike(id);
  
  if (countRes.data.success) {
    setCourse({...course, count: countRes.data.result})
  }
} catch (error) {
  console.log(error);
}
    
  }
  const disLikeCourse = async()=>{
    try{
      console.log(id, user._id);
      setCourse({...course, isLiked:false})
    const res = await courseRequest.disLikeCourse(id);

    if (!res.data.success && res.data.message[0].message !== "شما قبلا این دوره را دیسلایک کردید") {
      setCourse({...course, isLiked: true})
    }
    console.log(res,'try');
    
  } catch (error) {
    console.log(error);
    
  }
  try {
        const countRes =await courseRequest.countLike(id);
    
    if (countRes.data.success) {
      setCourse({...course, count: countRes.data.result})
    }
  } catch (error) {
    console.log(error);
  }
  }
  const addStudentToCourse = async()=>{
const res = await courseRequest.addStudentToCourse(id);
console.log(res);

if (res.data.success) {
  setCourse({...course, isStudentEnrolled:true})
}

  };

  const countLikes = async()=>{
    const countRes =await courseRequest.countLike(id);
    if (countRes.data.success) {
      setCourse({...course, count: countRes.data.result})
    }
  }

  return {course, likeCourse, disLikeCourse, addStudentToCourse, countLikes}

}

