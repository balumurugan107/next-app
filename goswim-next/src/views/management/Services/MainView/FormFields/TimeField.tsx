import React, { useState, useEffect } from 'react';
import { useField, FieldHookConfig, FormikValues } from 'formik';
import {
  KeyboardTimePicker,
  KeyboardTimePickerProps,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment, { Moment } from 'moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

type TimePickerProps = Omit<
  KeyboardTimePickerProps,
  'value' | 'error' | 'invalidDateMessage' | 'helperText' | 'onChange'
> &
  FieldHookConfig<FormikValues>;

const TimeField: React.FC<TimePickerProps> = props => {
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = !!touched && !!error;
  const { value } = field;
  const [selectedTime, setSelectedTime] = useState(moment());

  useEffect(() => {
    if (value) {
      setSelectedTime(value as Moment);
    }
  }, [value]);

  const onDateChange = (time: MaterialUiPickersDate) => {
    if (time) {
      setSelectedTime(time);
      setValue(time);
    }
  };

  return (
    <>
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        <KeyboardTimePicker
          {...props}
          {...field}
          value={selectedTime}
          error={isError}
          invalidDateMessage={isError && error}
          helperText={isError && error}
          onChange={onDateChange}
          size="small"
        />
      </MuiPickersUtilsProvider>
      {isError && <div>{error}</div>}
    </>
  );
};

export default TimeField;
