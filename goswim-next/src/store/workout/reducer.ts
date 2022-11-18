import produce from 'immer';
import { v4 } from 'uuid';
import {
  WorkoutState,
  WorkoutActionTypes,
  GET_WORKOUTS_REQUEST,
  GET_WORKOUTS_SUCCESS,
  GET_WORKOUTS_FAILURE,
  CREATE_WORKOUT_REQUEST,
  CREATE_WORKOUT_SUCCESS,
  CREATE_WORKOUT_FAILURE,
  DELETE_WORKOUT_REQUEST,
  DELETE_WORKOUT_FAILURE,
  DELETE_WORKOUT_SUCCESS,
  UPDATE_WORKOUT_SUCCESS,
  UPDATE_WORKOUT_FAILURE,
  UPDATE_WORKOUT_REQUEST,
  GET_SWIMMERS_FAILURE,
  GET_SWIMMERS_REQUEST,
  GET_SWIMMERS_SUCCESS
} from 'src/store/workout/types';

const intialState: WorkoutState = {
  data: [],
  error: null,
  isLoading: false,
  swimmers: [],
  key: v4()
};

export const workoutReducer = (state = intialState, action: WorkoutActionTypes) => {
  switch (action.type) {
    case GET_WORKOUTS_REQUEST:
      return produce(state, draft => {
        draft.isLoading = true;
        draft.error = null;
      });

    case GET_WORKOUTS_SUCCESS:
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = null;
        draft.data = action.payload.data;
      });

    case GET_WORKOUTS_FAILURE:
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });

    case CREATE_WORKOUT_REQUEST:
      return produce(state, draft => {
        draft.isLoading = true;
      });

    case CREATE_WORKOUT_SUCCESS:
      return produce(state, draft => {
        draft.isLoading = false;
      });

    case CREATE_WORKOUT_FAILURE:
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });

    case DELETE_WORKOUT_REQUEST:
      return produce(state, draft => {
        draft.isLoading = true;
        draft.error = null;
      });

    case DELETE_WORKOUT_SUCCESS:
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = null;
      });

    case DELETE_WORKOUT_FAILURE:
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });

    case UPDATE_WORKOUT_REQUEST:
      return produce(state, draft => {
        draft.isLoading = true;
      });

    case UPDATE_WORKOUT_SUCCESS:
      return produce(state, draft => {
        draft.isLoading = false;
      });

    case UPDATE_WORKOUT_FAILURE:
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });

    case GET_SWIMMERS_REQUEST:
      return produce(state, draft => {
        draft.error = null;
        draft.swimmers = [];
      });

    case GET_SWIMMERS_SUCCESS:
      const swimmers = action.payload.data?.map(({ _id: id, full_name: name }) => ({ id, name }));
      return produce(state, draft => {
        draft.swimmers = swimmers;
        draft.key = v4();
      });

    case GET_SWIMMERS_FAILURE:
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });

    default:
      return state;
  }
};
