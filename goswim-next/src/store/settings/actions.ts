import { Dispatch } from 'redux';
import { SettingsState, SET_SETTINGS } from 'src/store/settings/types';

export const setSettings = (settings: SettingsState) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SET_SETTINGS, payload: settings });
  } catch (error) {
    console.error(`setSettings-->${error}`);
  }
};
