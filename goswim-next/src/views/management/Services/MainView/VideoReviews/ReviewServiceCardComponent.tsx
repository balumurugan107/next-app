import React from 'react';
import { Box, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import moment from 'moment';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import TooltipComponent from 'src/components/Tooltip';
import { CRUD, DialogBoxConfimrationText } from 'src/constants';
import { useCommonStyles } from 'src/styles/common';
import {
  ReviewServiceDocument,
  ServiceType,
  ServiceEditorStatus,
  ReviewServiceIds
} from 'src/store/management/service';
import { ComponentProps } from 'src/types';
import { DialogContent } from 'src/views/calendar/MainView';
import { useSelector } from 'react-redux';
import TeamIcon from 'src/layouts/NavigationIcons/TeamIcon';

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
  iconsBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: 'auto'
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
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    [theme.breakpoints.only('md')]: { width: '100%' },
    [theme.breakpoints.down('sm')]: { marginTop: 15 }
  },
  rosterBox: {
    marginTop: 14
  },
  deleteIcon: {
    marginRight: '-15px'
  },
  mlAuto: {
    marginLeft: 'auto'
  },
  groupIcon:{
    marginRight: theme.spacing(1)
  },
  groupName:{
    marginLeft: theme.spacing(1)
  }
}));

interface ReviewSubCardComponentProps {
  data: ReviewServiceDocument;
  servicetype: ServiceType;
  handleDelete: (ids: ReviewServiceIds[], content: DialogContent) => void;
  handleChangeSelectedRosterGroup(rosters: string[]): void;
  handleVsEditorStatus(statusDetails: ServiceEditorStatus, data?: ReviewServiceDocument): void;
  handleChangeTeam(teamId: string): void;
  dialogContent(content: DialogContent): void;
}
export const ReviewSubCardComponent: React.FC<ComponentProps & ReviewSubCardComponentProps> = ({
  className,
  data,
  servicetype,
  handleChangeSelectedRosterGroup,
  handleVsEditorStatus,
  handleChangeTeam,
  dialogContent,
  handleDelete,
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
            <Typography className={commonClasses.subHeader}>{data.service}</Typography>
            <Box className={classes.iconsBox}>
              <TooltipComponent title="Clone">
                <IconButton
                  color="secondary"
                  onClick={() => {
                    handleVsEditorStatus(
                      {
                        active: true,
                        serviceType: servicetype,
                        editorType: 'clone'
                      },
                      data
                    );
                    data.teamId && handleChangeTeam(data.teamId);
                    handleChangeSelectedRosterGroup(data.rosterGroup || []);
                  }}
                  size="large">
                  <FileCopyIcon />
                </IconButton>
              </TooltipComponent>
              <TooltipComponent title="Edit">
                <IconButton
                  color="secondary"
                  onClick={() => {
                    if (data.availableSlots && !(data.slots - data.availableSlots)) {
                      handleVsEditorStatus(
                        {
                          active: true,
                          serviceType: servicetype,
                          editorType: 'edit'
                        },
                        data
                      );
                      data.teamId && handleChangeTeam(data.teamId);
                      handleChangeSelectedRosterGroup(data.rosterGroup || []);
                    } else {
                      dialogContent({
                        title: CRUD.EDIT,
                        description: DialogBoxConfimrationText.STOP_VIDEO_REVIEWS_EDIT
                      });
                    }
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
                    if (data.availableSlots && !(data.slots - data.availableSlots)) {
                      handleDelete(
                        [
                          {
                            serviceId: data.serviceId,
                            serviceReviewId: data.serviceReviewId
                          }
                        ],
                        {
                          title: CRUD.DELETE,
                          description: DialogBoxConfimrationText.VIDEO_REVIEWS_DELETE
                        }
                      );
                    } else {
                      dialogContent({
                        title: CRUD.DELETE,
                        description: DialogBoxConfimrationText.STOP_VIDEO_REVIEWS_DELETE
                      });
                    }
                  }}
                  size="large">
                  <DeleteOutlinedIcon />
                </IconButton>
              </TooltipComponent>
            </Box>
          </Box>
          <Box mt={2} className={commonClasses.serviceBox}>
            <Typography className={commonClasses.desc}>{data.description}</Typography>
          </Box>
          {false && (<Box mt={2} className={commonClasses.serviceBox}>
            <EventNoteIcon color="secondary" className={classes.iconDate} />
            <Typography className={commonClasses.subHeader} component="span">
              {moment(data.startDate).format(settings.dateFormat)}
              <span> to </span>
              {moment(data.endDate).format(settings.dateFormat)}
            </Typography>
            <TooltipComponent title="Booked slots">
              <Box className={classes.custIconBox}>
                <VerticalSplitIcon color="secondary" className={classes.custIcon} />
                <Box component="span">
                  {`${data.slots - (data?.availableSlots || 0)} / ${data.slots}`}
                </Box>
              </Box>
            </TooltipComponent>
          </Box>)}
          <Box className={classes.rosterBox} display="flex">
            <TeamIcon />
            <Typography component="span" className={classes.groupName}>{data?.teamName || ''}</Typography>
            {/* <Typography component="span" className={commonClasses.separator} /> */}
            <Typography component="span">{data?.rosterGroup?.join(', ') || ''}</Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="flex-end" width="100%">
            <span className={commonClasses.currency}>{settings.currency}</span>
            <Box component="span">${[Math.round(data.cost)].join(' ')}</Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
