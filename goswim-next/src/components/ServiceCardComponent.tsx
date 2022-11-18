import React from 'react';
import { Box, Card, CardContent, IconButton, Typography, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useSelector } from 'react-redux';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import TooltipComponent from 'src/components/Tooltip';

import { ComponentProps } from 'src/types';

import { ScheduleObject, Slot } from 'src/views/management/Services/MainView/LiveLessons/FormModel';
import { LessonServiceIds } from 'src/store/management/lessons';
import { CRUD, DialogBoxConfimrationText } from 'src/constants';
import { DialogContent } from 'src/views/calendar/MainView';
import { useCommonStyles } from 'src/styles/common';
import TeamIcon from 'src/layouts/NavigationIcons/TeamIcon';

export interface ServiceCard {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  slots?: string | number;
  bookedSlots?: string | number;
  totalSlots?: string | number;
  team?: string;
  roster?: string[] | string;
  price?: string | number;
  isEditor?: boolean;
  isPreview?: boolean;
  slotsData?: Slot[];
  serviceId?: string;
  teamId?: string;
  schedule: string;
  liveSchedule: ScheduleObject[]
}

interface ServiceActionProps {
  onEdit?: (lesson: ServiceCard) => void;
  onClone?: (lesson: ServiceCard) => void;
  onDelete?: (lessonIds: LessonServiceIds, dialogContent: DialogContent) => void;
}

const useStyles = makeStyles(theme => ({
  subCard: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    opacity: 0.75,
    color: '#1C2025',
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 11px 20px -8px rgba(0,0,0,0.15)',
    '&:hover': {
      opacity: 0.9,
      boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 11px 20px -8px rgba(0,0,0,0.50)'
    }
  },
  iconDate: {
    marginRight: 5,
    marginLeft: -5
  },
  contentBox: {
    paddingBottom: '12px !important',
    cursor: 'default'
  },
  custIcon: {
    marginRight: 5,
    marginLeft: 'auto'
  },
  custIconBox: {
    [theme.breakpoints.only('md')]: { width: '100%' },
    [theme.breakpoints.down('sm')]: { marginTop: 15 }
  },
  deleteIcon: {
    marginRight: '-15px'
  },
  chipRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.5),
    color: '#333333',
    fontWeight: 500
  },
  completed: {
    backgroundColor: '#989898'
  },
  pending: {
    backgroundColor: 'transparent !important',
    border: '1px solid rgba(0,0,0,0.23)'
  },

  scheduleMargin: {
    marginRight: 16
  },


  scheduleCard: {
    display: 'flex',
    width: '100%',
    padding: '10px',
  },
  scheduleCardLeft: {
    flex: 1
  },
  scheduleCardRight: {
   
  },
  groupName:{
    marginLeft: theme.spacing(1)
  }
}));

