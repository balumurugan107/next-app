export enum ServiceMessages {
  DELETE_SUCCESS = 'Video Review Service Deleted',
  UPDATE_SUCCESS = 'Video Review Service Updated',
  CREATE_SUCCESS = 'Video Review Service Created'
}

export enum DialogBoxConfimrationText {
  VIDEO_REVIEWS_DELETE = 'Are you sure to delete the selected scheduled Video Review service?',
  STOP_VIDEO_REVIEWS_DELETE = 'There are confirmed bookings for the selected Video Review service, so it cannot be deleted.',
  STOP_VIDEO_REVIEWS_EDIT = 'There are confirmed bookings for the selected Video Review service, so it cannot be edited.',
  WORKOUTS_DELETE = 'Are you sure to delete the selected Workout?',
  CLOSE = 'Changes made will be lost, do you want to exit?',
  LIVE_LESSONS_DELETE = 'Are you sure to delete the selected Live Lesson Service?'
}

export const metricsOptions = ['Yards', 'Meters'];

export enum LessonServiceMessages {
  DELETE_SUCCESS = 'Live Lesson Service Deleted',
  UPDATE_SUCCESS = 'Live Lesson Service Updated',
  CREATE_SUCCESS = 'Live Lesson Service Created'
}

export enum SERVICES {
  REVIEW = 'Review',
  LESSON = 'Lesson'
}
