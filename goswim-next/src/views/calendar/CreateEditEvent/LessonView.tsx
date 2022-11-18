export default {}
// import React, { useEffect, useState } from 'react';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import clsx from 'clsx';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   makeStyles,
//   CardHeader,
//   Chip,
//   useMediaQuery,
//   useTheme,
//   LinearProgress,
//   TableRow,
//   TableCell,
//   TableContainer
// } from '@mui/material';
// import Rating from '@mui/lab/Rating';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
// import CancelIcon from '@mui/icons-material/Cancel';
// import _ from 'lodash';
// import moment from 'moment-timezone';

// import { CreateEditEventProps } from 'src/views/calendar/CreateEditEvent';
// import { SetsCreateEditView } from 'src/views/calendar/CreateEditEvent/WorkoutView';
// import TooltipComponent from 'src/components/Tooltip';
// import { useCommonStyles } from 'src/styles/common';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateRatings } from 'src/store/management/orders';
// import { BookingData, getLessonBookingList } from 'src/store/calendar/lesson';

// import TableComponentFactory from 'src/components/Table';
// import Avatar from 'src/components/Avatar';
// import CoachNotes from 'src/views/calendar/CreateEditEvent/CoachNotes';
// import { ServiceName } from 'src/constants';

// export interface LessonCreateEditView extends CreateEditEventProps, SetsCreateEditView {}

// const useStyles = makeStyles(theme => ({
//   root: {
//     cursor: 'default',
//     '@global': {
//       '.MuiSvgIcon-colorSecondary': {
//         color: theme.palette.secondary.main
//       }
//     }
//   },
//   header: {
//     fontWeight: 800,
//     paddingLeft: 24,
//     paddingRight: 24,
//     paddingBottom: 0,
//     paddingTop: 8
//   },
//   content: {
//     padding: 24,
//     paddingTop: 0,
//     maxHeight: 520,
//     overflowY: 'auto'
//   },
//   subContent: {
//     fontWeight: 400
//   },
//   roster: {
//     marginTop: 4,
//     fontWeight: 800
//   },
//   custIcon: {
//     marginRight: 5,
//     marginLeft: 'auto',
//     [theme.breakpoints.down('xs')]: {
//       marginLeft: 0
//     }
//   },
//   chip: {
//     margin: theme.spacing(0.5),
//     color: theme.palette.text.primary,
//     fontWeight: 500
//   },
//   completed: {
//     backgroundColor: theme.palette.background.dark
//   },
//   pending: {
//     backgroundColor: 'transparent',
//     border: '1px solid rgba(204,204,204)'
//   },
//   booked: {
//     backgroundColor: '#4caf50',
//     color: theme.palette.primary.contrastText
//   },
//   chipRoot: {
//     listStyle: 'none'
//   },
//   iconDate: {
//     marginRight: 5,
//     marginLeft: -5,
//     [theme.breakpoints.down('xs')]: {
//       marginLeft: 0,
//       float: 'left'
//     }
//   },
//   rating: {
//     fontWeight: 800
//   },
//   table: {
//     maxHeight: 230,
//     marginTop: 10
//   }
// }));

// interface LessonBookingTableProps {
//   isLoading: boolean;
//   data: BookingData[];
//   isRoleCoach: boolean;
//   roster?: string[];
// }

