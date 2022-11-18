import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  alpha,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ComponentProps } from 'src/types/components';
import { getTeamHeirarchy } from 'src/store/management/team';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import LoadingButton from 'src/components/LoadingButton';
import { FormProps, InitialValues } from 'src/store/goswim/admin/specialGroups/types';

const useStyles = makeStyles(theme => ({
  cbAllowAddTeam: {
    [theme.breakpoints.down('sm')]: { justifyContent: 'start' },
    [theme.breakpoints.only('lg')]: { flexGrow: 1, maxWidth: '46.333333%' }
  },
  roleRadioButton: {
    '& fieldset': {
      width: '100%',
      border: '#ccc solid 1px',
      borderRadius: '4px',
      padding: '5px 0 6px 15px',
      marginTop: '-10px'
    },
    '& legend': {
      fontSize: '12px',
      padding: '0 10px'
    }
  },
  rosterGroupEdit: {
    '& .MuiAutocomplete-inputRoot': {
      flexWrap: 'nowrap'
    }
  },
  roster: {
    '& .MuiAutocomplete-input ': {
      display: 'none'
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] ': {
      minHeight: 56
    }
  },
  mail: {
    padding: 0,
    marginTop: 16,
    color: theme.palette.background.dark
  },
  marginTop: {
    width: '100%',
    marginTop: 16
  },
  chipCust: {
    marginRight: 3,
    marginBottom: 5,
    backgroundColor: theme.palette.background.dark
  },
  buttonText: { fontWeight: 500, color: theme.palette.common.white },
  formRoot: {
    '& .MuiFormLabel-root.Mui-disabled': {
      color: theme.palette.text.secondary
    }
  },
  saveBtn: {
    color: theme.palette.common.white
  },
  alertSection: {
    backgroundColor: alpha('#ff0000', 0.2),
    padding: theme.spacing(1),
    fontWeight: 500,
    borderRadius: theme.spacing(0.5)
  },
  chip: {
    margin: '0 4px 4px 4px',
    background: alpha(theme.palette.primary.main, 0.04)
  },
  cardHeaderWithActions: {
    // padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: theme.spacing(2),
    '& button:nth-last-child(2)': {
      marginRight: theme.spacing(1.5)
    }
  },
  toggleButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  toggleWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  tabWrapper: {
    marginTop: theme.spacing(1.5),

    '& .MuiTab-root': {
      minHeight: `auto !important`,
      padding: theme.spacing(1),
      borderRadius: theme.spacing(1),
      '&.error': {
        color: theme.palette.error.main,
        borderColor: alpha(theme.palette.error.main, 0.15)
      },
      '&.warning': {
        color: theme.palette.warning.main,
        borderColor: alpha(theme.palette.warning.main, 0.15)
      },
      '&.success': {
        color: theme.palette.success.main,
        borderColor: alpha(theme.palette.success.main, 0.15)
      }
    },
    '& .MuiTab-root.Mui-selected': {
      border: `1px solid`,
      '&.error': {
        background: `${alpha(theme.palette.error.main, 0.15)} !important`
      },
      '&.warning': {
        background: `${alpha(theme.palette.warning.main, 0.15)} !important`
      },
      '&.success': {
        background: `${alpha('#008000', 0.15)} !important`
      }
    },
    '& .MuiTabs-indicator': {
      display: 'none'
    }
  }
}));

const paymentStatusList: { value: string; label: string; className: string }[] = [
  { value: 'pending', label: 'Pending', className: 'error' },
  { value: 'inprogress', label: 'Inprogress', className: 'warning' },
  { value: 'completed', label: 'completed', className: 'success' }
];
const groupStatusList: { value: string; label: string; className: string }[] = [
  { value: 'active', label: 'Active', className: 'success' },
  { value: 'inactive', label: 'Inactive', className: 'warning' },
  { value: 'expired', label: 'Expired', className: 'error' }
];

