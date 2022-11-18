import {
  SetPropsValues,
  SetPropsEnumProperty
} from 'src/views/management/Services/MainView/Set/SetWriterEditor/types';
import { MSGPropertyValue } from 'src/views/management/Services/MainView/Set/SetWriterEditor/types';

export interface SetSummary {
  equipment: (Omit<SetPropsValues, 'iteration'> & SetPropsEnumProperty)[];
  stroke: (Omit<SetPropsValues, 'iteration'> & SetPropsEnumProperty)[];
  type: (Omit<SetPropsValues, 'iteration'> & SetPropsEnumProperty)[];
  intensity: (Omit<SetPropsValues, 'iteration'> & SetPropsEnumProperty)[];
}

export interface WorkoutSummary extends SetSummary {
  distance: number;
  time: number;
}

export interface SetSummaryProps {
  summary?: Partial<WorkoutSummary> | MSGPropertyValue | null;
}
