import { apiGetScheduleOverview, apiUpdateOverViewItem } from 'pages/api/calendar';
import { Dispatch } from 'redux';
import { ScheduleOverviewInstance } from 'src/services/calendar';
import {
  OverviewGetQueryParams,
  NotesData,
  UpdateNotesFailure,
  UpdateNotesRequest,
  UpdateNotesSuccess,
  UPDATE_NOTES_FAILURE,
  UPDATE_NOTES_REQUEST,
  UPDATE_NOTES_SUCCESS
} from 'src/store/calendar/scheduleOverview/types';
import { UpdateScheduleRequestObj } from 'src/store/management/goswim/lessons/details';

export const getScheduleOverview = (date: OverviewGetQueryParams) => {
  return async (dispatch: Dispatch) => {
    apiGetScheduleOverview(dispatch, date);
  };
};

export const updateOverViewItem = (data: UpdateScheduleRequestObj) => {
  return async (dispatch: Dispatch) => {
    apiUpdateOverViewItem(dispatch, data);
  };
};

export const updateNotes = (notes: NotesData) => async (dispatch: Dispatch) => {
  try {
    dispatch<UpdateNotesRequest>({
      type: UPDATE_NOTES_REQUEST
    });

    await ScheduleOverviewInstance.updateNotes(notes);

    dispatch<UpdateNotesSuccess>({
      type: UPDATE_NOTES_SUCCESS
    });
  } catch (error) {
    dispatch<UpdateNotesFailure>({
      type: UPDATE_NOTES_FAILURE,
      error
    });
  }
};