// const LessonBookingTable = React.memo<LessonBookingTableProps>(
//   ({ data, isLoading, isRoleCoach, roster }) => {
//     const Table = TableComponentFactory<string, BookingData>();
//     const headers = ['Swimmer Name', 'Team', 'Roster', 'Slot', 'Notes'];
//     const classes = useStyles();
//     return isLoading ? (
//       <LinearProgress />
//     ) : (
//       <TableContainer className={classes.table}>
//         <Table
//           stickyHeader
//           headers={headers}
//           body={data}
//           renderHead={headers => (
//             <TableRow>
//               {headers.map((header, index) =>
//                 header === headers[0] ? (
//                   <TableCell key={index} colSpan={2}>
//                     {header}
//                   </TableCell>
//                 ) : (
//                   <TableCell key={index}>{header}</TableCell>
//                 )
//               )}
//             </TableRow>
//           )}
//           renderBody={body =>
//             body.map((datum, index) => (
//               <TableRow key={index}>
//                 <TableCell component="th" scope="row">
//                   <Avatar variant="circle" srcSet={datum.profilePictureUrl} />
//                 </TableCell>
//                 <TableCell>
//                   <Box>
//                     <Typography variant="body1" color="textPrimary">
//                       {datum.fullName}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       {datum.email}
//                     </Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell>{datum.teamName}</TableCell>
//                 <TableCell>
//                   {datum.rostterGroup.map((roster, index) => {
//                     return (
//                       <div key={index}>
//                         {roster}
//                         <br />
//                       </div>
//                     );
//                   })}
//                 </TableCell>
//                 <TableCell>
//                   {datum.slots.map(slot => moment(slot).format('hh:mm a')).join(',')}
//                 </TableCell>
//                 {isRoleCoach && (
//                   <TableCell>
//                     <CoachNotes
//                       {...{
//                         swimmer_id: datum.memberId,
//                         service_id: datum.lessonServiceId,
//                         swimmer_notes: datum.swimmerNotes,
//                         serviceType: ServiceName.LIVE_LESSONS,
//                         lesson_date: datum.lessonDate,
//                         teamId: datum.teamId,
//                         roster
//                       }}
//                     />
//                   </TableCell>
//                 )}
//               </TableRow>
//             ))
//           }
//         />
//       </TableContainer>
//     );
//   }
// );

// const LessonView: React.FC<LessonCreateEditView> = ({
//   onCancel,
//   lessonEvent,
//   isRoleCoach,
//   onDelete,
//   onEdit,
//   scheduleDispatchOverview
// }) => {
//   const classes = useStyles();
//   const commonClasses = useCommonStyles();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const mobile = useMediaQuery(theme.breakpoints.down('xs'));
//   const [hover, setHover] = useState(-1);
//   const [rating, setRating] = useState<number | null>(lessonEvent?.swimmerRating || 0);
//   const { isLoading, data, settings } = useSelector(
//     state => ({
//       isLoading: state.lessonBooking.isLoading,
//       data: state.lessonBooking.data,
//       settings: state.account.settings
//     }),
//     _.isEqual
//   );
//   const isCompleted = moment().valueOf() > moment(lessonEvent?.lessonDate).valueOf();

//   useEffect(() => {
//     if (isRoleCoach && lessonEvent) {
//       const { team: teamId, serviceId, rosterGroup: roster, lessonDate } = lessonEvent;
//       dispatch(getLessonBookingList({ teamId, serviceId, roster, lessonDate }));
//     }
//   }, [isRoleCoach, dispatch, lessonEvent]);

//   const ChipsArray = () => {
//     return (
//       <Box component="ul" display="flex" flexWrap="wrap" p={0.5} m={0} className={classes.chipRoot}>
//         {lessonEvent?.slots?.map((slot, index) => {
//           const slotTime = moment(slot.startTime).valueOf();
//           const chipClass = slot?.booked
//             ? lessonEvent.bookedSlotTime?.includes(slotTime)
//               ? classes.booked
//               : classes.completed
//             : classes.pending;
//           return (
//             <Box component="li" key={index}>
//               <Chip
//                 label={moment(slot?.startTime).format('hh:mm a')}
//                 className={clsx(classes.chip, chipClass)}
//               />
//             </Box>
//           );
//         })}
//       </Box>
//     );
//   };

