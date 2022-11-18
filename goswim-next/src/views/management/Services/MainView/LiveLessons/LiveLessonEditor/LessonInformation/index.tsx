import { CircularProgress, Grid, TextField as MUITextField } from '@mui/material';
import { Field, useFormikContext } from 'formik';
// import { TextField } from 'formik-material-ui';
// import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SERVICES } from 'src/constants';
import { getServices } from 'src/store/management/service';
import { ComponentProps } from 'src/types';
import { InitialValues, model } from 'src/views/management/Services/MainView/LiveLessons/FormModel';


const LessonInformation: React.FC<ComponentProps> = () => {
  const { data, loading } = useSelector(
    state => ({
      data: state.service.serviceData,
      loading: state.service.isServiceLoading,
      settings: state.account.settings
    }),
    _.isEqual
  );

  const mappedLessonNameData = useMemo(() => data?.map(datum => datum.service_name), [data]); // eslint-disable-line

  const dispatch = useDispatch();

  const {
    formField: { lessonName, lessonDescription, price }
  } = model;
  // unused
  // const maxPrice = Math.round(settings?.serviceMaxPrice) || price.maxValue; 
  const {
    values: { name, cost: valueCost, description: valueDescription },
    touched: { name: touchedName },
    errors: { name: nameError },
    setFieldValue
  } = useFormikContext<InitialValues>();

  useEffect(() => {
    dispatch(getServices(SERVICES.LESSON));
  }, [dispatch]);

  useEffect(() => {
    const { description = '', price_usd: cost = price.defaultValue } = data.find(
      datum => datum.service_name === name
    ) || { description: valueDescription, price_usd: valueCost };
    setFieldValue(lessonDescription.name, description);
    setFieldValue(price.name, Math.round(cost));
  }, [name, setFieldValue]); // eslint-disable-line

  return (
    <>
      <Grid item xs={12} sm={8} lg={6} xl={6}>
        <Field
          name={lessonName.name}
          freeSolo
          fullWidth
          component={Autocomplete}
          options={mappedLessonNameData?.filter(
            datum => name && datum.toLowerCase().startsWith(name.toLowerCase())
          )}
          getOptionLabel={(option: string) => option}
          loading={loading}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <MUITextField
              autoFocus
              fullWidth
              {...params}
              label={lessonName.label}
              variant="outlined"
              error={touchedName && !!nameError}
              helperText={touchedName && nameError}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="secondary" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
                onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                  const value = event.target.value === null ? '' : event.target.value;
                  setFieldValue(lessonName.name, value);
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
          label={lessonDescription.label}
          name={lessonDescription.name}
          variant="outlined"
          rows={4}
        />
      </Grid>
    </>
  );
};

export default LessonInformation;
