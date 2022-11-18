import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tooltip,
  Zoom,
  IconButton,
  CardHeader,
  LinearProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import clsx from 'clsx';
import moment from 'moment';
import { CreateEditEventProps } from 'src/views/calendar/CreateEditEvent';
import CancelIcon from '@mui/icons-material/Cancel';
import _ from 'lodash';
import Avatar from 'src/components/Avatar';
import { WorkoutSummarizedDetails, markAttendance } from 'src/store/workout';
import Label from 'src/components/Label';
import { useCommonStyles } from 'src/styles/common';
import CoachNotes from 'src/views/calendar/CreateEditEvent/CoachNotes';
import { ServiceName } from 'src/constants';
export interface SetsCreateEditView extends CreateEditEventProps {
  isLoading: boolean;
  isRoleCoach: boolean;
}

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'default',
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      }
    }
  },
  subContent: {
    fontWeight: 400
  },
  roster: {
    marginTop: 4,
    fontWeight: 800
  },
  iconDate: {
    marginRight: 5,
    marginLeft: -5,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      float: 'left'
    }
  },
  header: {
    fontWeight: 800,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 0,
    paddingTop: 8,
    [theme.breakpoints.down('sm')]: { display: 'block' }
  },
  content: {
    padding: 24,
    paddingTop: 0
  },
  table: {
    maxHeight: 230,
    marginTop: 10
  },
  to: {
    marginRight: 6,
    marginLeft: 6
  },
  markAsCompleted: {
    padding: 13
  },
  markAsCompletedIcon: {
    marginLeft: 4,
    marginBottom: -4
  },
  avatarImg: {
    paddingRight: 0,
    width: 70
  },
  swimmerCell: {
    wordBreak: 'break-all',
    maxWidth: 250
  },
  swimmerName: {
    paddingLeft: 0,
    minWidth: 200
  },
  tableCell: {
    minWidth: 140
  }
}));