const Form: React.FC<ComponentProps & FormProps> = ({ group, pageTitle }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const state: any = location?.state;
  const date = new Date();
  useEffect(() => {
    if (state && state?.from === 'admin') {
      dispatch(getTeamHeirarchy());
    }
  }, []);

  const initialValues: InitialValues = {
    group_name: group?.group_name || '',
    email: group?.email || '',
    total_members: group?.total_members || 0,
    total_coaches: group?.total_coaches || 0,
    total_amount: group?.total_amount || 0,
    group_status: group?.group_status || 'active',
    payment_status: group?.payment_status || 'completed',
    plan_duration: group?.plan_duration ? moment(group?.plan_duration) : moment().endOf('day')
  };
  let validationSchema = Yup.object().shape({
    group_name: Yup.string()
      .max(255)
      .required('Group Name is required'),
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required')
  });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async values => {
          //Need to add action 
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          touched,
          values
          // isValid
        }) => (
          <form className={classes.formRoot} onSubmit={handleSubmit}>
            <Card sx={{ mt: 2 }}>
              {/* <Box className={classes.cardHeaderWithActions}>
                <CardHeader title={pageTitle || 'Create Special Group'} />
              </Box>
              <Divider /> */}
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.group_name && errors.group_name)}
                      fullWidth
                      helperText={touched.group_name && errors.group_name}
                      label={`Group Name *`}
                      name="group_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.group_name}
                      variant="outlined"
                    />
                  </Grid>
                  {/* Primary mail */}
                  <Grid item lg={6} md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label={`Group Admin Email*`}
                      name="full_name"
                      // onBlur={e => handleEmailBlur(e.target.value)}
                      onChange={e => {
                        setFieldValue('email', (e.target as HTMLInputElement).value);
                      }}
                      value={values.email}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Full name */}
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Members Count*"
                      name="total_members"
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.total_members}
                      InputProps={{
                        inputProps: { min: 0 }
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Coaches Count*"
                      name="total_coaches"
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.total_coaches}
                      InputProps={{
                        inputProps: { min: 0 }
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="total amount">Total Amount</InputLabel>
                      <OutlinedInput
                        name="total_amount"
                        type="number"
                        id="outlined-adornment-amount"
                        value={values.total_amount}
                        onChange={handleChange}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Total Amount"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDatePicker
                        disablePast
                        label="Plan Duration"
                        inputFormat="DD/MM/YYYY"
                        value={values.plan_duration}
                        onChange={date => {
                          setFieldValue('plan_duration', date);
                        }}
                        renderInput={params => <TextField fullWidth {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputLabel htmlFor="Payment status">Payment Status</InputLabel>
                    <Tabs
                      className={classes.tabWrapper}
                      value={values.payment_status}
                      onChange={(_: React.SyntheticEvent, value: string) => {
                        setFieldValue('payment_status', value);
                      }}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="secondary tabs example"
                    >
                      {paymentStatusList.map(tab => (
                        <Tab
                          value={tab.value}
                          label={tab.label}
                          key={tab.value}
                          className={tab.className}
                        />
                      ))}
                    </Tabs>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputLabel htmlFor="Group status">Group Status</InputLabel>
                    <Tabs
                      className={classes.tabWrapper}
                      value={values.group_status}
                      onChange={(_: React.SyntheticEvent, value: string) => {
                        setFieldValue('group_status', value);
                      }}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="secondary tabs example"
                    >
                      {groupStatusList.map(tab => (
                        <Tab
                          value={tab.value}
                          label={tab.label}
                          key={tab.value}
                          className={tab.className}
                        />
                      ))}
                    </Tabs>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box p={2} display="flex" justifyContent="flex-end">
                <LoadingButton
                  color="secondary"
                  type="submit"
                  variant="contained"
                  isLoading={false}
                  isValid={true}
                  progressSize={20}
                  className={classes.saveBtn}
                >
                  <Typography component="span" className={classes.buttonText}>
                    {'Create'}
                  </Typography>
                </LoadingButton>
              </Box>
            </Card>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Form;
