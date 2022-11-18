import momentTz from 'moment-timezone';
import { DateFormat, CURRENCY, SUBSCRIPTION_ROUTES } from 'src/constants';

export interface InitialValues {
  timeZone: string;
  dateFormat: DateFormat;
  currency?: CURRENCY;
  landingPage: SUBSCRIPTION_ROUTES;
  serviceMaxPrice: number;
  use_hd_video: boolean;
  autoplay_video: boolean;
}

export const defaultInitialValues: InitialValues = {
  timeZone: momentTz.tz.guess(),
  dateFormat: DateFormat.MONTHDATE,
  currency: CURRENCY['usd'],
  landingPage: SUBSCRIPTION_ROUTES.Dashboard,
  serviceMaxPrice: 200,
  use_hd_video: false,
  autoplay_video: false
};
