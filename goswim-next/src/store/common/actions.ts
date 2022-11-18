import { Dispatch } from 'redux';
import { TeamValues, SET_TEAM_VALUES, RosterValues, SET_ROSTER_VALUES } from 'src/store/common';

export const setTeamValue = (values: Partial<TeamValues>) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SET_TEAM_VALUES, payload: values });
  } catch (error) {
    console.error(`setDropdownValues-->${error}`);
  }
};

export const setRosterValues = (values: Partial<RosterValues>) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SET_ROSTER_VALUES, payload: values });
  } catch (error) {
    console.error(`setRosterValues-->${error}`);
  }
};
