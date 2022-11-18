import React, { useMemo, useState, useEffect } from 'react';
import { Theme, ApplicationThemes } from '@mui/material/styles';
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import { Dialog, Box, colors, Typography, IconButton, Grid, TextField } from '@mui/material';
import TooltipComponent from 'src/components/Tooltip';
import {
  createTeam,
  getTeamHeirarchy,
  getTeamsList,
  TeamDocument,
  updateTeam,
  UpdateTeamData,
  uploadTeamImgToS3Bucket
} from 'src/store/management/team';
import { RemoveProfilePicture } from 'src/constants';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from 'src/components/Avatar';
import { rest } from 'lodash';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from 'src/components/LoadingButton';
export type FormType = 'create' | 'edit' | 'view';
const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    }
  });
export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);
export interface GetScheduleProps {
  type: FormType;
  openDialog: boolean;
  closeDialog: (boolean: Boolean) => void;
  team?: TeamDocument;
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
  gridSpacing: {
    marginTop: theme.spacing(2)
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
  titleText: { fontWeight: 500 },
  buttonText: {
    fontWeight: 500,
    color: theme.palette.primary.main
  },
  formRoot: {
    '& .MuiDialogTitle-root': {
      fontSize: theme.spacing(1.75),
      fontWeight: 500,
      padding: theme.spacing(0)
    },
    '& .MuiFormLabel-root.Mui-disabled': {
      color: theme.palette.text.secondary
    }
  },
  saveBtn: {
    color: theme.palette.common.white
  },
  loadingButton: {
    float: 'right',
    maxHeight: '35px'
  },
  closeButton: {
    right: 0,
    top: 0,
    color: theme.palette.grey[500],
    padding: 0
  },
  titleWithAction: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2)
  }
}));
export default function AddGroupDialog(props: GetScheduleProps) {
  const dispatch = useDispatch();
  const { type, openDialog, team, closeDialog } = props;
  const teamLogo = team?.brand_logo_url ? team.brand_logo_url : null;
  const [brandLogo, setBrandLogo] = useState<string | ArrayBuffer | null>(teamLogo);
  const [submit, setSubmit] = useState(false);
  const ModalType = type === 'create' ? 'Add' : type === 'edit' ? 'Edit' : 'View';
  const [logoUploadedTimestamp, setLogoUploadedTimeStamp] = useState<number>();
  const { isLoading, user } = useSelector(state => ({
    isLoading: state.team.isLoading,
    error: state.team.error,
    message: state.team.message,
    user: state.account.user || null
  }));
  useEffect(() => {
    setBrandLogo(teamLogo);
  }, [openDialog]);
  const classes = useStyles();
  const handleClose = (isSuccess: Boolean) => {
    closeDialog(isSuccess);
  };
  const initialValues: InitialValues = useMemo(() => {
    return {
      name: team?.name || '',
      description: team?.description || '',
      city: team?.city || '',
      state: team?.state || '',
      country: team?.country || '',
      zipcode: team?.zipcode || '',
      brand_theme: team?.brand_theme,
      brand_logo: { data: team?.brand_logo, touched: false } || '',
      img_uploaded_timestamp: 0
    };
  }, [team]);
  return (
    <Dialog
      onClose={() => handleClose(false)}
      aria-labelledby="customized-dialog-title"
      open={openDialog}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .max(100)
            .required('Team Name is required'),
          description: Yup.string()
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
          let upadatedBrandLogo;
          if (typeof values?.brand_logo?.data === 'object') {
            upadatedBrandLogo = values.brand_logo?.data?.name;
          } else if (typeof brandLogo === 'string' && brandLogo === 'remove') {
            upadatedBrandLogo = '';
          } else if (typeof brandLogo === 'string' && brandLogo?.length > 0) {
            upadatedBrandLogo = null;
          }
          switch (values.brand_logo?.touched && typeof values.brand_logo.data === 'object') {
            case true:
              updatedValues = {
                ...values,
                brand_logo: upadatedBrandLogo
              };
              break;
            default:
              updatedValues = {
                ...values,
                brand_logo: upadatedBrandLogo
              };
              break;
          }
          updatedValues = {
            ...updatedValues,
            member_id: team?.member_id ? team.member_id : user?._id,
            img_uploaded_timestamp: logoUploadedTimestamp
          };
          const payload = (type === 'edit' && team?._id) || ``;
          const saveTeam = type === 'create' ? createTeam : updateTeam;
          setSubmit(!submit);

          await dispatch(saveTeam({ values: updatedValues }, payload));
          await dispatch(getTeamHeirarchy());
          await dispatch(getTeamsList());
          handleClose(true);
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
            <Box className={classes.titleWithAction}>
              <MuiDialogTitle>{ModalType} Group</MuiDialogTitle>
              <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={() => handleClose(false)}
                size="large"
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <DialogContent dividers>
              <Box display="flex" alignItems="center" flexDirection="column" textAlign="center">
                {brandLogo && brandLogo !== RemoveProfilePicture.REMOVE && type !== 'view' && (
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
                <input
                  accept="image/.jpeg,.jpg,.png"
                  name="brand_logo"
                  className={classes.input}
                  disabled={type === 'view'}
                  onChange={event => {
                    const target = event.currentTarget;
                    const uploadedTimestamp = new Date().valueOf();
                    setLogoUploadedTimeStamp(uploadedTimestamp);
                    if (target?.files?.item(0))
                      window.Buffer = window.Buffer || require('buffer').Buffer;
                    dispatch(uploadTeamImgToS3Bucket(target.files!.item(0), uploadedTimestamp));
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
                {type === 'view' ? (
                  <label htmlFor="contained-button-file">
                    <Avatar
                      type="camview"
                      variant="circle"
                      canEdit={false}
                      className={classes.avatar}
                      srcSet={brandLogo}
                    />
                  </label>
                ) : (
                  <TooltipComponent title="Choose Group Logo">
                    <label htmlFor="contained-button-file">
                      <Avatar
                        type="cam"
                        variant="circle"
                        canEdit={true}
                        className={classes.avatar}
                        srcSet={brandLogo}
                      />
                    </label>
                  </TooltipComponent>
                )}
              </Box>
              <Grid container spacing={3} className={classes.gridSpacing}>
                <Grid item lg={12} md={12} xs={12}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label={`Name *`}
                    name="team"
                    disabled={type === 'view'}
                    onBlur={handleBlur}
                    onChange={event => {
                      const { value } = event.target;
                      setFieldValue('name', value);
                    }}
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(touched.description && errors.description)}
                    fullWidth
                    multiline
                    rows={3}
                    disabled={type === 'view'}
                    helperText={touched.description && errors.description}
                    label="Description*"
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            {type !== 'view' && (
              <DialogActions>
                <LoadingButton
                  color="secondary"
                  type="submit"
                  variant="contained"
                  isLoading={isLoading}
                  isValid={isValid}
                  progressSize={20}
                  size="small"
                  className={classes.loadingButton}
                  autoFocus
                >
                  <Typography component="span" className={classes.saveBtn}>
                    Save
                  </Typography>
                </LoadingButton>
              </DialogActions>
            )}
          </form>
        )}
      </Formik>
    </Dialog>
  );
}