//   return (
//     <>
//       <Card className={clsx(classes.root, commonClasses.modalBodyScroll)}>
//         <CardHeader
//           title={
//             <Typography component="h4" variant="h4" color="primary">
//               {lessonEvent?.name || ''}
//             </Typography>
//           }
//           className={classes.header}
//           action={
//             <Box mt={1.25}>
//               {isRoleCoach && (
//                 <TooltipComponent title="Edit">
//                   <IconButton color="secondary" onClick={onEdit}>
//                     <EditOutlinedIcon />
//                   </IconButton>
//                 </TooltipComponent>
//               )}
//               {isRoleCoach && (
//                 <TooltipComponent title="Delete">
//                   <IconButton color="secondary" onClick={onDelete}>
//                     <DeleteOutlinedIcon />
//                   </IconButton>
//                 </TooltipComponent>
//               )}
//               <TooltipComponent title="Close">
//                 <IconButton aria-label="clear" onClick={onCancel}>
//                   <CancelIcon className={commonClasses.cancelColor} fontSize="large" />
//                 </IconButton>
//               </TooltipComponent>
//             </Box>
//           }
//         />
//         <CardContent className={classes.content}>
//           <Box mt={2} display="flex" alignItems="center">
//             <Typography className={clsx(commonClasses.desc, classes.subContent)}>
//               {lessonEvent?.description || ''}
//             </Typography>
//           </Box>

//           <Box mt={2} display={mobile ? 'block' : 'flex'} alignItems="center">
//             <Typography component="span" className={classes.roster}>
//               {lessonEvent?.teamName || ''}
//             </Typography>
//             <Typography component="span" className={commonClasses.separator} />
//             <Typography component="span" className={classes.roster}>
//               {lessonEvent?.rosterGroup?.join(', ') || ''}
//             </Typography>
//             <Box
//               display="flex"
//               alignItems="center"
//               justifyContent="flex-end"
//               mt={mobile ? 1.5 : 0}
//               marginLeft="auto"
//             >
//               <span className={commonClasses.currency}>{settings.currency}</span>
//               <Box component="span">{(lessonEvent?.cost && Math.round(lessonEvent.cost)) || 0}</Box>
//             </Box>
//           </Box>
//           <Box display="flex" flexWrap={mobile ? 'wrap' : 'unset'}>
//             <Box mt={2} display="flex" alignItems="center">
//               <EventNoteIcon color="secondary" className={classes.iconDate} />
//               <Typography component="span" className={commonClasses.subHeader}>
//                 {`${
//                   lessonEvent?.lessonDate
//                     ? moment(lessonEvent?.lessonDate).format(settings.dateFormat)
//                     : ''
//                 }`}
//               </Typography>
//             </Box>
//             <Box display="flex" alignItems="center" ml={mobile ? 0 : 3} mt={1}>
//               <Box mt={0.625}>
//                 <VerticalSplitIcon color="secondary" className={classes.custIcon} />
//               </Box>
//               {lessonEvent?.slots?.length && <ChipsArray />}
//             </Box>
//           </Box>
//           {!isRoleCoach && isCompleted && (
//             <Box display="flex" borderColor="transparent" mt={2}>
//               <Typography>Ratings</Typography>
//               <Rating
//                 name="lesson-ratings"
//                 value={rating}
//                 onChange={(_event, rating) => {
//                   if (rating && lessonEvent?.bookingIds?.length) {
//                     setRating(rating);
//                     dispatch(
//                       updateRatings({ ratings: rating, bookingIds: lessonEvent.bookingIds })
//                     );
//                     scheduleDispatchOverview();
//                   }
//                 }}
//                 onChangeActive={(_event, newHover) => {
//                   setHover(newHover);
//                 }}
//               />
//               {rating !== null && (
//                 <Typography className={classes.rating}>
//                   {hover !== -1 ? hover : rating}/5
//                 </Typography>
//               )}
//             </Box>
//           )}
//           {isRoleCoach && !!data.length && (
//             <LessonBookingTable
//               isLoading={isLoading}
//               isRoleCoach={isRoleCoach}
//               roster={lessonEvent?.rosterGroup}
//               data={data}
//             />
//           )}
//         </CardContent>
//       </Card>
//     </>
//   );
// };

// export default LessonView;
