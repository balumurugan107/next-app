import React from 'react';
import {
  Button,
  Typography,
  Divider,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Formik } from 'formik';
import { Plans } from 'src/store/goswim/admin/plans/types';
import * as Yup from 'yup';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  formControl: {
    marginRight: theme.spacing(1),
    width: '100%'
  },
  Choosefile: {
    color: 'white',
    background: theme.palette.primary.main
  },
  caution: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  customthumb: {
    margin: '8px 0'
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
    padding: '16px',
    borderBottom: '1px solid #e1e1e1'
  },
  Deletebutton: {
    margin: '10px'
  },
  Editmodal: {
    '& .MuiDialog-paper': {
      margin: '0px !important'
    },
    '@media (max-width: 600px)': {
      '& .MuiDialog-paperScrollPaper': {
        maxHeight: 'calc(100%)',
        borderRadius: '0',
        padding: '0 8px'
      }
    }
  },
  centralDiv: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  filterCard: {
    marginTop: '10px',
    width: 'auto',
    minWidth: '200px',
    backgroundColor: theme.palette.common.white,
    '@media (max-width: 600px)': {
      display: 'block'
    }
  },
  filterCardModal: {
    marginTop: '5px',
    width: 'auto',
    minWidth: '100px',
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(2)
  },
  filtertext: {
    margin: theme.spacing(3),
    fontWeight: 700
  },
  titleContent: {
    width: '100%',
    float: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  filterButton: {
    display: 'none',
    '@media (max-width: 600px)': {
      display: 'block',
      float: 'right'
    }
  },
  filterModal: {
    top: '50%',
    left: '50%',
    '@media (max-width: 600px)': {
      display: 'block'
    }
    // transform: 'translate(-50%, -50%)',
  },
  selectField: {
    height: '50px',
    width: 'auto'
  },
  textField: {
    heigth: '45px !important'
  },
  newLessonWrapper: {
    '& .MuiGrid-item': {
      width: '100%'
    }
  },
  filterTitle: {
    margin: '25px',
    fontWeight: 1000,
    color: theme.palette.text.primary
  },
  titleText: {
    color: theme.palette.text.primary,
    fontSize: '1.25rem',
    fontWeight: 600,
    margin: '8px 0',
    width: '100%'
  },
  subTitle: {
    color: theme.palette.text.primary,
    fontSize: 16,
    fontWeight: 500,
    marginBottom: theme.spacing(0),
    width: '100%'
  },
  scheduleLessonSection: {
    marginTop: 10
  },
  spacingEnd: {
    // padding: '24px',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '0px'
    }
  },
  card: {
    height: '100%',
    '& .quill.makeStyles-root-94.makeStyles-editor-56': {
      height: '100%'
    }
  },
  editor: {
    margin: '8px 0',
    '& .ql-root.ql-editor': {
      height: '100%'
    },
    '& .ql-root': {
      height: '100%'
    },

    '& .ql-editor': {
      height: '360px'
    }
  },
  thumbnail: {
    marginBottom: theme.spacing(1)
  },
  table: {
    '& .MuiTableHead-root': {
      color: theme.palette.text.secondary
    }
  },
  dialogTitle: {
    color: theme.palette.text.primary,
    fontSize: '1.25rem',
    fontWeight: 600
  },

  dialogContent: {
    // padding: '10px 16px !important',
    overflow: 'hidden'
  },
  chooseFileInput: {
    display: 'none'
  },
  chooseFileDiv: {
    marginTop: theme.spacing(2)
  },
  progressCenter: {
    width: 150,
    height: 35,
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  desc: {
    marginTop: theme.spacing(0.5),
    color: theme.palette.text.secondary
  },
  radioWrapper: {
    paddingBottom: '0 !important'
  },
  error: {
    color: 'red',
    marginTop: theme.spacing(1)
  },
  saveBtn: {
    color: theme.palette.common.white
  }
}));

