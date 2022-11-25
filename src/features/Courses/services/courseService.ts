import axios, { Axios } from 'axios';
import authForCourseRequests from './authForCourseRequests';

const coursesAxios = new Axios({ baseURL: `${process.env.REACT_APP_API_URL}` });

const courseRequest = {
  getAllCourses() {
    return coursesAxios.get(`/api/course/getall`);
  },
  getCoursesForPagination(pageNumber: Number, pageSize: Number) {
    return coursesAxios.get(
      `/api/course/list?pagenumber=${pageNumber}&pagesize=${pageSize}`
    );
  },
  getCoursesById(courseId: string) {
    return coursesAxios.get(`/api/course/${courseId}`);
  },
  addStudentToCourse(courseId: string) {
    const auth = authForCourseRequests();
    return axios.post(
      `http://querateam1.herokuapp.com/api/course/addStudentToCourse/${auth.userId}`,
      {
        courseId: courseId,
      },
      {
        headers: {
          'x-auth-token': auth['x-auth-token'],
          'Content-Type': 'application/json',
        },
      }
    );
  },

  likeCourse(courseId: string) {
    const { userId } = authForCourseRequests();
    return axios.post('http://querateam1.herokuapp.com/api/course/like', {
      courseId: courseId,
      userId: userId,
    });
  },
  disLikeCourse(courseId: string) {
    const { userId } = authForCourseRequests();
    return axios.post('http://querateam1.herokuapp.com/api/course/dislike', {
      courseId: courseId,
      userId: userId,
    });
  },

  countLike(courseId: string) {
    const { userId } = authForCourseRequests();

    return axios.get(
      `http://querateam1.herokuapp.com/api/course/likeCount/${courseId}`,
      {
        data: {
          termId: courseId,
          userId: userId,
          like: true,
        },
      }
    );
  },
};

export default courseRequest;
