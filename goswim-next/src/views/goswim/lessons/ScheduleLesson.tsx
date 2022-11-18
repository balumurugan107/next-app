import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import {
  AppBar,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Toolbar,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'src/components/DatePicker';
import DropDownSpinning from 'src/components/DropDownSpinning';
import QuillEditor from 'src/components/QuillEditor';
import { getScheduleList } from 'src/store/calendar/scheduleList';
import { ScheduleLessonService, updateOverViewItem } from 'src/store/calendar/scheduleOverview';
import {
  scheduleLesson,
  ScheduleRequestObj,
  updateScheduleLesson,
  UpdateScheduleRequestObj,
  updateScheduleUpdated
} from 'src/store/management/goswim/lessons/details';
import { setMembersDropDownSelectedTeamCalendar } from 'src/store/management/members';
import { sortTeam } from 'src/utils/sortTeam';
import ConfirmDelete from './ConfirmDelete';
import { markdownToHtml, htmlToMarkdown } from 'src/components/Parser';
import config from 'src/config';
import { AccountType } from 'src/constants';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 500,
    flex: 1,
    [theme.breakpoints.down('md')]: {
      margin: 0
    }
  },
  spacingStart: {
    padding: '24px',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      padding: '16px 16px 0 16px'
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: '0px'
    },
    '& .MuiCalendarOrClockPicker-root': {
      border: '1px solid #ccc'
    }
  },
  spacingEnd: {
    padding: '24px',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      padding: '16px'
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: '0px'
    },
    '& .MuiCard-root': {
      height: '100%'
    }
  },
  card: {
    height: '100%'
  },
  editor: {
    height: '100%',
    '& .ql-root.ql-editor': {
      height: '100%'
    },
    '& .ql-root': {
      height: '100%'
    }
  },
  paper: {
    minWidth: '80%',
    minHeight: '80%',
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
      minHeight: '100%'
    }
  },
  linearprogress: {
    marginTop: 16
  },
  lessonTitle: {
    fontSize: '1.25rem',
    fontWeight: 500,
    marginLeft: '24px',
    marginTop: '24px'
  },
  teams: {
    width: 250,
    marginTop: 24,
    marginLeft: 24,
    '@media only screen  and (min-device-width: 375px)  and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape)': {
      width: 220
    },
    [theme.breakpoints.down('sm')]: { width: 250, marginTop: 14 }, //old: width - 363
    [theme.breakpoints.between(360, 420)]: { width: '100%' }
  },
  infoIcon: {
    fontSize: 100,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
  },
  modalDesc: {
    textAlign: 'center'
  },
  modalTitle: {
    '& h2': {
      fontSize: '1.25rem'
    }
  },
  groupSelector: {
    width: '33.33%',
    margin: '16px 24px'
  }
}));

type PropsFunction = (event: any) => void;

export interface GetScheduleProps {
  lessonID: string | undefined;
  lessonData?: ScheduleLessonService | null;
  openDialog: boolean;

