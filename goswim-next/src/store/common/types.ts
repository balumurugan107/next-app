import { KeyInValue, MultiSelectOption } from 'src/types';

export enum TeamRosterValueKeys {
  MEMBER_CREATE_EDIT = 'MEMBER_CREATE_EDIT',
  SERVICES_SETS = 'SERVICES_SETS',
  SERVICES_VIDEO_REVIEWS = 'SERVICES_VIDEO_REVIEWS',
  SERVICES_LIVE_LESSONS = 'SERVICES_LIVE_LESSONS'
}

export interface CommonState {
  persist: {
    teamValues: Partial<TeamValues>;
    rosterValues: Partial<RosterValues>;
  };
}

export type TeamValues = KeyInValue<TeamRosterValueKeys, string | null>;

export type RosterValues = {
  [TeamRosterValueKeys.MEMBER_CREATE_EDIT]: MultiSelectOption[];
  [TeamRosterValueKeys.SERVICES_SETS]: string[];
  [TeamRosterValueKeys.SERVICES_VIDEO_REVIEWS]: string[];
  [TeamRosterValueKeys.SERVICES_LIVE_LESSONS]: string[];
};

export const SET_TEAM_VALUES = '@common/persist/set-team-values';
export const SET_ROSTER_VALUES = '@common/persist/set-roster-values';

export interface SetDropdownValues {
  type: typeof SET_TEAM_VALUES;
  payload: TeamValues;
}

export interface SetRosterValues {
  type: typeof SET_ROSTER_VALUES;
  payload: RosterValues;
}

export type CommonActionTypes = SetDropdownValues | SetRosterValues;
