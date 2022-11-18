import React from 'react';

import { Button, DialogActions, DialogContent, DialogTitle, Typography, Dialog } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from 'src/components/LoadingButton';
import { makeStyles } from '@mui/styles';
import { FormType, InitialValues, UpdatedValues } from './Form';
import { AccountType } from 'src/constants';
import { createMember, updateMember } from 'src/store/management/members';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  deleteVideo: {
    color: theme.palette.primary.dark
  },
  root: {
    '& .MuiDialogTitle-root': {
      minWidth: '247px',
      height: '60px'
    }
  },
  title: {
    fontSize: '16px'
  },
  deleteBtn: {
    color: theme.palette.common.white,
    padding: theme.spacing(1)
  },
  loadingBtn:{
      padding: 0
  }
}));
type PropsFunction = (event: boolean) => void;
const ConfirmRoleChangeModal = (props: { open: boolean,setOpen: PropsFunction,values : InitialValues,formType: FormType}) => {
  const classes = useStyles();
  const {values,formType} = props;
  const dispatch = useDispatch();
  const {member,isLoading} = useSelector(state => state.members);
  const user = useSelector(state => state.account.user);
  const history = useRouter();

  const handleCancel = () => {
    props.setOpen(false);
  };
  const acceptRoleChange = () => {
    let teamsID: any =
          values?.team && values?.team?.length > 0 && values.team.map((team) => team?._id);
        if (member?.team && values.team?.length) {
          values.team = [...new Set([...teamsID, ...member.team])];
        } else if (teamsID === false && member?.team) {
          values.team = [...member.team];
        } else if (teamsID) {
          values.team = [...new Set([...teamsID])];
        }
        if (user?.role === AccountType.COACH) delete values.role;
        const initialValue: InitialValues = {
          ...values
        };

        if (values.secondary_email && values.secondary_email.trim().length > 0) {
          initialValue.isAgeEligible = false;
        } else {
          initialValue.isAgeEligible = true;
        }

        delete initialValue.roster_group;

        const updatedValues: UpdatedValues = {
          ...initialValue,
          roster_group: []
        };

        const payload = (formType === 'edit' && member?._id) || ``;
        const teams = values?.team?.map((team: any) => team);

        if (formType === 'create' && user?.full_name && teams) {
          dispatch(createMember({ values: updatedValues, history }, teams, user.full_name));
        }
        if (formType === 'edit') {
          dispatch(updateMember({ values: updatedValues, history }, payload));
        }
        }
  return (
    <Dialog
      maxWidth="xs"
      //onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={props.open}
      className={classes.root}
      //{...other}
    >
        <DialogTitle id="confirmation-dialog-title">
     <Typography className={classes.title} variant='h3'>Role Change Confirmation</Typography>
     </DialogTitle>
     <DialogContent id="confirmation-dialog-content">
        <Typography className={classes.title}>Do you want to change the role from {member?.role} to {values.role}?</Typography>
    </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          No
        </Button>
        <LoadingButton
              color="primary"
              type="submit"
              variant="contained"
              isLoading={isLoading}
              isValid={true}
              progressSize={20}
              onClick={acceptRoleChange}
              className={classes.loadingBtn}
            >
              <Typography className={classes.deleteBtn}>
                Yes
              </Typography>
            </LoadingButton>
      </DialogActions>
    </Dialog>
  );
  };

export default ConfirmRoleChangeModal;
