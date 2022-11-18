import React, { useState, useEffect } from 'react';
import { useField, FieldHookConfig, FormikValues } from 'formik';
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment, { Moment } from 'moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

type DatePickerProps = Omit<
  KeyboardDatePickerProps,
  'value' | 'error' | 'invalidDateMessage' | 'helperText' | 'onChange'
> &
  FieldHookConfig<FormikValues>;

const DateField: React.FC<DatePickerProps> = props => {
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = !!touched && !!error;
  const { value } = field;
  const [selectedDate, setSelectedDate] = useState(moment());

  useEffect(() => {
    if (value) {
      setSelectedDate(value as Moment);
    }
  }, [value]);

  const onDateChange = (date: MaterialUiPickersDate) => {
    if (date) {
      setSelectedDate(date);
      setValue(date);
    }
  };

  return (
    <>
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        <KeyboardDatePicker
          {...props}
          {...field}
          value={selectedDate}
          error={isError}
          invalidDateMessage={isError && error}
          helperText={isError && error}
          onChange={onDateChange}
        />
      </MuiPickersUtilsProvider>
      {isError && <div>{error}</div>}
    </>
  );
};

export default DateField;
