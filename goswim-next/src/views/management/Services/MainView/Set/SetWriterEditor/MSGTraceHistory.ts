import {
  MSGSetValue,
  MSGPropertyValue
} from 'src/views/management/Services/MainView/Set/SetWriterEditor/types';
import { KeyValue } from 'src/types';

/** Multiplier SwimmerTag GroupName Trace History */
export default class MSGTraceHistory {
  distance: number = 0;
  time: number = 0;
  line: number;
  stroke: KeyValue<MSGSetValue> = {};
  type: KeyValue<MSGSetValue> = {};
  intensity: KeyValue<MSGSetValue> = {};
  equipment: KeyValue<MSGSetValue> = {};

  constructor(line: number) {
    this.line = line;
  }

  toJSON = (): MSGPropertyValue => {
    const { toJSON: _1, stroke, type, intensity, equipment, ...rest } = this;
    return {
      ...rest,
      stroke: Object.values(stroke),
      type: Object.values(type),
      intensity: Object.values(intensity),
      equipment: Object.values(equipment)
    };
  };
}
