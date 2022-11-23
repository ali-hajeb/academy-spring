import { Axios } from 'axios';
import { useMemo} from 'react';


const coursesAxios = new Axios({baseURL:`${process.env.REACT_APP_API_URL}`});



const courseRequest = {
getAllCourses(){
  return coursesAxios.get(`/api/course/getall`);
},
getCoursesForPagination(pageNumber:Number,pageSize:Number){
return coursesAxios.get(`/api/course/list?pagenumber=${pageNumber}&pagesize=${pageSize}`)
},
getCoursesById(courseId:string){
return coursesAxios.get(`/api/course/${courseId}`)
},
addStudentToCourse(userId:string, courseId:string){
  return coursesAxios.post(`/api/course/addStudentToCourse/${userId}`,{courseId})
},
likeCourse(courseId:string, userId:string){
  return coursesAxios.post(`/api/course/like`,{courseId,userId})
},
disLikeCourse(courseId:string, userId:string){
  return coursesAxios.post(`/api/course/dislike`,{courseId,userId})
}
}

export default courseRequest;