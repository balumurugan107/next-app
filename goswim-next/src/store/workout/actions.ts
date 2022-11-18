import { Dispatch } from 'redux';
import {
  GetWorkoutsRequest,
  GET_WORKOUTS_REQUEST,
  GetWorkoutsSuccess,
  GET_WORKOUTS_SUCCESS,
  GetWorkoutsFailure,
  GET_WORKOUTS_FAILURE,
  AttendanceData,
  MarkAttendanceRequest,
  MarkAttendanceSuccess,
  MarkAttendanceFailure,
  MARK_ATTENDANCE_REQUEST,
  MARK_ATTENDANCE_SUCCESS,
  MARK_ATTENDANCE_FAILURE,
  CreateWorkoutRequest,
  CreateWorkoutFailure,
  CreateWorkoutSuccess,
  CREATE_WORKOUT_REQUEST,
  CREATE_WORKOUT_SUCCESS,
  CREATE_WORKOUT_FAILURE,
  DELETE_WORKOUT_REQUEST,
  DELETE_WORKOUT_FAILURE,
  DELETE_WORKOUT_SUCCESS,
  DeleteWorkoutRequest,
  DeleteWorkoutSuccess,
  DeleteWorkoutFailure,
  UpdateWorkoutFailure,
  UpdateWorkoutRequest,
  UpdateWorkoutSuccess,
  UPDATE_WORKOUT_FAILURE,
  UPDATE_WORKOUT_REQUEST,
  UPDATE_WORKOUT_SUCCESS,
  GetSwimmersRequest,
  GET_SWIMMERS_REQUEST,
  SwimmerParams,
  GetSwimmersSuccess,
  GET_SWIMMERS_SUCCESS,
  GET_SWIMMERS_FAILURE,
  GetSwimmersFailure
} from 'src/store/workout/types';
import { workoutService } from 'src/services/workout';

export const createWorkout = <T>(request: T) => async (dispatch: Dispatch) => {
  try {
    dispatch<CreateWorkoutRequest<T>>({
      type: CREATE_WORKOUT_REQUEST,
      payload: request
    });

    const payload = await workoutService.createWorkout<T>(request);

    dispatch<CreateWorkoutSuccess>({
      type: CREATE_WORKOUT_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<CreateWorkoutFailure>({
      type: CREATE_WORKOUT_FAILURE,
      error: error
    });
  }
};

export const updateWorkout = <T>(request: T, workout_id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch<UpdateWorkoutRequest>({
      type: UPDATE_WORKOUT_REQUEST,
      payload: request
    });

    const payload = await workoutService.updateWorkout<T>(request, workout_id);

    dispatch<UpdateWorkoutSuccess>({
      type: UPDATE_WORKOUT_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<UpdateWorkoutFailure>({
      type: UPDATE_WORKOUT_FAILURE,
      error
    });
  }
};

export const getWorkouts = (type: string) => async (dispatch: Dispatch) => {
  try {
    dispatch<GetWorkoutsRequest>({
      type: GET_WORKOUTS_REQUEST
    });

    const payload = await workoutService.getCoachWorkout(type);

    dispatch<GetWorkoutsSuccess>({
      type: GET_WORKOUTS_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<GetWorkoutsFailure>({
      type: GET_WORKOUTS_FAILURE,
      error
    });
  }
};

export const deleteWorkout = (_id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch<DeleteWorkoutRequest>({
      type: DELETE_WORKOUT_REQUEST
    });

    await workoutService.deleteWorkout(_id);

    dispatch<DeleteWorkoutSuccess>({
      type: DELETE_WORKOUT_SUCCESS
    });
  } catch (error) {
    dispatch<DeleteWorkoutFailure>({
      type: DELETE_WORKOUT_FAILURE,
      error
    });
  }
};

export const markAttendance = (attendance: AttendanceData) => async (dispatch: Dispatch) => {
  try {
    dispatch<MarkAttendanceRequest>({
      type: MARK_ATTENDANCE_REQUEST
    });

    await workoutService.markAttendance(attendance);

    dispatch<MarkAttendanceSuccess>({
      type: MARK_ATTENDANCE_SUCCESS
    });
  } catch (error) {
    dispatch<MarkAttendanceFailure>({
      type: MARK_ATTENDANCE_FAILURE,
      error
    });
  }
};

export const getSwimmers = (params: SwimmerParams) => async (dispatch: Dispatch) => {
  try {
    dispatch<GetSwimmersRequest>({
      type: GET_SWIMMERS_REQUEST
    });

    const payload = await workoutService.getSwimmers(params);

    dispatch<GetSwimmersSuccess>({
      type: GET_SWIMMERS_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<GetSwimmersFailure>({
      type: GET_SWIMMERS_FAILURE,
      error
    });
  }
};