const WorkoutView: React.FC<SetsCreateEditView> = ({
  onCancel,
  setEvent,
  isLoading,
  isRoleCoach,
  onDelete,
  onEdit,
  onView,
  scheduleDispatchOverview
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const overviewData = useSelector(state => state.scheduleOverview.data, _.isEqual);
  const overviewLoading = useSelector(state => state.scheduleOverview.isLoading);
  const settings = useSelector(state => state.account.settings);
  const filteredWorkout =
    overviewData &&
    overviewData.workouts &&
    overviewData.workouts.find(workout => workout._id === setEvent);
  const assignedMembersList = filteredWorkout?.members || [];
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const enableBulkOperations = selectedMembers.length > 0;
  const selectedSomeMembers =
    selectedMembers.length > 0 && selectedMembers.length < assignedMembersList.length;
  const selectedAllProducts = selectedMembers.length ? true : false;
  const isDisabledMarkAsCompleted = selectedMembers.length ? false : true;
  const handleSelectAllMembers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedMembers = event.target.checked
      ? assignedMembersList
          ?.filter(member => member.execution_status !== 'completed')
          ?.map(member => member._id)
      : [];
    setSelectedMembers(selectedMembers);
  };
  const handleSelectMember = (_event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (!selectedMembers.includes(id)) {
      setSelectedMembers([...selectedMembers, id]);
    } else {
      setSelectedMembers(selectedMembers?.filter(_id => _id !== id));
    }
  };
  const handleMarkAttendance = () => {
    filteredWorkout?.scheduled_workout_id &&
      dispatch(
        markAttendance({
          scheduled_workouts_id: filteredWorkout?.scheduled_workout_id,
          swimmer_ids: selectedMembers
        })
      );
    scheduleDispatchOverview();
  };
  const MemberData: React.SFC<{
    data: WorkoutSummarizedDetails;
  }> = member => {
    const isMemberSelected = selectedMembers.includes(member.data._id);
    const isStatusCompleted = member.data.execution_status === 'completed';
    return (
      <TableRow key={member.data._id}>
        {isRoleCoach && (
          <TableCell padding="checkbox">
            <Checkbox
              checked={isMemberSelected}
              value={isMemberSelected}
              onChange={event => handleSelectMember(event, member.data._id)}
              disabled={isStatusCompleted}
            />
          </TableCell>
        )}
        <TableCell component="th" scope="row" className={classes.avatarImg}>
          <Avatar variant="circular" srcSet={member.data.profile_picture_url} />
        </TableCell>
        <TableCell className={classes.swimmerName}>
          <Box className={classes.swimmerCell}>
            <Typography variant="body1" color="textPrimary" component="span">
              {member.data.full_name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {member.data.email}
            </Typography>
            {isStatusCompleted && <Label color="success">{'Completed'} </Label>}
          </Box>
        </TableCell>
        <TableCell className={classes.tableCell}>{member.data.teams}</TableCell>
        <TableCell className={classes.tableCell}>
          {member?.data?.roster_group &&
            member.data.roster_group?.length > 0 &&
            member.data.roster_group?.map((roster, index) => {
              return (
                <div key={index}>
                  {roster}
                  <br />
                </div>
              );
            })}
        </TableCell>
        {isRoleCoach && (
          <TableCell>
            {filteredWorkout?.scheduled_workout_id && (
              <CoachNotes
                {...{
                  swimmer_id: member.data._id,
                  service_id: filteredWorkout.scheduled_workout_id,
                  swimmer_notes: member.data.swimmer_notes,
                  serviceType: ServiceName.WORKOUTS,
                  dispatchOverview: scheduleDispatchOverview
                }}
              />
            )}
          </TableCell>
        )}
      </TableRow>
    );
  };

  const TableFormat: React.SFC<{
    data: WorkoutSummarizedDetails[];
  }> = members => {
    return (
      <TableContainer className={classes.table}>
        <Table aria-label="simple table" className={classes.root} stickyHeader>
          <TableHead>
            <TableRow>
              {!enableBulkOperations ? (
                <>
                  {isRoleCoach && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedAllProducts}
                        indeterminate={selectedSomeMembers}
                        onChange={handleSelectAllMembers}
                      />
                    </TableCell>
                  )}
                  <TableCell colSpan={2}>Swimmer Name</TableCell>
                  <TableCell>Team</TableCell>
                  <TableCell>Roster</TableCell>
                  {isRoleCoach && <TableCell>Notes</TableCell>}
                </>
              ) : (
                <>
                  {isRoleCoach && (
                    <>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedAllProducts}
                          indeterminate={selectedSomeMembers}
                          onChange={handleSelectAllMembers}
                        />
                      </TableCell>
                      <TableCell colSpan={5} className={classes.markAsCompleted}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={handleMarkAttendance}
                          disabled={isDisabledMarkAsCompleted}
                        >
                          Mark as Completed
                        </Button>
                      </TableCell>
                    </>
                  )}
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {members?.data &&
              members?.data?.map(member => <MemberData key={member._id} data={member} />)}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return <>
    <Card className={clsx(classes.root, commonClasses.modalBodyScroll)}>
      <CardHeader
        title={
          <Typography component="h4" variant="h4" color="primary">
            {filteredWorkout?.workout_name || ''}
          </Typography>
        }
        className={classes.header}
        action={
          <Box mt={1.25} display="flex" justifyContent="flex-end">
            {isRoleCoach && (
              <Tooltip TransitionComponent={Zoom} title="Edit">
                <IconButton color="secondary" onClick={onEdit} size="large">
                  <EditOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
            {isRoleCoach && (
              <Tooltip TransitionComponent={Zoom} title="Delete">
                <IconButton color="secondary" onClick={onDelete} size="large">
                  <DeleteOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
            {isRoleCoach && (
              <Tooltip TransitionComponent={Zoom} title="View">
                <IconButton color="secondary" onClick={onView} size="large">
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip TransitionComponent={Zoom} title="Close">
              <IconButton aria-label="clear" onClick={onCancel} size="large">
                <CancelIcon fontSize="large" className={commonClasses.cancelColor} />
              </IconButton>
            </Tooltip>
          </Box>
        }
      />
      <CardContent className={classes.content}>
        <Box mt={2} display={mobile ? 'block' : 'flex'} alignItems="center">
          <pre>
          <Typography className={clsx(commonClasses.desc, classes.subContent)}>
            {filteredWorkout?.workout_text || ''}
          </Typography>
          </pre>
        </Box>
        <Box mt={2} display={mobile ? 'block' : 'flex'} alignItems="center">
          <Typography component="span" className={classes.roster}>
            {filteredWorkout?.team || ''}
          </Typography>
          <Typography component="span" className={commonClasses.separator} />
          <Typography component="span" className={classes.roster}>
            {(filteredWorkout?.sets_roster_group &&
              filteredWorkout?.sets_roster_group.join(', ')) ||
              ''}
          </Typography>
        </Box>
        <Box mt={2} display={mobile ? 'block' : 'flex'} alignItems="center">
          <EventNoteIcon color="secondary" className={classes.iconDate} />
          <Typography component="span" className={commonClasses.subHeader}>
            {`${
              filteredWorkout?.scheduled_datetime
                ? moment(filteredWorkout?.scheduled_datetime).format(settings.dateFormat)
                : ''
            }`}
          </Typography>
        </Box>
        {filteredWorkout?.members && filteredWorkout?.members.length > 0 && (
          <Box mt={3}>
            {(overviewLoading && <LinearProgress />) || (
              <Card>
                <Box mt={3} ml={1}>
                  {isRoleCoach && (
                    <>
                      <Typography component="span" className={commonClasses.subHeader}>
                        Assigned To ({filteredWorkout.members.length})
                      </Typography>
                    </>
                  )}
                  {!isRoleCoach && (
                    <>
                      <Typography component="span" className={commonClasses.subHeader}>
                        Created By
                      </Typography>
                    </>
                  )}
                </Box>
                <TableFormat data={filteredWorkout?.members} />
              </Card>
            )}
          </Box>
        )}
        {isRoleCoach && isLoading && (
          <Box width="100%" mt={3}>
            <LinearProgress />
          </Box>
        )}
      </CardContent>
    </Card>
  </>;
};

export default WorkoutView;
