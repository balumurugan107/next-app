import { SelectOption } from 'src/types';
import { AccountType, TrailDuration, Certificates, RosterGroup } from 'src/constants/common';

export const accountTypes = [AccountType.COACH_OR_SWIMMING_EXPERT, AccountType.SWIMMER_OR_PARENT];

export const certificateType: SelectOption[] = [
  { title: Certificates.USA_SWIMMING, value: Certificates.USA_SWIMMING },
  { title: Certificates.ASCA, value: Certificates.ASCA }
];

export const trialOptions = Object.values(TrailDuration);

export const rosterOptions: SelectOption[] = [
  { title: RosterGroup.TEN_AND_UNDER, value: RosterGroup.TEN_AND_UNDER },
  { title: RosterGroup.ELEVEN_TO_TWELVE, value: RosterGroup.ELEVEN_TO_TWELVE },
  { title: RosterGroup.THIRTEEN_TO_FOURTEEN, value: RosterGroup.THIRTEEN_TO_FOURTEEN },
  { title: RosterGroup.FIFTEEN_TO_SEVENTEEN, value: RosterGroup.FIFTEEN_TO_SEVENTEEN },
  { title: RosterGroup.EIGHTEEN_AND_ABOVE, value: RosterGroup.EIGHTEEN_AND_ABOVE },
  { title: RosterGroup.MASTERS, value: RosterGroup.MASTERS }
];
