import React, { useRef, useEffect } from 'react';
import moment from 'moment';
import { Grid, Card, Box, Typography, Slider, FormHelperText } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { DateRangePicker } from 'materialui-daterange-picker';
import { useFormikContext, Field, ErrorMessage } from 'formik';
import { TextField } from 'formik-material-ui';
import { model, EditorData } from 'src/views/management/Services/MainView/VideoReviews/FormModel';
import { ComponentProps } from 'src/types';
import { useCommonStyles } from 'src/styles/common';

const useStyles = makeStyles(theme => ({
  '@global': {
    '.MuiSvgIcon-colorSecondary': {
      color: theme.palette.secondary.main
    }
  },
  inputResize: {
    fontSize: '1.25rem',
    fontWeight: 800
  },
  dateRangePickerConatiner: {
    '& .MuiTypography-subtitle1': {
      color: theme.palette.text.secondary,
      fontWeight: 700
    }
  },
  error: {
    color: '#f44336',
    fontSize: 12,
    marginLeft: 14,
    marginRight: 14,
    lineHeight: 1.66,
    letterSpacing: 0.5
  },
  dateRangePickerVR: {
    '& div.MuiGrid-root.MuiGrid-container.MuiGrid-wrap-xs-nowrap.MuiGrid-justify-xs-center': {
      [theme.breakpoints.down('sm')]: {
        display: 'block'
      },
      '& div': {
        '& button': {
          '& svg': {
            color: theme.palette.secondary.main
          }
        }
      }
    }
  }
}));

const ReviewDate: React.FC<ComponentProps> = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const dateRangePickerContainerRef = useRef<HTMLDivElement>(null);
  const { values, setFieldValue } = useFormikContext<EditorData>();
  const {
    formField: { slots, startDate: startDateField, endDate: endDateField }
  } = model;

  useEffect(() => {
    try {
      // remove backdrop of materialui-daterange-picker
      dateRangePickerContainerRef.current?.children[0].children[0].remove();
    } catch (err) {
      console.error('Cannot remove backdrop of materialui-daterange-picker-->', err);
    }
  }, []);

  return (
    <>
      <Grid item xs={12} xl={12}>
        <Card className={classes.dateRangePickerConatiner} ref={dateRangePickerContainerRef}>
          <DateRangePicker
            wrapperClassName={classes.dateRangePickerVR}
            open
            {...(values.startDate.valueOf() !==
              moment()
                .startOf('day')
                .valueOf() &&
              values.endDate.valueOf() !==
                moment()
                  .endOf('day')
                  .valueOf() && {
                initialDateRange: {
                  startDate: values.startDate.toDate(),
                  endDate: values.endDate.toDate()
                }
              })}
            definedRanges={[]}
            toggle={() => {}}
            onChange={({ startDate, endDate }) => {
              if (startDate && startDate) {
                setFieldValue(startDateField.name, moment(startDate).startOf('day'));
                setFieldValue(endDateField.name, moment(endDate).endOf('day'));
              }
            }}
          />
        </Card>
        <ErrorMessage
          name={startDateField.name}
          render={msg => <FormHelperText error>{msg}</FormHelperText>}
        />
        <br />
        <ErrorMessage
          name={endDateField.name}
          render={msg => <FormHelperText error>{msg}</FormHelperText>}
        />
      </Grid>
      <Grid item xs={12} sm={9} md={10} xl={10}>
        <Box>
          <Typography id="slots" gutterBottom>
            Slots
          </Typography>
          <Slider
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            defaultValue={slots.defaultValue}
            onChange={(_1, number) => {
              setFieldValue(slots.name, number);
            }}
            step={slots.step}
            marks
            min={slots.minValue}
            max={slots.maxValue}
            value={values.slots < slots.maxValue ? values.slots : slots.maxValue}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={3} md={2} xl={2}>
        <Box>
          <Field
            component={TextField}
            className={commonClasses.cost}
            name={slots.name}
            variant="outlined"
            size="small"
            InputProps={{
              classes: { input: classes.inputResize }
            }}
          />
        </Box>
      </Grid>
    </>
  );
};

export default ReviewDate;
