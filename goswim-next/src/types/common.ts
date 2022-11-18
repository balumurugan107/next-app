export type KeyValue<T = any> = { [key: string]: T };

export type KeyInValue<T extends string | number | symbol, U = any> = { [key in T]: U };

export type ValueOf<T> = T[keyof T];

export interface SelectOption {
  title: string;
  value: string;
}

export interface MultiSelectOption extends SelectOption {
  isNewValue?: boolean;
}
export type Color = 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';

export type FormType = 'add' | 'edit';

export interface CalanderEvent {
  id?: string;
  allDay?: boolean;
  color?: string;
  description?: string;
  end?: Date | string;
  start?: Date | string;
  title?: string;
}

export interface HTTPResponse<T = any> {
  status: string;
  message: string;
  data: T;
}

export interface HTTPErrorResponse {
  message: string;
  status: string;
}
