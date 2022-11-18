/**
 * @author Pragadeeshwaran Jayapal
 * @since 15/06/2020
 * @description created a page for Calendar and Calendar UI completed
 */
import React, { useCallback } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { ComponentProps } from 'src/types';
import {
  Grid,
  Typography,
  IconButton,
  SvgIcon,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  EventNote as EventNoteIcon,
  ViewComfyOutlined as ViewConfigIcon,
  ViewAgendaOutlined as ViewAgendaIcon
} from '@mui/icons-material';
import { Download as DownloadIcon } from 'react-feather';
import { ArrowLeftCircle as PrevIcon, ArrowRightCircle as NextIcon } from 'react-feather';
import { CSVLink } from 'react-csv';
import TooltipComponent from 'src/components/Tooltip';
import IconComponent from 'src/views/dashboard/common/IconComponent';
import { DashboardCSVData } from 'src/views/dashboard/WorkoutsComponent/Calendar/CalendarView';
import { useDispatch, useSelector } from 'react-redux';
import { setMembersDropDownSelectedTeams } from 'src/store/management/members';
import config from 'src/config';

interface ToolbarProps {
  date: Date;
  view: string;
  type: string;
  children?: React.ReactNode;
  className?: string;
  csvExportData?: DashboardCSVData[];
  onDateNext?: (event: React.MouseEvent<HTMLElement>) => void;
  onDatePrev?: (event: React.MouseEvent<HTMLElement>) => void;
  onDateToday?: (event: React.MouseEvent<HTMLElement>) => void;
  onViewChange?: (event: string) => any;
  handleMonth?: (type: string) => any;
}

const viewOptions = [
  {
    label: 'Month',
    value: 'dayGridMonth',
    icon: ViewConfigIcon
  },
  // {
  //   label: 'Week',
  //   value: 'timeGridWeek',
  //   icon: ViewWeekIcon
  // },
  // {
  //   label: 'Day',
  //   value: 'timeGridDay',
  //   icon: ViewDayIcon
  // },
  {
    label: 'Agenda',
    value: 'listWeek',
    icon: ViewAgendaIcon
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      '& div:nth-child(1)': {
        order: 0
      },
      '& div:nth-child(2)': {
        order: 2
      },
      '& div:nth-child(3)': {
        order: 1
      }
    }
  },
  monthYear: {
    cursor: 'default'
  },
  exportIcon: {
    color: theme.palette.mode === 'light' ? '#999999' : '#e6e5e8'
  },
  monthView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.down('md')]: { marginTop: theme.spacing(2) }
  },
  groupSelector: {
    width: '100%'
  },
  optionIcons: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: { display: 'none' }
  },
  selectGroupWrapper: {
    marginTop: theme.spacing(2)
    // marginBottom: theme.spacing(2)
  },
  changeView: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      '& button': {
        padding: theme.spacing(0.5)
      }
    },
    '& div': {
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        '& button:nth-child(1)': { display: 'none' }
      }
    }
  },
  calendarMonthlyView: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      '& button': {
        padding: theme.spacing(1)
      },
      '& h3': {
        fontSize: '1rem !important'
      }
    }
  },
  mobView: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex'
    }
  },
  desktopSelect: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
}));

