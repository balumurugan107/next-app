import { Dispatch } from 'redux';
import { dashboardServiceInstance } from 'src/services/dashboard/dashboardService';
import {
  SetDataRequest,
  SetDataRequestFailure,
  SetDataResponse,
  SET_DATA_REQUEST,
  SET_DATA_REQUEST_FAILURE,
  SET_DATA_RESPONSE,
  SetDataRequestParams,
  VideoReviewStatRequest,
  VIDEO_REVIEW_STAT_REQUEST,
  VideoReviewStatRequestParams,
  VideoReviewStatResponse,
  VIDEO_REVIEW_STAT_RESPONSE,
  VideoReviewStatRequestFailure,
  VIDEO_REVIEW_STAT_REQUEST_FAILURE,
  VIDEO_REVIEW_FAILURE,
  VideoReviewFailure,
  VideoReviewRequest,
  VIDEO_REVIEW_REQUEST,
  VideoReviewResponse,
  VIDEO_REVIEW_RESPONSE,
  SetData,
  SetFilterValues,
  SET_FILTER_VALUES,
  RosterFilter,
  RosterGroupSwimmers,
  WorkoutFilter,
  UpdateFilter,
  UPDATE_FILTER,
  BookingHistoryRequestFailure,
  BOOKING_HISTORY_FAILURE,
  BookingHistoryRequest,
  BOOKING_HISTORY_REQUEST,
  BookingHistoryResponse,
  BOOKING_HISTORY_RESPONSE,
  LiveLessonsStatRequest,
  LIVE_LESSONS_STAT_REQUEST,
  LiveLessonsStatResponse,
  LIVE_LESSONS_STAT_RESPONSE,
  LiveLessonsStatFailure,
  LIVE_LESSONS_STAT_FAILURE,
  LiveLessonsHistoryFailure,
  LIVE_LESSONS_HISTORY_FAILURE,
  LiveLessonsHistoryRequest,
  LIVE_LESSONS_HISTORY_REQUEST,
  LIVE_LESSONS_HISTORY_RESPONSE,
  LiveLessonsHistoryResponse,
  HUDParams,
  UpdateWorkoutHUDDate,
  WORKOUT_HUD_DATE_UPDATE,
  UpdateWorkoutHUDDateFailure,
  WORKOUT_HUD_DATE_UPDATE_FAILURE
  //RecentlyAddedLessons
} from 'src/store/dashboard/types';

// export const getRecentlyAddedLessons = (params: ) =>{
//   return async (dispatch: Dispatch) =>{
//     try {

//     }
//   }
// }
export const getSetData = (params: SetDataRequestParams) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<SetDataRequest>({ type: SET_DATA_REQUEST, params });
      const payload = await dashboardServiceInstance.getSetData(params);
      obtainTeamAndRosterGroups(payload.data, dispatch);
      dispatch<SetDataResponse>({ type: SET_DATA_RESPONSE, payload });
    } catch (error) {
      dispatch<SetDataRequestFailure>({ type: SET_DATA_REQUEST_FAILURE, error });
    }
  };
};

const obtainTeamAndRosterGroups = (data: SetData[], dispatch: Dispatch) => {
  try {
    const teams: WorkoutFilter[] = data
      ?.filter(
        (it, index) => data.findIndex((d): boolean => d.sets_team_id === it.sets_team_id) === index
      )
      ?.map(it => ({ id: it.sets_team_id, name: it.team_name }));
    const rosters: RosterFilter[] = [];
    data.forEach(it => {
      const rosterGroupArray: RosterGroupSwimmers[] = it.roster_group.map(m => ({
        id: m,
        name: m,
        swimmers: [{ id: it.swimmer_id, name: it.swimmer_name }]
      }));
      const obj: RosterFilter = {
        teamId: it.sets_team_id,
        rosterGroups: rosterGroupArray
      };
      const presentObj = rosters.find(t => t.teamId === obj.teamId);
      if (!presentObj) {
        rosters.push(obj);
      } else {
        presentObj.rosterGroups = presentObj.rosterGroups.concat(obj.rosterGroups);
        presentObj.rosterGroups = presentObj.rosterGroups.filter(
          (it, index) => presentObj.rosterGroups.findIndex(r => r.id === it.id) === index
        );
        presentObj.rosterGroups?.forEach(rg => {
          const swimmers = obj.rosterGroups.find(nrg => nrg.id === rg.id)?.swimmers || [];
          rg.swimmers = rg.swimmers?.concat(swimmers);
          rg.swimmers = rg.swimmers?.filter(
            (drg, index) => rg.swimmers?.findIndex(r => r.id === drg.id) === index
          );
        });
      }
    });
    dispatch<SetFilterValues>({ type: SET_FILTER_VALUES, teams, rosters });
  } catch (error) {}
};

