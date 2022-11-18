import React from 'react';
import {
  Grid,
  MenuItem,
  Card,
  CardContent,
  Box,
  Divider,
  Typography,
  Slide,
  // Breadcrumbs,
  // Link
  Container
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import momentTZ from 'moment-timezone';
import _ from 'lodash';
import { Save as SaveIcon } from 'react-feather';

import {
  defaultInitialValues,
  model,
  InitialValues
} from 'src/views/pages/AccountView/Settings/FormModel';
import {
  AccountType,
  CURRENCY,
  DateFormat,
  ITEM_HEIGHT,
  ITEM_PADDING_TOP,
  SUBSCRIPTION_ROUTES,
  FilterRoutes
} from 'src/constants';
import LoadingButton from 'src/components/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { saveSettings } from 'src/store/account';

// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import { Link as RouterLink } from 'react-router-dom';
import Header from './header';
import Page from 'src/components/Page';

const useStyle = makeStyles(theme => ({
  buttonText: {
    fontWeight: 500
  },
  inputTitle: {
    marginBottom: 30
  },
  progressBox: {
    height: 10,
    width: '100% !important',
    [theme.breakpoints.down('sm')]: { width: '100% !important', float: 'right' }
  },
  root: {
    minHeight: '100%',
    paddingBottom: 100
  }
}));

const Settings: React.FC = () => {
  const classes = useStyle();
  const {
    formId,
    formField: { timeZone, dateFormat, currency, landingPage }
  } = model;
  const zoneNames = momentTZ.tz.names();
  const dispatch = useDispatch();
  const initialValues = useSelector(state => state.account.settings, _.isEqual);
  const subscriptions = useSelector(state => state.subscription.data, _.isEqual);
  const user = useSelector(state => state.account.user);

  return (
    <>
      <Slide direction="right" in mountOnEnter unmountOnExit>
        <Page className={classes.root} title="Teams">
          <Container>
            <Header />
            <Box mt={3}></Box>
            <Formik<InitialValues>
              initialValues={initialValues || defaultInitialValues}
              onSubmit={async values => {
                try {
                  await dispatch(saveSettings(values));
                } catch (error:any) {
                  console.error(error);
                }
              }}
            >
              {({ handleSubmit, isSubmitting }) => (
                <Card>
                  <Form id={formId} onSubmit={handleSubmit}>
                    <CardContent>
                      <Grid container spacing={2}>
                        {false && (
                          <Grid item xs={12}>
                            <Grid container>
                              <Grid item xs={12} sm={6} lg={3}>
                                <Typography component="h3" className={classes.inputTitle}>
                                  Time Zone
                                </Typography>
                                <Field
                                  component={TextField}
                                  label={timeZone.label}
                                  name={timeZone.name}
                                  size="small"
                                  select
                                  fullWidth
                                  variant="outlined"
                                  SelectProps={{
                                    MenuProps: {
                                      anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'left'
                                      },
                                      transitionDuration: 750,
                                      getContentAnchorEl: null,
                                      PaperProps: {
                                        style: {
                                          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
                                        }
                                      }
                                    }
                                  }}
                                  disabled={!subscriptions}
                                >
                                  {zoneNames?.map((name, index) => (
                                    <MenuItem key={index} value={name}>
                                      {momentTZ.tz(name).format('Z')} {name}
                                    </MenuItem>
                                  ))}
                                </Field>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item xs={12} sm={6} lg={3}>
                              <Typography component="h3" className={classes.inputTitle}>
                                Currency
                              </Typography>
                              <Field
                                component={TextField}
                                label={currency.label}
                                name={currency.name}
                                size="small"
                                select
                                fullWidth
                                variant="outlined"
                                disabled={!subscriptions}
                                SelectProps={{
                                  MenuProps: {
                                    anchorOrigin: {
                                      vertical: 'bottom',
                                      horizontal: 'left'
                                    },
                                    transitionDuration: 750,
                                    getContentAnchorEl: null,
                                    PaperProps: {
                                      style: {
                                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
                                      }
                                    }
                                  }
                                }}
                              >
                                {Object.keys(CURRENCY)?.map((curr, index) => (
                                  <MenuItem
                                    key={index}
                                    value={CURRENCY[curr as keyof typeof CURRENCY]}
                                  >
                                    {curr.toUpperCase()} - {CURRENCY[curr as keyof typeof CURRENCY]}
                                  </MenuItem>
                                ))}
                              </Field>
                            </Grid>
                          </Grid>
                        </Grid>
                        {false && (
                          <Grid item xs={12}>
                            <Grid container>
                              <Grid item xs={12} sm={6} lg={3}>
                                <Typography component="h3" className={classes.inputTitle}>
                                  Landing Page
                                </Typography>
                                <Field
                                  component={TextField}
                                  label={landingPage.label}
                                  name={landingPage.name}
                                  size="small"
                                  select
                                  fullWidth
                                  variant="outlined"
                                  disabled={!subscriptions}
                                  SelectProps={{
                                    MenuProps: {
                                      anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'left'
                                      },
                                      transitionDuration: 750,
                                      getContentAnchorEl: null,
                                      PaperProps: {
                                        style: {
                                          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
                                        }
                                      }
                                    }
                                  }}
                                >
                                  {Object.keys(SUBSCRIPTION_ROUTES)
                                    ?.filter(
                                      routes =>
                                        !(
                                          user?.role === AccountType.SWIMMER_OR_PARENT &&
                                          FilterRoutes.includes(routes)
                                        )
                                    )
                                    ?.map((curr, index) => (
                                      <MenuItem
                                        key={index}
                                        value={
                                          SUBSCRIPTION_ROUTES[
                                            curr as keyof typeof SUBSCRIPTION_ROUTES
                                          ]
                                        }
                                      >
                                        {curr}
                                      </MenuItem>
                                    ))}
                                </Field>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item xs={12} sm={6} lg={3}>
                              <Typography component="h3" className={classes.inputTitle}>
                                Date Format
                              </Typography>
                              <Field
                                component={TextField}
                                label={dateFormat.label}
                                name={dateFormat.name}
                                size="small"
                                select
                                fullWidth
                                variant="outlined"
                                disabled={!subscriptions}
                                SelectProps={{
                                  MenuProps: {
                                    anchorOrigin: {
                                      vertical: 'bottom',
                                      horizontal: 'left'
                                    },
                                    transitionDuration: 750,
                                    getContentAnchorEl: null,
                                    PaperProps: {
                                      style: {
                                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
                                      }
                                    }
                                  }
                                }}
                              >
                                {Object.keys(DateFormat)?.map((curr, index) => (
                                  <MenuItem
                                    key={index}
                                    value={DateFormat[curr as keyof typeof DateFormat]}
                                  >
                                    {DateFormat[curr as keyof typeof DateFormat]}
                                  </MenuItem>
                                ))}
                              </Field>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <Box display="flex" justifyContent="flex-end" p={2}>
                      <LoadingButton
                        color="secondary"
                        type="submit"
                        variant="contained"
                        isLoading={isSubmitting}
                        isValid
                        disabled={!subscriptions}
                        progressSize={20}
                        startIcon={<SaveIcon />}
                      >
                        <Typography component="span" className={classes.buttonText}>
                          Save
                        </Typography>
                      </LoadingButton>
                    </Box>
                  </Form>
                </Card>
              )}
            </Formik>
          </Container>
        </Page>
      </Slide>
    </>
  );
};

export default Settings;