const Toolbar: React.FC<ComponentProps & ToolbarProps> = ({
  date,
  view,
  onDatePrev,
  onDateNext,
  onViewChange,
  onDateToday,
  className,
  type,
  handleMonth,
  csvExportData,
  ...rest
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const teamData = useSelector(state => state.team.heirarchyTeams) || [];
  const selectedTeam = useSelector(state => state.members.currentSelectedTeam);
  const goswimGroupId = config.goswimGroupAPI.groupId;
  const filteredTeamData = teamData && teamData.filter(team => team._id !== goswimGroupId);
  const csvHeaders = [
    { label: 'Date', key: 'date' },
    { label: 'Team', key: 'team' },
    { label: 'Roster', key: 'roster' },
    { label: 'Swimmer', key: 'swimmer' },
    { label: 'Swim', key: 'swim' },
    { label: 'Kick', key: 'kick' },
    { label: 'Total Distance', key: 'totalDistance' }
  ];

  const ShiftPeriod = useCallback(
    ({ title, ariaLabel, onClick, IconComponent, className, disabled }) => (
      <TooltipComponent title={title}>
        <IconButton
          aria-label={ariaLabel}
          color="secondary"
          className={className || ''}
          onClick={onClick}
          disabled={disabled}
          size="large">
          <IconComponent />
        </IconButton>
      </TooltipComponent>
    ),
    []
  );

  const handleChangeTeam = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = event.target.value;
      if (value === 'ALL') {
        dispatch(
          setMembersDropDownSelectedTeams({
            arrayOfSelectedTeams: filteredTeamData?.map(team => team._id),
            selectedTeam: value
          })
        );
      } else {
        dispatch(
          setMembersDropDownSelectedTeams({ arrayOfSelectedTeams: [value], selectedTeam: value })
        );
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  return <>
    <Grid
      className={clsx(classes.root, className)}
      {...rest}
      alignItems="center"
      container
      justifyContent="space-between"
      // spacing={mobile ? 0 : 3}
    >
      {type === 'calendar' && (
        <>
          {/* <Grid item>
            <TooltipComponent title="Today">
              <IconButton color="secondary" onClick={onDateToday}>
                <SvgIcon>
                  <EventNoteIcon />
                </SvgIcon>
              </IconButton>
            </TooltipComponent>
          </Grid> */}
          <Grid container className={classes.mobView}>
            {filteredTeamData.length > 1 ? (
              <Grid item xs={9} sm={6} md={4} lg={3}>
                <FormControl variant="outlined" className={classes.groupSelector} size="small">
                  <InputLabel id="group">Group</InputLabel>
                  <Select
                    labelId="group"
                    id="selectGroup"
                    value={selectedTeam}
                    onChange={(e: any) => handleChangeTeam(e)}
                    label="Group"
                  >
                    <MenuItem value="ALL">All</MenuItem>
                    {filteredTeamData?.map(teamData => (
                      <MenuItem value={teamData._id} key={teamData._id}>
                        {teamData.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ) : (
              ''
            )}
            <Grid item xs={3} sm={6} className={classes.changeView}>
              <div>
                {viewOptions?.map(viewOption => {
                  const Icon = viewOption.icon;

                  return (
                    <TooltipComponent key={viewOption.value} title={viewOption.label}>
                      <IconButton
                        color={viewOption.value === view ? 'secondary' : 'default'}
                        onClick={() => onViewChange?.(viewOption.value)}
                        onFocus={event => event.target.blur()}
                        size="large">
                        <Icon />
                      </IconButton>
                    </TooltipComponent>
                  );
                })}
              </div>
            </Grid>
          </Grid>
          <Grid item xs={9} sm={6} md={4} lg={3} className={classes.desktopSelect}>
            {filteredTeamData?.length > 1 ? (
              <FormControl variant="outlined" className={classes.groupSelector} size="small">
                <InputLabel id="group">Group</InputLabel>
                <Select
                  labelId="group"
                  id="selectGroup"
                  value={selectedTeam}
                  onChange={(e: any) => handleChangeTeam(e)}
                  label="Group"
                >
                  {filteredTeamData?.length > 1 && <MenuItem value="ALL">All</MenuItem>}
                  {filteredTeamData?.map(teamData => (
                    <MenuItem value={teamData._id} key={teamData._id}>
                      {teamData.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              ''
            )}
          </Grid>
          <Grid item className={classes.monthView} md={6} lg={7}>
            <div className={classes.calendarMonthlyView}>
              <TooltipComponent title="Prev">
                <IconButton color="secondary" onClick={onDatePrev} size="large">
                  <SvgIcon>
                    <KeyboardArrowLeftIcon />
                  </SvgIcon>
                </IconButton>
              </TooltipComponent>
              {type === 'calendar' && (
                <TooltipComponent title="Today">
                  <IconButton onClick={onDateToday} size="large">
                    <SvgIcon>
                      <EventNoteIcon />
                    </SvgIcon>
                  </IconButton>
                </TooltipComponent>
              )}
              <Typography variant="h3" color="textPrimary" className={classes.monthYear}>
                {moment(date).format('MMMM YYYY')}
              </Typography>
              <TooltipComponent title="Next">
                <IconButton color="secondary" onClick={onDateNext} size="large">
                  <SvgIcon>
                    <KeyboardArrowRightIcon />
                  </SvgIcon>
                </IconButton>
              </TooltipComponent>
            </div>
          </Grid>
          <Grid item xs={12} md={2} className={classes.optionIcons}>
            <div>
              {viewOptions?.map(viewOption => {
                const Icon = viewOption.icon;

                return (
                  <TooltipComponent key={viewOption.value} title={viewOption.label}>
                    <IconButton
                      color={viewOption.value === view ? 'secondary' : 'default'}
                      onClick={() => onViewChange?.(viewOption.value)}
                      onFocus={event => event.target.blur()}
                      size="large">
                      <Icon />
                    </IconButton>
                  </TooltipComponent>
                );
              })}
            </div>
          </Grid>
          {/* <Grid item>
            {viewOptions.map(viewOption => {
              const Icon = viewOption.icon;

              return (
                <TooltipComponent key={viewOption.value} title={viewOption.label}>
                  <IconButton
                    color={viewOption.value === view ? 'secondary' : 'default'}
                    onClick={() => onViewChange?.(viewOption.value)}
                    onFocus={event => event.target.blur()}
                  >
                    <Icon />
                  </IconButton>
                </TooltipComponent>
              );
            })}
          </Grid> */}
        </>
      )}
      {type === 'Dashboard' && (
        <Grid>
          <Grid item>
            <Typography variant="h4" color="textPrimary">
              Yards per Day
            </Typography>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center" justifyContent="space-around">
              <ShiftPeriod
                title={`Previous Month`}
                ariaLabel="previous"
                onClick={() => {
                  handleMonth && handleMonth('previous');
                }}
                IconComponent={PrevIcon}
              />
              <Typography variant="h4" color="textPrimary" className={classes.monthYear}>
                {moment(date).format('MMMM YYYY')}
              </Typography>
              <ShiftPeriod
                title={`Next Month`}
                ariaLabel="next"
                onClick={() => {
                  handleMonth && handleMonth('next');
                }}
                disabled={moment().format('M') === moment(date).format('M')}
                IconComponent={NextIcon}
              />
            </Box>
          </Grid>
          <Grid item>
            <CSVLink
              data={csvExportData || []}
              headers={csvHeaders}
              filename="calendar_export.csv"
              separator=","
              uFEFF={false}
            >
              <IconComponent
                src={() => <DownloadIcon className={classes.exportIcon} />}
                title="Export all Data(CSV)"
              />
            </CSVLink>
          </Grid>
        </Grid>
      )}
    </Grid>
  </>;
};

export default Toolbar;
