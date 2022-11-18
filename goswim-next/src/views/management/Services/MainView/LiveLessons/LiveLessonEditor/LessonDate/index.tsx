import React from 'react';
import {
  Grid,
  Box,
  Card,
  FormGroup,
  CardActions,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  TextField,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useFormikContext } from 'formik';
import { useSelector } from 'react-redux';

import { ComponentProps } from 'src/types';
import { model, InitialValues, ScheduleObject } from 'src/views/management/Services/MainView/LiveLessons/FormModel';
import { EditorType } from 'src/store/management/service';
import { useCommonStyles } from 'src/styles/common';

interface LessonDateProps {
  type: EditorType;
}

const useStyles = makeStyles(theme => ({
  '@global': {
    '.MuiSvgIcon-colorSecondary': {
      color: theme.palette.secondary.main
    }
  },

  root: {
    padding: theme.spacing(4),
  },

  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  new: {
    display: 'flex'
  },
  ja: {
    width: '100%',
    justifyContent: "space-between",
  },
  iconSize: {
    fontSize: 32
  },

}));

const SlotsArray: React.FC = () => {
  const commonClasses = useCommonStyles();

  const {
    formField: { liveSchedule, liveScheduleSelected, liveScheduleCost }
  } = model;

  const { values, setFieldValue } = useFormikContext<InitialValues>();

  const classes = useStyles();
  const settings = useSelector(state => state.account.settings);


  return (
    <>
      <Grid className={classes.root} container spacing={2}>
        {values.liveSchedule?.map((scheduleObj: ScheduleObject, index: number) => (
          <Grid item xs={12} md={6} key={index}>
            <Card variant="outlined" className={classes.new} key={index}>
              <CardActions className={classes.ja}>
              <Grid container>
              <Grid item xs={8} sm={9} md={10}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={scheduleObj.selected} onChange={(e) => { setFieldValue(`${liveSchedule.name}[${index}].${liveScheduleSelected.name}`, e.target.checked) }} />}
                    label={scheduleObj.title} />
                </FormGroup>
                </Grid>
                <Grid item xs={4} sm={3} md={2}>
                  <Box>
                    <TextField size="small" className={commonClasses.cost} id={`${liveSchedule.name}[${index}].${liveScheduleCost.name}`} type="number" label="Outlined" variant="outlined" value={values.liveSchedule[index].cost}
                      onChange={(e: any) => { setFieldValue(`${liveSchedule.name}[${index}].${liveScheduleCost.name}`, e.target.value as number) }}
                      InputProps = {{
                        startAdornment: (
                          settings && <InputAdornment position="start">{settings?.currency}</InputAdornment>
                        ),
                        classes: { input: commonClasses.inputResize }
                      }}  />
                  </Box>
                </Grid>
                </Grid>
              </CardActions>
            </Card>

          </Grid>
        ))}
      </Grid>
    </>
  );
};

const LessonDate: React.FC<ComponentProps & LessonDateProps> = () => {

  return (
    <SlotsArray />
  );
};

export default LessonDate;

