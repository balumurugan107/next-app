import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  colors,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ApplicationThemes } from '@mui/material/styles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { Formik } from 'formik';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Save as SaveIcon } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'src/components/Avatar';
import LoadingButton from 'src/components/LoadingButton';
import TooltipComponent from 'src/components/Tooltip';
import { ColourCode, RemoveProfilePicture } from 'src/constants';
import {
  createTeam,
  getMemberGroups,
  getTeamsList,
  TeamDocument,
  updateTeam,
  UpdateTeamData
} from 'src/store/management/team';
import { ComponentProps } from 'src/types';
import * as Yup from 'yup';

export type FormType = 'create' | 'edit' | 'view';

interface FormProps {
  type: FormType;
  team?: TeamDocument;
  title?: string;
  isInfoView?: boolean;
}

export interface InitialValues {
  name: string;
  city?: string;
  zipcode?: string;
  state?: string;
  country?: string;
  description?: string;
  brand_theme?: keyof ApplicationThemes;
  brand_logo?: {
    data?: File | string;
    touched: boolean;
  };
}

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none'
  },
  avatar: {
    height: 100,
    width: 100,
    cursor: 'pointer',
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 11px 20px -8px rgba(0,0,0,0.50)',
    borderColor: '#cccccc',
    borderWidth: '2px',
    borderStyle: 'solid'
  },
  minusIcon: {
    fontSize: 22,
    color: theme.palette.error.main,
    backgroundColor: colors.common.white,
    position: 'relative',
    right: -30,
    top: 20,
    zIndex: 9,
    borderRadius: 4,
    cursor: 'pointer'
  },
  iconButtonParent: {
    float: 'left',
    display: 'block',
    textAlign: 'center'
  },
  colorPaletteBox: {
    width: '48px',
    height: '48px',
    color: theme.palette.common.white,
    margin: '10px 10px 20px 0',
    cursor: 'pointer',
    boxShadow: theme.shadows[16],

    '&:hover': {
      boxShadow: 0
    },
    '&:nth-child(1)': {
      backgroundColor: ColourCode.FANDANGO
    },
    '&:nth-child(2)': {
      backgroundColor: ColourCode.MAX_BLUE_PURPLE
    },
    '&:nth-child(3)': {
      backgroundColor: ColourCode.HEAT_WAVE
    },
    '&:nth-child(4)': {
      backgroundColor: ColourCode.TURQUOISE
    },
    '&:nth-child(5)': {
      backgroundColor: ColourCode.SUNGLOW
    },
    '&:nth-child(6)': {
      backgroundColor: ColourCode.SAPPHIRE_BLUE
    },
    '&:nth-child(7)': {
      backgroundColor: ColourCode.VIVID_SKY_BLUE
    },
    '&:nth-child(8)': {
      backgroundColor: ColourCode.PARADISE_PINK
    },
    '&:nth-child(9)': {
      backgroundColor: ColourCode.PAOLO_VERONESE
    },
    '&:nth-child(10)': {
      backgroundColor: ColourCode.BLEU_DE_FRANCE
    },
    '&:nth-child(11)': {
      backgroundColor: ColourCode.CYAN_PROCESS
    },
    '&:nth-child(12)': {
      backgroundColor: ColourCode.AMETHYST
    }
  },
  mt: {
    marginTop: 16,
    [theme.breakpoints.up('md')]: {
      maxWidth: '70%'
    }
  },
  buttonText: { fontWeight: 500 },

  formRoot: {
    paddingBottom: theme.spacing(3),
    '& .MuiFormLabel-root.Mui-disabled': {
      color: theme.palette.text.secondary
    }
  },
  cardTitle: {
    fontSize: 18,
    margin: theme.spacing(1.5),
    marginBottom: 0
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid #e1e1e1'
  },
  titleText: {
    color: theme.palette.text.primary,
    fontSize: '1.25rem',
  }
}));

