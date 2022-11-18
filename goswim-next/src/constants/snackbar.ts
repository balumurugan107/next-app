import { OptionsObject } from 'notistack';

export const defaultOptions: OptionsObject = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center'
  },
  autoHideDuration: 2500,
  preventDuplicate: true
};

export enum Messages {
  SUBSCRIPTION_IN_PROGRESS = 'Subscription activated',
  SUBSCRIPTION_CANCELED = 'Unable to activate the subscription, please try again',
  SUBSCRIPTION_CARD_VALIDATION = 'Subscription activation is in progress'
}
