import { Dispatch } from 'redux';
import { CourseServiceInstance } from 'src/services/courses';
import { LessonServiceInstance } from 'src/services/goswim/lesson';
import { GetCourseServicesRequest, GET_COURSE_SERVICES_REQUEST, GetCourseServicesSuccess, GET_COURSE_SERVICES_SUCCESS, GetCourseServicesFailure, GET_COURSE_SERVICES_FAILURE, GetFilterDataServicesFailure, GetFilterDataServicesRequest, GetFilterDataServicesSuccess, GET_FILTER_DATA_FAILURE, GET_FILTER_DATA_REQUEST, GET_FILTER_DATA_SUCCESS, CourseListReq } from 'src/store/management/courses';
import { GetCourseDetailServiceRequest, GET_COURSE_DETAIL_SERVICE_REQUEST, GetCourseDetailServiceSuccess, GET_COURSE_DETAIL_SERVICE_SUCCESS, GetCourseDetailServiceFailure, GET_COURSE_DETAIL_SERVICE_FAILURE } from 'src/store/management/goswim/lessons';


export const apiGetCourses = async (dispatch: Dispatch, courseReq: CourseListReq) => {
  try {
    dispatch<GetCourseServicesRequest>({ type: GET_COURSE_SERVICES_REQUEST });
    const response = await CourseServiceInstance.getCourses(courseReq);
    const payload = response.data;
    payload.pageNumber = courseReq.pageID;
    return dispatch<GetCourseServicesSuccess>({
      type: GET_COURSE_SERVICES_SUCCESS,
      payload: payload
    });
  } catch (error: any) {
    dispatch<GetCourseServicesFailure>({ type: GET_COURSE_SERVICES_FAILURE, error });
  }
}

export const apiGetCourseFilterData = async (dispatch: Dispatch, tagType: string) => {
  try {
    dispatch<GetFilterDataServicesRequest>({ type: GET_FILTER_DATA_REQUEST });
    const response = await CourseServiceInstance.getFilterData(tagType);
    console.log(response);
    
    dispatch<GetFilterDataServicesSuccess>({
      type: GET_FILTER_DATA_SUCCESS,
      payload: response.data
    });
  } catch (error: any) {
    console.log(error);
    
  //  dispatch<GetFilterDataServicesFailure>({ type: GET_FILTER_DATA_FAILURE, error });
  }
}

export const apiGetCourseDetail = async (dispatch: Dispatch, course_id: string | string[]) => {
  try {
    dispatch<GetCourseDetailServiceRequest>({ type: GET_COURSE_DETAIL_SERVICE_REQUEST });
    const response = await LessonServiceInstance.getCourseDetails(course_id);
    dispatch<GetCourseDetailServiceSuccess>({
      type: GET_COURSE_DETAIL_SERVICE_SUCCESS,
      payload: response.data
    });
  } catch (error: any) {
    dispatch<GetCourseDetailServiceFailure>({ type: GET_COURSE_DETAIL_SERVICE_FAILURE, error });
  }
}