const ServiceCardComponent: React.FC<ComponentProps & ServiceActionProps & ServiceCard> = ({
  liveSchedule,
  className,
  isEditor,
  isPreview = false,
  title,
  description,
  startDate,
  endDate,
  slots,
  bookedSlots,
  totalSlots,
  team,
  roster,
  slotsData,
  price,
  serviceId,
  onEdit,
  onClone,
  onDelete,
  teamId,
  schedule,

  ...rest
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const settings = useSelector(state => state.account.settings);

  const liveScheduleEdit = (liveSchedules: ScheduleObject[]) => {
    let schedules: ScheduleObject[] = []
    if (liveSchedule) {
      liveSchedule?.map(lesson => {
        const filteredItems = liveSchedules?.filter(item => lesson.title === item.title)
        if (filteredItems && filteredItems.length > 0) {
          const selectedItem = filteredItems[0]
          if(selectedItem.selected === undefined|| selectedItem.selected){
          const schedule: ScheduleObject = {
            title: lesson.title,
            cost: selectedItem.cost,
            selected: true
          }
          schedules.push(schedule)
        }
      }
      })
    }
    return schedules
  }
  const scheduleList = () => {
    return (
      liveScheduleEdit(liveSchedule)?.map((scheduleObj: ScheduleObject) => (
        scheduleObj.selected === true ?
          (<Grid item xs={12} md={6}>
            <Card variant="outlined" className={classes.scheduleCard}>
              <Typography className={classes.scheduleCardLeft}>{scheduleObj.title || ' '}</Typography>
              <Typography className={classes.scheduleCardRight}> ${scheduleObj.cost || ' '}</Typography>
            </Card>
          </Grid>) : null
      ))
    )
  }

  return (
    <Grid item xs={12}>
      <Card className={clsx(classes.subCard, className)} {...rest}>
        <CardContent className={classes.contentBox}>
          <Box display="flex" alignItems="center">
            <Typography className={commonClasses.subHeader}>{title || 'Title'}</Typography>
            {!isEditor && (
              <Box display="flex" justifyContent="flex-end" marginLeft="auto">
                <TooltipComponent title="Clone">
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      onClone?.({
                        liveSchedule,
                        schedule,
                        team,
                        roster,
                        title,
                        description,
                        price,
                        startDate,
                        endDate,
                        totalSlots,
                        slotsData: slotsData?.map(slot => ({
                          ...slot,
                          scheduleLessonId: '',
                          booked: false
                        })),
                        bookedSlots,
                        teamId,
                        serviceId
                      });
                    }}
                    size="large">
                    <FileCopyIcon />
                  </IconButton>
                </TooltipComponent>
                <TooltipComponent title="Edit">
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      onEdit?.({
                        liveSchedule,
                        schedule,
                        team,
                        roster,
                        title,
                        description,
                        price,
                        startDate,
                        endDate,
                        totalSlots,
                        slotsData,
                        bookedSlots,
                        serviceId,
                        teamId
                      });
                    }}
                    size="large">
                    <EditOutlinedIcon />
                  </IconButton>
                </TooltipComponent>
                <TooltipComponent title="Delete">
                  <IconButton
                    color="secondary"
                    className={classes.deleteIcon}
                    onClick={() => {
                      if (slotsData && slotsData.length && onDelete) {
                        const scheduleLessonIds = slotsData?.map(({ scheduleLessonId }) =>
                          scheduleLessonId ? scheduleLessonId : ''
                        );
                        const lessonIds = {
                          serviceId: serviceId ? serviceId : '',
                          scheduleLessonIds: scheduleLessonIds
                        };
                        onDelete?.(lessonIds, {
                          title: CRUD.DELETE,
                          description: DialogBoxConfimrationText.LIVE_LESSONS_DELETE
                        });
                      }
                    }}
                    size="large">
                    <DeleteOutlinedIcon />
                  </IconButton>
                </TooltipComponent>
              </Box>
            )}
          </Box>

          <Box mt={2} display="flex" alignItems="center">
            <Typography className={commonClasses.desc}>{description || 'Description'}</Typography>
          </Box>

          <Grid container spacing={1}>
            {scheduleList()}
          </Grid>


          <Box mt={1.75} display="flex">
            <TeamIcon />
            <Typography component="span" className={classes.groupName}>{team || 'Team'}</Typography>

            {/* roster information hidden */}
            {/* <Typography component="span" className={commonClasses.separator} />
            <Typography component="span">
              {(roster && (Array.isArray(roster) ? roster.join(', ') : roster)) || 'Roster'}
            </Typography> */}
          </Box>
          {/* <VerticalSplitIcon color="secondary" className={classes.custIcon} /> */}          
          {price !== undefined && liveSchedule && liveSchedule.length <= 0 && (
            <Box display="flex" alignItems="center" justifyContent="flex-end" width="100%">
              <span className={commonClasses.currency}>{settings.currency}</span>
              <Box component="span">${[Math.round(+price) || 0].join(' ')}</Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ServiceCardComponent;
