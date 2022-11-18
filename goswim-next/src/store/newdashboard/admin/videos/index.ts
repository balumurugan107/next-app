import { apiGetFilteredVideoCount, apiGetFilteredVideoList } from 'pages/api/admin/videos';
import { Dispatch } from 'react';
import { GetVideoListRequestData } from '../../types';

export const getFilteredVideosCounts = () => {
  return async (dispatch: Dispatch) => {
    apiGetFilteredVideoCount(dispatch);
  };
};

export const getVideosList = (params?: GetVideoListRequestData) => {
  return async (dispatch: Dispatch) => {
    apiGetFilteredVideoList(dispatch, params);
  };
};
