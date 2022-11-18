import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  deleteTeam,
  exitFromTeam,
  getTeamHeirarchy,
  getTeamsList
} from 'src/store/management/team';

type PropsFunction = (event: any | null) => void;

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialogTitle-root': {
      minWidth: '247px',
      height: '50px'
    }
  },
  title: {
    fontSize: '0.875rem'
  },
  titleHead: {
    fontSize: '1rem',
    fontWeight: 500
  },
  deleteBtn: {
    color: theme.palette.common.white
  },
  GroupItems: {
    fontSize: '14px',
    padding: '8px 4px',
    margin: theme.spacing(1),
    textTransform: 'capitalize'
  }
}));

const ConfirmGroupExit = (props: {
  open: boolean;
  close: PropsFunction;
  setAnchorEl?: PropsFunction;
  exitGroup: string[];
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const teamsList = useSelector(state => state.team.teamsList);
  const exitTeam = teamsList?.find(item => item._id === props.exitGroup?.[0]);
  let memberId: any = [];
  memberId.push(exitTeam?.member_id);
  const userId = useSelector(state => state.account.user?._id);

  const handleCancel = () => {
    props.close('');
    if (props?.setAnchorEl) props.setAnchorEl(null);
  };

  const handleGroupExit = async () => {
    handleCancel();
    exitTeam?.member_id === userId
      ? await dispatch(deleteTeam({ ids: props.exitGroup }))
      : await dispatch(exitFromTeam({ teamIds: [props.exitGroup[0]] }));
    await dispatch(getTeamHeirarchy());
    await dispatch(getTeamsList());
  };

  const isGroupAdmin = memberId[0] === userId;
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={props.open}
      onClose={props.close}
      className={classes.root}
    >
      <DialogTitle id="confirmation-dialog-title">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography className={classes.titleHead}>
            {isGroupAdmin ? 'Delete Group' : 'Leave Group'}
          </Typography>
          {isGroupAdmin && exitTeam?.membersCount && exitTeam?.membersCount > 1 && (
            <Chip
              className={classes.GroupItems}
              color="error"
              label={`${exitTeam?.membersCount - 1} members`}
              variant="outlined"
            />
          )}
        </div>
      </DialogTitle>
      <DialogContent style={{ marginTop: '24px' }}>
        <Typography className={classes.title}>
          {isGroupAdmin
            ? 'Are you sure to delete the group?'
            : 'Are you sure to exit from the group?'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleGroupExit}
          color="primary"
          size="small"
          className={classes.deleteBtn}
        >
          {isGroupAdmin ? 'Delete Group' : 'Exit Group'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmGroupExit;