export const getVideoReviewStats = (params: VideoReviewStatRequestParams) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<VideoReviewStatRequest>({ type: VIDEO_REVIEW_STAT_REQUEST, params });
      const payload = await dashboardServiceInstance.getVideoReviewStat(params);
      dispatch<VideoReviewStatResponse>({ type: VIDEO_REVIEW_STAT_RESPONSE, payload });
    } catch (error) {
      dispatch<VideoReviewStatRequestFailure>({
        type: VIDEO_REVIEW_STAT_REQUEST_FAILURE,
        error
      });
    }
  };
};

export const updateFilterValues = (params: { filterType: string; id: string }) => {
  return (dispatch: Dispatch) => {
    const { id, filterType } = params;
    dispatch<UpdateFilter>({ type: UPDATE_FILTER, filterType, id });
  };
};

export const getVideoReviews = (params: SetDataRequestParams) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<VideoReviewRequest>({ type: VIDEO_REVIEW_REQUEST, params });
      const payload = await dashboardServiceInstance.getVideoReviewData(params);
      dispatch<VideoReviewResponse>({ type: VIDEO_REVIEW_RESPONSE, payload });
    } catch (error) {
      dispatch<VideoReviewFailure>({ type: VIDEO_REVIEW_FAILURE, error });
    }
  };
};

export const getBookingHistoryData = (params: SetDataRequestParams) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<BookingHistoryRequest>({ type: BOOKING_HISTORY_REQUEST, params });
      const payload = await dashboardServiceInstance.getVideoBookingHistory(params);
      dispatch<BookingHistoryResponse>({ type: BOOKING_HISTORY_RESPONSE, payload });
    } catch (error) {
      dispatch<BookingHistoryRequestFailure>({ type: BOOKING_HISTORY_FAILURE, error });
    }
  };
};

export const getLiveLessonsStatData = (params: VideoReviewStatRequestParams) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<LiveLessonsStatRequest>({ type: LIVE_LESSONS_STAT_REQUEST, params });
      const payload = await dashboardServiceInstance.getLiveLessonsStats(params);
      dispatch<LiveLessonsStatResponse>({ type: LIVE_LESSONS_STAT_RESPONSE, payload });
    } catch (error) {
      dispatch<LiveLessonsStatFailure>({ type: LIVE_LESSONS_STAT_FAILURE, error });
    }
  };
};

export const getLiveLessonsHistoryData = (params: SetDataRequestParams) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<LiveLessonsHistoryRequest>({ type: LIVE_LESSONS_HISTORY_REQUEST, params });
      const payload = await dashboardServiceInstance.getLiveLessonsHistory(params);
      dispatch<LiveLessonsHistoryResponse>({ type: LIVE_LESSONS_HISTORY_RESPONSE, payload });
    } catch (error) {
      dispatch<LiveLessonsHistoryFailure>({ type: LIVE_LESSONS_HISTORY_FAILURE, error });
    }
  };
};

export const getLiveLessons = (params: SetDataRequestParams) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<VideoReviewRequest>({ type: VIDEO_REVIEW_REQUEST, params });
      const payload = await dashboardServiceInstance.getLiveLessonsData(params);
      dispatch<VideoReviewResponse>({ type: VIDEO_REVIEW_RESPONSE, payload });
    } catch (error) {
      dispatch<VideoReviewFailure>({ type: VIDEO_REVIEW_FAILURE, error });
    }
  };
};

export const updateHudDate = (payload: HUDParams) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UpdateWorkoutHUDDate>({
        type: WORKOUT_HUD_DATE_UPDATE,
        payload: payload
      });
    } catch (error) {
      dispatch<UpdateWorkoutHUDDateFailure>({ type: WORKOUT_HUD_DATE_UPDATE_FAILURE, error });
    }
  };
};