const Form: React.FC<ComponentProps & FormProps> = ({
  className,
  type,
  team,
  title,
  isInfoView = false,
  ...rest
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [brandLogo, setBrandLogo] = useState<string | ArrayBuffer | null | undefined>(
    team?.brand_logo_url
  );
  const [addFields, setAddFields] = useState(false);
  const [submit, setSubmit] = useState(false);
  const scrollBarRef = useRef<HTMLElement | null>(null);

  const { isLoading, user } = useSelector(state => ({
    isLoading: state.team.isLoading,
    error: state.team.error,
    message: state.team.message,
    user: state.account.user || null
  }));

  useEffect(() => {
    scrollBarRef.current?.focus();
  }, [scrollBarRef]);

  const initialValues: InitialValues = useMemo(() => {
    return {
      name: team?.name || '',
      description: team?.description || '',
      city: team?.city || '',
      state: team?.state || '',
      country: team?.country || '',
      zipcode: team?.zipcode || '',
      brand_theme: team?.brand_theme,
      brand_logo: { data: team?.brand_logo, touched: false } || ''
    };
  }, [team]);


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .max(100)
          .required('Team Name is required'),
        description: Yup.string()
          // .min(50)
          // .max(255)
          .required('Description is required'),
        city: Yup.string().max(255),
        zipcode: Yup.string().max(255),
        state: Yup.string().max(255),
        country: Yup.string().max(255),
        brand_theme: Yup.string().max(255),
        brand_logo: Yup.object().shape({
          data: Yup.mixed(),
          touched: Yup.boolean().default(false)
        })
      })}
      onSubmit={async values => {
        let updatedValues: UpdateTeamData;
        switch (values.brand_logo?.touched) {
          case true:
            updatedValues = {
              ...values,
              brand_logo: values.brand_logo.data
            };
            break;

          default:
            updatedValues = {
              ...values
            };
            delete updatedValues.brand_logo;
            break;
        }
        updatedValues = {
          ...updatedValues,
          member_id: team?.member_id ? team.member_id : user?._id
        };
        const payload = (type === 'edit' && team?._id) || ``;
        const saveTeam = type === 'create' ? createTeam : updateTeam;
        setSubmit(!submit);
        await dispatch(saveTeam({ values: updatedValues }, payload));
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        touched,
        values,
        isValid
      }) => (
        <form onSubmit={handleSubmit} {...rest} className={classes.formRoot}>
          <Card className={classes.mt}>
            <CardHeader title={title || 'Add Group'} />
            <Divider />
            <CardContent>
              <Grid container spacing={3} {...rest}>
                <Grid item lg={12} md={12} xl={12} xs={12}>
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                      flexDirection="column"
                      textAlign="center"
                    >
                      {!isInfoView && brandLogo && brandLogo !== RemoveProfilePicture.REMOVE && (
                        <TooltipComponent title="Remove image">
                          <IndeterminateCheckBoxIcon
                            className={classes.minusIcon}
                            onClick={() => {
                              setBrandLogo(RemoveProfilePicture.REMOVE);
                              setFieldValue('brand_logo', {
                                data: '',
                                touched: true
                              });
                            }}
                          />
                        </TooltipComponent>
                      )}
                      {!isInfoView && (
                        <input
                          accept="image/.jpeg,.jpg,.png"
                          name="brand_logo"
                          className={classes.input}
                          onChange={event => {
                            const target = event.currentTarget;

                            setFieldValue('brand_logo', {
                              data: target.files?.item(0),
                              touched: true
                            });
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setBrandLogo(reader.result);
                            };

                            if (target.files?.item(0)) {
                              reader.readAsDataURL(target.files?.item(0) as Blob);
                            }
                          }}
                          id="contained-button-file"
                          type="file"
                        />
                      )}
                      {!isInfoView ? (
                        <TooltipComponent title="Choose Group Logo">
                          <label htmlFor="contained-button-file">
                            <Avatar
                              type="cam"
                              variant="circle"
                              canEdit={!isInfoView}
                              className={classes.avatar}
                              srcSet={brandLogo}
                            />
                          </label>
                        </TooltipComponent>
                      ) : (
                        <label htmlFor="contained-button-file">
                          <Avatar
                            type="cam"
                            variant="circle"
                            canEdit={!isInfoView}
                            className={classes.avatar}
                            srcSet={brandLogo}
                          />
                        </label>
                      )}
                    </Box>
                  </CardContent>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item lg={12} md={12} xs={12}>
                      <TextField
                        inputRef={scrollBarRef}
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        label={`Name${isInfoView ? ' ' : ' *'}`}
                        name="team"
                        onBlur={handleBlur}
                        onChange={event => {
                          const { value } = event.target;
                          setFieldValue('name', value);
                        }}
                        value={values.name}
                        variant="outlined"
                        disabled={isInfoView}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.description && errors.description)}
                        fullWidth
                        multiline
                        rows={3}
                        helperText={touched.description && errors.description}
                        label="Description*"
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        variant="outlined"
                        disabled={isInfoView}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Collapse in={addFields} timeout={500}>
                        <Grid item xs={12}>
                          <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(touched.city && errors.city)}
                                fullWidth
                                helperText={touched.city && errors.city}
                                label="City"
                                name="city"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.city}
                                variant="outlined"
                                disabled={isInfoView}
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(touched.state && errors.state)}
                                fullWidth
                                helperText={touched.state && errors.state}
                                label="State"
                                name="state"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.state}
                                variant="outlined"
                                disabled={isInfoView}
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(touched.country && errors.country)}
                                fullWidth
                                helperText={touched.country && errors.country}
                                label="Country"
                                name="country"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.country}
                                variant="outlined"
                                disabled={isInfoView}
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(touched.zipcode && errors.zipcode)}
                                fullWidth
                                helperText={touched.zipcode && errors.zipcode}
                                label="Zipcode"
                                name="zipcode"
                                onBlur={handleBlur}
                                onChange={event => {
                                  const { value } = event.target;
                                  if (+value || !value) {
                                    setFieldValue('zipcode', value);
                                  }
                                }}
                                value={values.zipcode}
                                variant="outlined"
                                disabled={isInfoView}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Collapse>
                    </Grid>
                  </Grid>

                  <Box display="flex" justifyContent="center" width="100%">
                    {!addFields ? (
                      <TooltipComponent title="show more fields">
                        <IconButton color="secondary" onClick={() => setAddFields(true)} size="large">
                          <ExpandMoreIcon fontSize="large" />
                        </IconButton>
                      </TooltipComponent>
                    ) : (
                      <TooltipComponent title="hide">
                        <IconButton color="secondary" onClick={() => setAddFields(false)} size="large">
                          <ExpandLessIcon fontSize="large" />
                        </IconButton>
                      </TooltipComponent>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>

            {!isInfoView && (
              <>
                <Divider />
                <Box p={2} display="flex" justifyContent="flex-end">
                  <LoadingButton
                    color="secondary"
                    type="submit"
                    variant="contained"
                    isLoading={isLoading}
                    isValid={isValid}
                    progressSize={20}
                    startIcon={<SaveIcon />}
                  >
                    <Typography component="span" className={classes.buttonText}>
                      Save
                    </Typography>
                  </LoadingButton>
                </Box>
              </>
            )}
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default Form;
