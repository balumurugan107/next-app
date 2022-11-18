import produce from 'immer';
import { Colours, ThemeVariant, Direction } from 'src/constants';
import { SettingsState, SettingsActionTypes, SET_SETTINGS } from 'src/store/settings/types';

const initialState: SettingsState = {
  direction: Direction.LEFT_TO_RIGHT,
  responsiveFontSizes: true,
  // theme: Colours.HEAT_WAVE,
  theme: Colours.SAPPHIRE_BLUE,
  variant: ThemeVariant.LITE,
  logoUrl: null,
  teamName: null
};

export const settingsReducer = (state = initialState, action: SettingsActionTypes) => {
  switch (action.type) {
    case SET_SETTINGS: {
      return produce(state, draft => ({ ...draft, ...action.payload }));
    }

    default: {
      return state;
    }
  }
};
