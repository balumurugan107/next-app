import React from 'react';
import clsx from 'clsx';
import { Grid, Box, IconButton, Typography, CardContent, Card } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import { CRUD, DialogBoxConfimrationText } from 'src/constants';
import { ComponentProps } from 'src/types';
import { Workout } from 'src/store/workout';
import TooltipComponent from 'src/components/Tooltip';
import { DialogContent } from 'src/views/calendar/MainView';
import { useCommonStyles } from 'src/styles/common';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  subCard: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    opacity: 0.75,
    color: '#1C2025',
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 11px 20px -8px rgba(0,0,0,0.15)',
    transition: 'all ease 0.25s',
    '&:hover': {
      opacity: 0.9,
      boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 11px 20px -8px rgba(0,0,0,0.35)',
      transition: 'all ease 0.25s'
    }
  },
  contentBox: {
    paddingBottom: '12px !important',
    cursor: 'default'
  },
  subContent: {
    fontWeight: 400,
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  iconsBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: 'auto'
  },
  iconDate: {
    marginRight: 5,
    marginLeft: -5
  },
  rosterBox: {
    marginTop: 14
  },
  deleteIcon: {
    marginRight: '-15px'
  },
  custIconBox: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    [theme.breakpoints.only('md')]: {
      width: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 15
    }
  },
  custIcon: {
    marginRight: 5,
    marginLeft: 'auto'
  },
  preText: {
    whiteSpace: 'pre-wrap',
    MaxHeight: 70,
    overflowY: 'hidden',
    lineBreak: 'anywhere'
  }
}));

interface SetsSubCardComponentProps {
  isCompleted: boolean;
  onClone: (workoutText: Workout) => void;
  onView: (workoutText: Workout) => void;
  onEdit: (workout: Workout) => void;
  onDelete: (id: string, content: DialogContent) => void;
}

/**
 * @description SetsSubCardComponent
 */
const SetsSubCardComponent: React.FC<ComponentProps & Workout & SetsSubCardComponentProps> = ({
  className,
  workout_text,
  workout_name,
  team,
  sets_roster_group,
  scheduled_datetime,
  assigned,
  completed,
  workout_created_datetime,
  workout_created_by,
  type,
  assigned_datetime,
  _id,
  onClone,
  onEdit,
  onDelete,
  onView,
  isCompleted,
  ...rest
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const settings = useSelector(state => state.account.settings);

  return (
    <Grid item xs={12}>
      <Card className={clsx(classes.subCard, className)} {...rest}>
        <CardContent className={classes.contentBox}>
          <Box className={commonClasses.serviceBox}>
            <Box className={classes.iconsBox}>
              <TooltipComponent title="Clone">
                <IconButton
                  color="secondary"
                  onClick={() =>
                    onClone({
                      workout_text,
                      workout_name,
                      _id,
                      sets_roster_group,
                      team,
                      scheduled_datetime,
                      workout_created_by,
                      workout_created_datetime,
                      assigned_datetime,
                      type
                    })
                  }
                  size="large">
                  <FileCopyIcon />
                </IconButton>
              </TooltipComponent>
              <TooltipComponent title="Edit">
                <IconButton
                  color="secondary"
                  onClick={() =>
                    onEdit({
                      workout_text,
                      workout_name,
                      _id,
                      sets_roster_group,
                      team,
                      scheduled_datetime,
                      workout_created_by,
                      workout_created_datetime,
                      assigned_datetime,
                      type
                    })
                  }
                  size="large">
                  <EditOutlinedIcon />
                </IconButton>
              </TooltipComponent>
              <TooltipComponent title="View">
                <IconButton
                  color="secondary"
                  onClick={() => onView({
                    workout_text,
                    workout_name,
                    _id,
                    sets_roster_group,
                    team,
                    scheduled_datetime,
                    workout_created_by,
                    workout_created_datetime,
                    assigned_datetime,
                    type
                  })}
                  size="large">
                  <VisibilityIcon />
                </IconButton>
              </TooltipComponent>
              <TooltipComponent title="Delete">
                <IconButton
                  color="secondary"
                  className={classes.deleteIcon}
                  onClick={event => {
                    event.stopPropagation();
                    onDelete(_id, {
                      title: CRUD.DELETE,
                      description: DialogBoxConfimrationText.WORKOUTS_DELETE
                    });
                  }}
                  size="large">
                  <DeleteOutlinedIcon />
                </IconButton>
              </TooltipComponent>
            </Box>
          </Box>
          <Box className={commonClasses.serviceBox}>
            <Box>
              <Typography component="pre" className={clsx(classes.subContent, classes.preText)}>
                {workout_text}
              </Typography>
            </Box>
          </Box>
          <Box mt={2} className={commonClasses.serviceBox}>
            <EventNoteIcon color="secondary" className={classes.iconDate} />
            <Typography className={commonClasses.subHeader} component="span">
              {moment(scheduled_datetime).format(settings.dateFormat)}
            </Typography>
            {isCompleted && (
              <TooltipComponent title="Completed/Assigned">
                <Box className={classes.custIconBox}>
                  <VerticalSplitIcon color="secondary" className={classes.custIcon} />
                  <Box component="span">{`${completed} / ${assigned}`}</Box>
                </Box>
              </TooltipComponent>
            )}
          </Box>
          <Box className={classes.rosterBox} display="flex">
            <Typography component="span">{team}</Typography>
            <Typography component="span" className={commonClasses.separator} />
            <Typography component="span">{[...sets_roster_group].sort().join(', ')}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SetsSubCardComponent;
