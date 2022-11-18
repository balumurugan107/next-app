import moment, { Moment } from 'moment-timezone';

import liveLessonModel from 'src/views/management/Services/MainView/LiveLessons/FormModel/livelessonFormModel';

const {
  formField: { price }
} = liveLessonModel;

export interface Slot {
  startTime: Moment;
  endTime: Moment;
  booked: boolean;
  scheduleLessonId?: string;
}

export interface ScheduleObject {
  title: string;
  cost: number;
  selected: boolean;
}

export interface InitialValues {
  name: string;
  description: string;
  cost: number;
  lessonDate: Moment;
  slots: Slot[];
  team: string;
  roster: string[];
  removedSlots: string[];
  serviceId?: string;
  schedule: string;
  liveSchedule: ScheduleObject[];
}

export const defaultInitialValues: InitialValues = {
  schedule: '',
  liveSchedule: [
    {
      title: '15 minute meeting',
      cost: 40,
      selected: false
    },
    {
      title: '30 minute meeting',
      cost: 60,
      selected: false
    },
    {
      title: '45 minute meeting',
      cost: 80,
      selected: false
    },
    {
      title: '60 minute meeting',
      cost: 100,
      selected: false
    }
  ],
  name: '',
  description: '',
  cost: price.defaultValue,
  lessonDate: moment().startOf('day'),
  slots: [
    {
      startTime: moment().startOf('day'),
      endTime: moment().endOf('day'),
      booked: false
    }
  ],
  team: '',
  roster: [],
  removedSlots: []
};
