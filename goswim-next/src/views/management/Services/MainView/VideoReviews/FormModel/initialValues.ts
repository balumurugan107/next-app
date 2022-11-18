import moment from 'moment';
import videoReviewModel from 'src/views/management/Services/MainView/VideoReviews/FormModel/videoReviewFormModel';
import { VRFormKeys } from 'src/views/management/Services/MainView/VideoReviews/FormModel/videoReviewFormModel';

export interface EditorData extends Record<VRFormKeys, unknown> {
  vrName: string;
  vrDescription: string;
  cost: number;
  slots: number;
  startDate: moment.Moment; //moment.Moment
  endDate: moment.Moment; //moment.Moment;
  vrTeam: string;
  vrRoster: string[];
  serviceId?: string;
  serviceReviewId?: string;
}

const {
  formField: { cost, slots }
} = videoReviewModel;

const initialValues: EditorData = {
  vrName: '',
  vrDescription: '',
  cost: cost.defaultValue,
  slots: slots.defaultValue, //slot changed here
  startDate: moment().startOf('day'),
  endDate: moment().endOf('day'),
  vrTeam: '',
  vrRoster: []
};

export default initialValues;
