import { ApplicationThemes } from '@mui/material/styles';
import { ThemeVariant, Direction } from 'src/constants';

export interface SettingsState {
  direction: Direction;
  responsiveFontSizes: boolean;
  theme: keyof ApplicationThemes;
  variant: ThemeVariant;
  logoUrl: string | null;
  teamName: string | null;
}

/* set settings */
export const SET_SETTINGS = '@settings/set-settings';

export interface SetSettings {
  type: typeof SET_SETTINGS;
  payload: SettingsState;
}

export type SettingsActionTypes = SetSettings;
