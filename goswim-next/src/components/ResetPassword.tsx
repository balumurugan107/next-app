import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminResetUserPassword } from 'src/store/goswim/admin/users';
// import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const useStyles = makeStyles(theme => ({
  errMsg: {
    color: 'red',
    marginTop: theme.spacing(1)
  },
  dialogTitle: {
    fontSize: theme.spacing(2),
    padding: theme.spacing(1.75)
  }
}));
const ResetPassword = ({ open, handleClose, userId }: { open: boolean; handleClose: any; userId ?: string }) => {
  const classes = useStyles();
    const dispatch = useDispatch();
    const { isPasswordReseted } = useSelector(state => state.adminUsers);
  const passwordValidationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6)
      .max(255)
      .required('New Password is required'),
    confirmPassword: Yup.string()
      .min(6)
      .max(255)
      .test('passwords-match', 'Passwords must match', function(value) {
        return this.parent.newPassword === value;
      })
  });

useEffect(() =>{
  if(isPasswordReseted) handleClose();
},[isPasswordReseted])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
    >
      <h2 className={classes.dialogTitle}>Reset Password</h2>
      <Divider />
      <Formik
        initialValues={{
          newPassword: '',
          confirmPassword: ''
        }}
        validationSchema={passwordValidationSchema}
        onSubmit={async values => {
          if(userId) dispatch(adminResetUserPassword(userId,values.confirmPassword));
        }}
      >
        {({ handleSubmit, handleBlur, handleChange, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="New Password"
                    name="newPassword"
                    error={Boolean(touched.newPassword && errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-number"
                    name="confirmPassword"
                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    label="Confirm Password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ my: 0.5, mx: 1 }}>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Reset Password
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ResetPassword;
