import { String } from 'lodash';
import { Dispatch } from 'redux';
import { getLessonArgs } from 'src/constants';
import { LessonServiceInstance as LessonDataServiceInstance } from 'src/services/goswim/lesson';
import { LessonServiceInstance } from 'src/services/lesson';
import { GetLessonListServiceFailure, GetLessonListServiceRequest, GetLessonListServiceSuccess, GetLessonWeeklyThemeServiceSuccess, GET_LESSON_LIST_SERVICE_FAILURE, GET_LESSON_LIST_SERVICE_REQUEST, GET_LESSON_LIST_SERVICE_SUCCESS, GET_LESSON_WEEKLYTHEME_SERVICE_SUCCESS, RemoveALlLessons, REMOVE_ALL_LESSON_LIST } from 'src/store/management/goswim/lessons';
import { GetLessonFilterDataServicesFailure, GetLessonFilterDataServicesRequest, GetLessonFilterDataServicesSuccess, GET_LESSON_FILTER_DATA_FAILURE, GET_LESSON_FILTER_DATA_REQUEST, GET_LESSON_FILTER_DATA_SUCCESS } from 'src/store/management/lessons';



export const apiGetLessons = async (dispatch: Dispatch, lessonReqArgs: getLessonArgs) => {
    try {

        dispatch<GetLessonListServiceRequest>({ type: GET_LESSON_LIST_SERVICE_REQUEST });
        const response = await LessonDataServiceInstance.getLessons(lessonReqArgs);
        const payload = response.data;

        if (lessonReqArgs.pageID == 1) {
            dispatch<RemoveALlLessons>({ type: REMOVE_ALL_LESSON_LIST });
        }

        if (lessonReqArgs.isBasic) {
            dispatch<GetLessonWeeklyThemeServiceSuccess>({
                type: GET_LESSON_WEEKLYTHEME_SERVICE_SUCCESS,
                payload: payload
            });
        } else {
            dispatch<GetLessonListServiceSuccess>({
                type: GET_LESSON_LIST_SERVICE_SUCCESS,
                payload: payload
            });
        }

    } catch (error: any) {
        dispatch<GetLessonListServiceFailure>({ type: GET_LESSON_LIST_SERVICE_FAILURE, error });
    }
}

export const apiGetLessonsFilterData = async (dispatch: Dispatch, tagType: string) => {
    try {
        dispatch<GetLessonFilterDataServicesRequest>({ type: GET_LESSON_FILTER_DATA_REQUEST });
        const response = await LessonServiceInstance.getFilterData(tagType);
        if (response?.data) {
            dispatch<GetLessonFilterDataServicesSuccess>({
                type: GET_LESSON_FILTER_DATA_SUCCESS,
                payload: response?.data
            });
        }
    } catch (error: any) {
        dispatch<GetLessonFilterDataServicesFailure>({ type: GET_LESSON_FILTER_DATA_FAILURE, error });
    }
}
