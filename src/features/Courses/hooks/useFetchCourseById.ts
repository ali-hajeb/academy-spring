import { useEffect, useState } from 'react';
import { ICourse } from '../types/courses';
import courseRequest from '../services/courseService';
import IUser from '../../UserAuthentication/types/user';
import { useAppDispatch } from '../../../store';
import { logout } from '../../UserAuthentication';
import { useNavigate } from 'react-router-dom';

interface IInitialState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: { message: string } | undefined;
  payload: ICourse;
  isLiked: boolean;
  count: number;
  isStudentEnrolled: boolean;
}

export const useFetchCourseById = (id: string) => {
  const initialState: IInitialState = {
    status: 'idle',
    error: undefined,
    payload: {} as ICourse,
    isLiked: false,
    count: 0,
    isStudentEnrolled: false,
  };
  const [course, setCourse] = useState<IInitialState>({ ...initialState });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //  const user = useAppSelector(state=>state.user);
  useEffect(() => {
    const getCourseData = async () => {
      try {
        const res = await courseRequest.getCoursesById(id);
        const data = JSON.parse(res.data);
        const isStudentEnrolled = data.result.students.find((student: any) => {
          const user = JSON.parse(
            localStorage.getItem('user_data') ?? '{}'
          ) as IUser;
          return student._id === user?._id;
        });

        try {
          const res = await courseRequest.likeCourse(id);
          const countRes = await courseRequest.countLike(id);
          const { like, dislike } = countRes.data.result;
          if (
            res.data.message[0].message === 'شما قبلا این دوره را لایک کردید'
          ) {
            try {
              if (countRes.data.success) {
                setCourse({
                  ...course,
                  count: +like - +dislike,
                  status: 'succeeded',
                  payload: data.result,
                  isStudentEnrolled: !!isStudentEnrolled,
                  isLiked: true,
                });
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              const res = await courseRequest.disLikeCourse(id);

              if (
                res.data.message[0].message !==
                'شما قبلا این دوره را دیسلایک کردید'
              ) {
                try {
                  if (countRes.data.success) {
                    setCourse({
                      ...course,
                      count: +like - +dislike,
                      status: 'succeeded',
                      payload: data.result,
                      isStudentEnrolled: !!isStudentEnrolled,
                      isLiked: false,
                    });
                  }
                } catch (error) {
                  console.log(error);
                }
              }
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }
      } catch (error: any) {
        setCourse({
          ...course,
          status: 'failed',
          error: { message: error.message },
        });
      }
    };
    getCourseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const likeCourse = async () => {
    setCourse({ ...course, isLiked: true, count: course.count + 1 });
    try {
      const res = await courseRequest.likeCourse(id);
      if (!res.data.success) {
        setCourse({ ...course, isLiked: false });
      }
    } catch (error) {
      console.log(error);
      setCourse({ ...course, isLiked: false, count: course.count - 1 });
    }
  };
  const disLikeCourse = async () => {
    setCourse({ ...course, isLiked: false, count: course.count - 1 });
    try {
      const res = await courseRequest.disLikeCourse(id);

      if (!res.data.success) {
        setCourse({ ...course, isLiked: true });
      }
    } catch (error) {
      console.log(error);
      setCourse({ ...course, isLiked: true, count: course.count + 1 });
    }
  };

  const toggleLike = async () => {
    course.isLiked ? await disLikeCourse() : await likeCourse();
  };

  const addStudentToCourse = async () => {
    try {
      const res = await courseRequest.addStudentToCourse(id);

      if (res.data.success) {
        setCourse({ ...course, isStudentEnrolled: true });
      }
    } catch (error: any) {
      if (
        error?.response?.data?.message === 'آیدی نا معتبر، دوباره امتحان کنید'
      ) {
        dispatch(logout());
        navigate('/login', {
          state: { from: `/courses/${id}` },
        });
      }
    }
  };

  return { course, toggleLike, addStudentToCourse };
};