  lessonTitle: string | null | undefined;
  addEditToggle: string;
}
export default function ScheduleLesson(props: {
  data: GetScheduleProps;
  closeClicked: PropsFunction;
}) {
  const { lessonID, lessonData, openDialog, lessonTitle, addEditToggle } = props?.data;
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const currentselectedTeam = useSelector(state => state.members.currentSelectedTeam, _.isEqual);
  const scheduleList = useSelector(state => state.scheduleList);
  const URL = router.asPath;
  const [open, setOpen] = useState(openDialog);
  let initialDate = lessonData?.schedule_on_timestamp;
  let formatedDate = initialDate !== undefined ? new Date(initialDate) : new Date();
  const [selectedDate, setSelectedDate] = useState(
    lessonData?.schedule_on_timestamp ? new Date(lessonData.schedule_on_timestamp) : new Date()
  );

  const showQuill =
    lessonData?.message === undefined ? true : lessonData?.message.length > 0 ? false : true;

  const handleDateChange = (date: any | null) => {
    setSelectedDate(date);
  };

  const startDate = moment(selectedDate)
    .clone()
    .startOf('month')
    .valueOf();

  const endDate = moment(selectedDate)
    .clone()
    .endOf('month')
    .valueOf();

  const { isLoading, lessonScheduled, isDeleted } = useSelector(state => state.lessonDetails);
  const scheduleListLoading = useSelector(state => state.scheduleList.isLoading);
  const teamIsLoading = useSelector(state => state.team.isLoading);
  const memberIsLoading = useSelector(state => state.members.isLoading);
  const teamData = useSelector(state => state.team.heirarchyTeams, _.isEqual) || [];
  const groupList = useSelector(state => state.team.teamsList);
  const filteredGroupList =
    groupList && groupList.filter(team => team._id !== config.goswimGroupAPI.groupId);
  const teams = useMemo(() => teamData && sortTeam(teamData), [teamData]);
  const { _id, role }: any = useSelector(state => state.account.user);
  const filteredTeams = teamData?.filter((filteredTeam: any) => filteredTeam.member_id === _id);
  const teamValue = useSelector(state => state.members.currentSelectedTeam, _.isEqual);
  const teamSelectedVal = useSelector(state => state.members.currentSelectedTeamManagement);
  const [dropdownValue, setDropdownValue] = useState(teamValue === 'ALL' ? teamData[0] : teamValue);
  const [initialRender, setInitialRender] = useState(true);
  const [initialRender1, setInitialRender1] = useState(true);
  const teamList = useSelector(state => state.members.currentSelectedTeams, _.isEqual);
  const [openReplaceModal, setOpenReplaceModal] = useState(false);
  const [scheduledLesson, setScheduledLesson] = useState<any>({});
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [message, setMessage] = useState<string>(
    props.data.lessonData?.message ? markdownToHtml(props.data.lessonData?.message) : ''
  );
  const deleteDisplayCondition = filteredTeams.find(team => teamSelectedVal === team._id);

  useEffect(() => {
    if (initialRender1 && open && currentselectedTeam !== 'ALL' && teamValue) {
      dispatch(getScheduleList(teamValue, startDate, endDate));
      setInitialRender1(false);
    } else if (open && teamSelectedVal !== 'ALL' && teamSelectedVal) {
      dispatch(getScheduleList(teamSelectedVal, startDate, endDate));
    }
  }, [open, teamSelectedVal, lessonData?.team_id]);

  useEffect(() => {
    setSelectedDate(formatedDate);
  }, [lessonData]);

  let delayDebounceFn: NodeJS.Timeout;

  const handleChange = (value: any) => {
    if (delayDebounceFn) clearTimeout(delayDebounceFn);
    delayDebounceFn = setTimeout(() => {
      setMessage(value);
    }, 500);
  };
  const initialTimeZone = useSelector(state => state.account.settings.timeZone);
  const localtz = initialTimeZone === '' ? moment.tz.guess() : initialTimeZone;

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  useEffect(() => {
    if (lessonScheduled) {
      props.closeClicked(true);
    }
  }, [lessonScheduled]);
  const handleSaveClicked = async () => {
    let convertedSelectedDate = new Date(selectedDate); // Moment date format object converted into normal javascript date object
    const filteredList = scheduleList?.data?.filter(
      list =>
        moment(list.schedule_on_timestamp).format('DD/MM/YYYY') ===
        moment(convertedSelectedDate?.getTime()).format('DD/MM/YYYY') &&
        list.lesson_id === lessonID
    );
    setScheduledLesson(filteredList[0]);
    let scheduleReq: UpdateScheduleRequestObj = {
      lesson_id: lessonID,
      _id: lessonData?._id,
      schedule_on_timestamp: convertedSelectedDate?.getTime(),
      message: htmlToMarkdown(message),
      team_id: lessonData?.team_id
        ? lessonData?.team_id
        : teamSelectedVal
          ? teamSelectedVal
          : teamValue === 'ALL'
            ? teamList[0]
            : teamValue,
      tz: localtz
    };

    let alreadyExist = filteredList.find(item => item._id !== lessonData?._id) !== undefined;

    filteredList.forEach(item => {
      if (item._id === lessonData?._id) {
        alreadyExist = false;
      }
    });
    if (filteredList?.length > 0 && alreadyExist) {
      setOpenReplaceModal(true);
    } else if (lessonData) {
      scheduleReq.team_id = teamSelectedVal;
      await dispatch(updateOverViewItem(scheduleReq));
      await dispatch(updateScheduleLesson(scheduleReq));
      await dispatch(updateScheduleUpdated());
      await props.closeClicked(true);
    } else {
      let scheduleReq: ScheduleRequestObj = {
        lesson_id: lessonID,
        schedule_on_timestamp: convertedSelectedDate?.getTime(),
        //Need to change description type from html to markdown text
        message: htmlToMarkdown(message),
        team_id: props?.data?.lessonData?.team_id
          ? props.data.lessonData.team_id
          : teamSelectedVal
            ? teamSelectedVal
            : role === AccountType.ADMIN && groupList.length === 1
              ? config.goswimGroupAPI.groupId
              : teamValue === 'ALL'
                ? teamList[0]
                : teamValue,
        tz: localtz
      };
      dispatch(scheduleLesson(scheduleReq));
    }
  };

  const handleClose = () => {
    setSelectedDate(
      lessonData?.schedule_on_timestamp ? new Date(lessonData.schedule_on_timestamp) : new Date()
    );
    props.closeClicked(true);
  };

  const selectedTeam = () =>
    teamIsLoading || memberIsLoading
      ? [
        <MenuItem key="Loading" value="Loading">
          <DropDownSpinning />
        </MenuItem>
      ]
      : role === AccountType.ADMIN
        ? groupList?.map((
          // With Goswim default group
          teamData: any
        ) => (
          <MenuItem key={teamData._id} value={teamData._id}>
            {teamData.name}
          </MenuItem>
        ))
        : filteredGroupList?.map((
          teamData: any // WithOut Goswim default group
        ) => (
          <MenuItem key={teamData._id} value={teamData._id}>
            {teamData.name}
          </MenuItem>
        ));

  const handleChangeTeam = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = event.target.value;
      if (value === 'ALL') {
        dispatch(
          setMembersDropDownSelectedTeamCalendar({
            arrayOfSelectedTeams: teams?.map(team => team?._id),
            selectedTeam: value
          })
        );
      } else {
        dispatch(
          setMembersDropDownSelectedTeamCalendar({
            arrayOfSelectedTeams: [value],
            selectedTeam: value
          })
        );
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    if (initialRender && lessonData?.team_id) {
      if (teamValue === 'ALL') setDropdownValue(teamList[0]);
      else setDropdownValue(teamValue);
      setInitialRender(false);
    } else setDropdownValue(teamSelectedVal);
  }, [teamSelectedVal]);

  useEffect(() => {
    let lessonDataDate = new Date(lessonData?.schedule_on_timestamp!);
    let startLessonDate = lessonDataDate.setHours(0, 0, 0, 0).valueOf();
    let endLessonDate = lessonDataDate.setHours(23, 59, 59, 999).valueOf();
    if (scheduleList?.data?.length > 0 && props && open) {
      scheduleList.data.find((list: any) => {
        if (
          list.lesson_id === lessonData?.lesson_id &&
          list.schedule_on_timestamp >= startLessonDate &&
          list.schedule_on_timestamp <= endLessonDate
        ) {
          setMessage(markdownToHtml(list.message));
        }
      });
    }
  }, [scheduleList, open]);

  useEffect(() => {
    if (isDeleted) props.closeClicked(true);
  }, [isDeleted]);

  const handleDeleteScheduleLesson = () => {
    setConfirmDelete(true);
  };

  const closeReplaceModal = () => {
    setOpenReplaceModal(false);
  };

  return (
    <div>
      <Dialog classes={{ paper: classes.paper }} open={open} onClose={handleClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              size="large"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h4" className={classes.title}>
              {addEditToggle} Schedule Lesson
            </Typography>
            {URL.split('/')[0] === 'calendar' && deleteDisplayCondition && (
              <Button color="inherit" onClick={handleDeleteScheduleLesson} size="small">
                Delete
              </Button>
            )}
            <Button autoFocus color="inherit" onClick={handleSaveClicked} size="small">
              save
            </Button>
          </Toolbar>
        </AppBar>
        {(isLoading || scheduleListLoading) && (
          <LinearProgress className={classes.linearprogress} />
        )}
        <Typography className={classes.lessonTitle}>{lessonTitle}</Typography>
        {(filteredGroupList?.length || role === AccountType.ADMIN) && (
          <FormControl variant="outlined" className={classes.groupSelector} size="small">
            <InputLabel id="group">Group</InputLabel>
            <Select
              labelId="group"
              id="selectGroup"
              size="small"
              value={
                lessonData?.team_id
                  ? teamSelectedVal
                  : dropdownValue ??
                  teamSelectedVal ??
                  filteredGroupList[0]?._id ??
                  (role === AccountType.ADMIN && groupList[0]._id)
              }
              onChange={e => handleChangeTeam(e)}
              label="Group"
            >
              {selectedTeam()}
            </Select>
          </FormControl>
        )}
        {!isLoading && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={5}>
              <div className={classes.spacingStart}>
                <DatePicker
                  date={selectedDate}
                  setSelectedDate={date => {
                    handleDateChange(date);
                  }}
                />
              </div>
            </Grid>
            {(message || showQuill) && (
              <Grid item xs={12} md={6} lg={7}>
                <div className={classes.spacingEnd}>
                  <Card className={classes.card}>
                    <QuillEditor
                      className={classes.editor}
                      value={message || ''}
                      onChange={handleChange}
                    />
                  </Card>
                </div>
              </Grid>
            )}
          </Grid>
        )}
      </Dialog>
      <Dialog open={openReplaceModal} onClose={closeReplaceModal}>
        <DialogTitle id="alert-dialog-title" className={classes.modalTitle}>
          Lesson Already Exist
        </DialogTitle>
        <DialogContent className={classes.modalDesc}>
          <InfoOutlinedIcon className={classes.infoIcon} />
          <DialogContentText id="alert-dialog-description">
            <p>
              <b>{scheduledLesson?.lesson_name}</b> is already schduled on{' '}
              {moment(scheduledLesson?.schedule_on_timestamp).format('DD/MM/YYYY')}.
            </p>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* ConfirmModal */}
      <ConfirmDelete
        id={lessonData?._id}
        open={openConfirmDelete}
        close={() => setConfirmDelete(false)}
        handleModal={() => handleClose()}
      />
    </div>
  );
}
