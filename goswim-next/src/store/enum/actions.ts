import { Dispatch } from 'redux';
import {
  GetEnumsRequest,
  GET_ENUMS_REQUEST,
  GetEnumsSuccess,
  GET_ENUMS_SUCCESS,
  GetEnumsFailure,
  GET_ENUMS_FAILURE,
  DELETE_ENUMS_REQUEST,
  DeleteEnumsRequest,
  DeleteEnumsSuccess,
  DELETE_ENUMS_SUCCESS,
  DeleteEnumsFailure,
  DELETE_ENUMS_FAILURE,
  CreateOrUpdateEnumsRequest,
  CreateOrUpdateEnumsSuccess,
  CreateOrUpdateEnumsFailure,
  CREATE_OR_UPDATE_REQUEST,
  CREATE_OR_UPDATE_FAILURE,
  CREATE_OR_UPDATE_SUCCESS,
  Enum
} from 'src/store/enum/types';
import { enumService } from 'src/services/enum';

export const createOrUpdateEnum = (attendance: Enum) => async (dispatch: Dispatch) => {
  try {
    dispatch<CreateOrUpdateEnumsRequest>({
      type: CREATE_OR_UPDATE_REQUEST
    });

    const response = await enumService.createOrUpdateEnum(attendance);

    dispatch<CreateOrUpdateEnumsSuccess>({
      type: CREATE_OR_UPDATE_SUCCESS,
      payload: response
    });
  } catch (error) {
    dispatch<CreateOrUpdateEnumsFailure>({
      type: CREATE_OR_UPDATE_FAILURE,
      error
    });
  }
};

export const getEnum = () => async (dispatch: Dispatch) => {
  try {
    dispatch<GetEnumsRequest>({
      type: GET_ENUMS_REQUEST
    });

    const response = await enumService.getEnum();

    dispatch<GetEnumsSuccess>({
      type: GET_ENUMS_SUCCESS,
      payload: response
    });
  } catch (error) {
    dispatch<GetEnumsFailure>({
      type: GET_ENUMS_FAILURE,
      error
    });
  }
};

export const deleteEnum = (enumId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch<DeleteEnumsRequest>({
      type: DELETE_ENUMS_REQUEST
    });

    const response = await enumService.deleteEnum(enumId);

    dispatch<DeleteEnumsSuccess>({
      type: DELETE_ENUMS_SUCCESS,
      payload: response
    });
  } catch (error) {
    dispatch<DeleteEnumsFailure>({
      type: DELETE_ENUMS_FAILURE,
      error
    });
  }
};
