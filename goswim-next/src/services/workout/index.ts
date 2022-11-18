import moment from 'moment';
import { httpClientInstance } from 'src/core/HttpClient';
import SnackbarUtils from 'src/helpers/snackbar';
import { defaultOptions } from 'src/constants';
import { HTTPResponse } from 'src/types';
import { Workout, AttendanceData, SwimmerParams, Swimmer } from 'src/store/workout/types';

export default class WorkoutService {
  private static instance: WorkoutService;

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new WorkoutService();
    return this.instance;
  }

  getCoachWorkout = async (type: string) => {
    try {
      const today = moment()
        .startOf('day')
        .valueOf();
      const response = await httpClientInstance.get<HTTPResponse<Workout[]>>(
        `api/v1/workouts/coach/?type=${type}&date=${today}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  createWorkout = async <T>(workout: T) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse<any>>('api/v1/workouts', workout);
      SnackbarUtils.success('Workout Created Successfully', defaultOptions);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  updateWorkout = async <T>(workout: T, workout_id: string) => {
    try {
      const response = await httpClientInstance.put<HTTPResponse<any>>(
        `api/v1/workouts/${workout_id}`,
        workout
      );
      SnackbarUtils.success('Workout Updated Successfully', defaultOptions);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  deleteWorkout = async (_id: string) => {
    try {
      const response = await httpClientInstance.delete<HTTPResponse<any>>(`api/v1/workouts/${_id}`);
      SnackbarUtils.success('Workout Deleted Successfully', defaultOptions);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  markAttendance = async (attendance: AttendanceData) => {
    try {
      const response = await httpClientInstance.put<HTTPResponse<any>>(
        'api/v1/workouts/swimmer/attendance',
        attendance
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getSwimmers = async (params: SwimmerParams) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse<Swimmer[]>>(
        'api/v1/workouts/rosterSwimmers',
        params
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export const workoutService = WorkoutService.getInstance();