type PropsFunction = (event: any | null) => void;
const EditPlanDialog = (props: {
  open: boolean;
  setOpen: PropsFunction;
  addPlanToggle: string;
  planId?: string;
}) => {
  const classes = useStyles();
  const handleClose = () => props.setOpen(false);

  const Referer = ['goswim', 'usms', 'swimmingworld', 'finis', 'asca', 'custom'];

  const initialValues: Plans = {
    status: 'inactive',
    name: '',
    description: '',
    referer: 'goswim',
    maxNumOfGroups: 10,
    assignsTheRole: 'coach',
    amount: 5,
    interval: 'month',
    trialPeriod: 0
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is Required'),
    description: Yup.string(),
    amount: Yup.number()
      .typeError('The amount must be Number')
      .required('The amount is Required'),
    trialPeriod: Yup.number()
      .min(1, 'minimum one day is selected')
      .typeError('The Trial Period Must be Number of Days')
      .required('Trial Period is Required')
  });

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.Editmodal}
    >
      <div className={classes.top}>
        <Typography variant="h1" id="form-dialog-title" className={classes.dialogTitle}>
          {props.addPlanToggle} Plan
        </Typography>
      </div>
      <Formik<Plans>
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={async () => {
          handleClose();
          // handleSave(values);
        }}
      >
        {({ handleSubmit, handleBlur, handleChange, values, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent className={classes.dialogContent}>
              <Grid container className={classes.newLessonWrapper} spacing={2}>
                <h3 className={classes.titleText}>Plan Details</h3>
                <Grid item xs={12} className={classes.radioWrapper}>
                  <h5 className={classes.subTitle}>Status</h5>
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    value={values.status}
                    className={classes.radioWrapper}
                  >
                    <FormControlLabel
                      value="active"
                      control={<Radio color="primary" />}
                      label="Active"
                    />
                    <FormControlLabel
                      value="inactive"
                      control={<Radio color="primary" />}
                      label="Inactive"
                    />
                  </RadioGroup>
                  <Typography variant="body2" className={classes.desc}>
                    Active Plans are available for users to subcribe, Inactive are not
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.name ? true : false}
                    id="name"
                    label="Name"
                    variant="outlined"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    fullWidth
                    className={classes.textField}
                  />

                  {errors.name && touched.name && (
                    <Typography variant="caption" className={classes.error}>
                      {errors.name}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    fullWidth
                    className={classes.textField}
                  />
                  <Typography variant="body2" className={classes.desc}>
                    Short Description
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="selectReferer">Select Referer</InputLabel>
                    <Select
                      labelId="selectReferer"
                      id="demo-simple-select-outlined"
                      value={values.referer}
                      onChange={event => {
                        setFieldValue('referer', event.target.value);
                      }}
                      label="select Referer"
                    >
                      {Referer?.map(referer => (
                        <MenuItem key={referer} value={referer}>
                          {referer}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography variant="body2" className={classes.desc}>
                    Where will this plan be available? Goswim - on main plans page. Finis/USMS -
                    Affilite plans pages. Custom - availble as one off team plan (not on plans page)
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="maxNumOfGroups"
                    label="Max Num of Groups"
                    variant="outlined"
                    name="maxNumOfGroups"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // value={values.title}
                    fullWidth
                    className={classes.textField}
                  />
                  <Typography variant="body2" className={classes.desc}>
                    User will be able to create up to this many groups
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="assignsTheRole">Assigns the Role</InputLabel>
                    <Select
                      labelId="assignsTheRole"
                      id="assignsTheRoleSelector"
                      value={values.assignsTheRole}
                      onChange={event => {
                        setFieldValue('assignTheRole', event.target.value);
                      }}
                      label="Assign The Role"
                    >
                      <MenuItem value="Subscriber">Subscriber</MenuItem>
                      <MenuItem value="athlete">Athlete</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography variant="body2" className={classes.desc}>
                    The permissions level assigned to a currently paying user subscribing to this
                    plan. <strong>Athlete</strong> - can view all his groups videos.{' '}
                    <strong>Subscriber</strong> can view all videos.
                  </Typography>
                </Grid>
                <h3 className={classes.titleText}>Stripe Options</h3>

                <Grid item xs={12}>
                  <TextField
                    error={errors.amount ? true : false}
                    id="amount"
                    label="Amount"
                    variant="outlined"
                    name="amount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                    fullWidth
                    className={classes.textField}
                  />
                  <Typography variant="body2" className={classes.desc}>
                    The amount in cents to be charged on the interval specified for example "$9.99"
                    should be entered as "999"
                  </Typography>
                  {errors.amount && touched.amount && (
                    <Typography variant="caption" className={classes.error}>
                      {errors.amount}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="interval">Interval</InputLabel>
                    <Select
                      labelId="interval"
                      id="intervalSelector"
                      value={values.interval}
                      onChange={event => {
                        setFieldValue('interval', event.target.value);
                      }}
                      label="Select Interval"
                    >
                      <MenuItem value="month">Month</MenuItem>
                      <MenuItem value="year">Year</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography variant="body2" className={classes.desc}>
                    One of month or year. The frequency with which a subscription should be billed.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.trialPeriod ? true : false}
                    id="trialPeriod"
                    label="Max Trial Period"
                    variant="outlined"
                    name="trialPeriod"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.trialPeriod}
                    fullWidth
                    className={classes.textField}
                  />
                  {errors.trialPeriod && touched.trialPeriod && (
                    <Typography variant="caption" className={classes.error}>
                      {errors.trialPeriod}
                    </Typography>
                  )}
                  <Typography variant="body2" className={classes.desc}>
                    Number of trial period days granted when subscribing a customer to this plan.
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" className={classes.saveBtn}>
                Save
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditPlanDialog;
