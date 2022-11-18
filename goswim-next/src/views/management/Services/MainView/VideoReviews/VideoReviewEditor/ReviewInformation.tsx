import React, { useEffect, useMemo } from 'react';
import {
  Grid,
  Typography,
  Slider,
  Box,
  InputAdornment,
  TextField as MUITextField,
  CircularProgress,
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useFormikContext, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { getServices, setServiceData } from 'src/store/management/service';
import { model, EditorData } from 'src/views/management/Services/MainView/VideoReviews/FormModel';
import { useCommonStyles } from 'src/styles/common';
import { currency_symbols, SERVICES } from 'src/constants';
import { ComponentProps } from 'src/types';

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'default',
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      }
    },
    minHeight: '100%',
    paddingBottom: theme.spacing(3)
  },
  ph: {
    padding: '0px 20px 20px',
    [theme.breakpoints.down('sm')]: { padding: '0px 8px 8px' }
  },
  title:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1.25rem',
    color: theme.palette.text.primary,
    fontWeight: 500
  },
  cost:{
    fontSize: 18,
    marginLeft:15,
    marginTop: 32,
    width: 100,
    [theme.breakpoints.down('sm')]: { width: 'unset' },
    float: 'right',
    fontWeight: 800,
    '& .MuiInputAdornment-positionStart': {
      marginRight: 0
    }
  },
  priceSlider:{
    marginTop: theme.spacing(3),
    width: '85%'
  },
  priceTitle:{
    marginBottom: theme.spacing(2)
  },
  currency:{
      padding : theme.spacing(1),
      fontWeight: 'bold'
  }
}));

const ReviewInformation: React.FC<ComponentProps> = () => {
  const commonClasses = useCommonStyles();

  const classes = useStyles();

  const { data, loading, settings, currency } = useSelector(
    state => ({
      data: state.service.serviceData,
      loading: state.service.isServiceLoading,
      settings: state.account.settings,
      currency: state.subscription.productData[0].price.currency
    }),
    _.isEqual
  );

  const mappedReviewNameData = useMemo(() => data?.map(datum => datum.service_name), [data]); // eslint-disable-line

  const dispatch = useDispatch();

  const { values, setFieldValue, touched, errors } = useFormikContext<EditorData>();
  const {
    formField: { vrName: reviewName, vrDescription: reviewDescription, cost: price }
  } = model;
  // const maxPrice = Math.round(settings?.serviceMaxPrice) || price.maxValue;
  const maxPrice = 3000;
  
  useEffect(() => {
    dispatch(getServices(SERVICES.REVIEW));
    return () => {
      dispatch(setServiceData([]));
    };
  }, [dispatch]);

  useEffect(() => {
    const foundData = data.find(datum => datum.service_name === values.vrName);
    if (foundData) {
      setFieldValue(reviewDescription.name, foundData.description);
      setFieldValue(price.name, Math.round(foundData.price_usd));
    }
  }, [values.vrName, setFieldValue]); // eslint-disable-line

  return (
    <>
      <Grid item xs={12} sm={8} lg={6} xl={4}>
        <Field
          name={reviewName.name}
          freeSolo
          fullWidth
          component={Autocomplete}
          options={mappedReviewNameData?.filter(
            datum => values.vrName && datum.toLowerCase().startsWith(values.vrName.toLowerCase())
          )}
          getOptionLabel={(option: string) => option}
          loading={loading}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <MUITextField
              autoFocus
              // fullWidth
              {...params}
              label={reviewName.label}
              variant="outlined"
              error={touched.vrName && !!errors.vrName}
              helperText={touched.vrName && errors.vrName}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && <CircularProgress color="secondary" size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
                onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(reviewName.name, event.target.value);
                }
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          component={TextField}
          fullWidth
          multiline
          variant="outlined"
          rows={4}
          name={reviewDescription.name}
          label={reviewDescription.label}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9} md={10} xl={10}>
            <Box>
              <Typography id="discrete-slider" gutterBottom className={classes.priceTitle}>
                Price
              </Typography>
              <Slider
                aria-labelledby="discrete-slider"
                valueLabelDisplay="on"
                defaultValue={price.defaultValue}
                onChange={(_1, number) => {
                  setFieldValue(price.name, number);
                }}
                min={price.minValue}
                // min={0}
                max={maxPrice}
                value={values.cost < maxPrice ? Math.round(values.cost) : Math.round(maxPrice)}
                className={classes.priceSlider}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={3} md={2} xl={2}>
            <Box>
              <Field
                component={TextField}
                className={classes.cost}
                name={price.name}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    settings && <InputAdornment position="start"><div className={classes.currency}>{currency_symbols[currency]}</div></InputAdornment>
                  ),
                  classes: { input: commonClasses.inputResize }
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewInformation;
