import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  // Card,
  Box,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField,
  Grid,
  SvgIcon,
  InputAdornment,
  IconButton,
  Typography,
  TableContainer,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Search as SearchIcon, X as ClearIcon } from 'react-feather';
import moment from 'moment';
import clsx from 'clsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { ComponentProps, ValueOf } from 'src/types';
import { AccountType, VIDEO_STATUS } from 'src/constants';
import {
  getExpertBookingLists,
  getSwimmerBookingLists,
  filterType,
  setOrdersDetailsViewOptions,
  BookingDocument,
  getBookingLists
} from 'src/store/management/orders';
import { ApplicationState } from 'src/store';
// import Label from 'src/components/Label';
import Label from 'src/components/Label';

const StyledTableCell = withStyles(theme =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  })
)(TableCell);

const StyledTableRow = withStyles(theme =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
      }
    }
  })
)(TableRow);

const applyFilters = (members: BookingDocument[], query: string): BookingDocument[] => {
  try {
    if (!query) {
      return members;
    }
    return members?.filter(member => {
      let matches = true;

      const properties: (keyof BookingDocument)[] = ['name', 'team', 'rosterGroup', 'service_name'];
      let containsQuery = false;

      properties.forEach(property => {
        let value: ValueOf<BookingDocument>;
        value = member[property];
        if (value && typeof value === 'string') {
          if (value.toLowerCase().includes(query.toLowerCase())) {
            containsQuery = true;
          }
        }
        if (value && Array.isArray(value)) {
          value.forEach(element => {
            if (
              typeof element === 'string' &&
              element.toLowerCase().includes(query.toLowerCase())
            ) {
              containsQuery = true;
            }
          });
        }
      });

      if (!containsQuery) {
        matches = false;
      }

      return matches;
    });
  } catch (error:any) {
    console.error(`applyFilters-->${error}`);
    return members;
  }
};

const useStyles = makeStyles(theme => ({
  // mrTop: {
  //   marginTop: 5,
  //   [theme.breakpoints.down('xs')]: { width: '100%', marginTop: 0 }
  // },
  tableCell: {
    maxWidth: 300,
    wordBreak: 'break-all'
  },
  image: {
    height: 50,
    width: 50
  },
  switchBtn: {
    float: 'right',
    marginTop: 3
  },
  clearIcon: {
    marginRight: '-1.25rem'
  },
  switchContain: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: '0px !important',
      paddingBottom: '0px !important'
    }
  },
  curDefault: {
    cursor: 'default',
    '& td, th': {
      padding: '.75rem'
    }
  },
  table: {
    [theme.breakpoints.down('md')]: { minWidth: 1200 }
  },
  card: {
    minHeight: '70vh'
  },
  bookingTable: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center'
    }
  },
  bookingAccordion: {
    // marginBottom: theme.spacing(2),
    '& .MuiAccordionDetails-root .MuiPaper-root': {
      boxShadow: '0 4px 6px 0 #3f3f4426 !important',
      marginBottom: theme.spacing(3)
    }
  },
  accordionTitleSec: {
    display: 'flex',
    // [theme.breakpoints.down('xs')]: {
    //   flexDirection: 'column'
    // },
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    '& h2': {
      fontSize: 18,
      marginRight: theme.spacing(1),
      fontWeight: 500
    },
    '& h4': {
      fontSize: 16,
      marginLeft: theme.spacing(1.5),
      fontWeight: 500
    },
    '& div': {
      display: 'flex',
      alignItems: 'center'
    },
    '& p': {
      fontSize: 14,
      color: theme.palette.text.secondary
    }
  },
  accordianDetail: {
    [theme.breakpoints.down('sm')]: {
      display: 'none !important'
    }
  },
  accordianDetailInner: {
    [theme.breakpoints.up('xs')]: {
      display: 'none !important'
      // flexDirection: 'column'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block !important',
      marginBottom: '8px'
      // flexDirection: 'column'
    }
  },
  accordian: {
    '& .MuiAccordionDetails-root': {
      // [theme.breakpoints.up('xs')]: {
      //   display:'flex !important',
      //   // flexDirection: 'column'
      // },
      [theme.breakpoints.down('sm')]: {
        display: 'block !important'
        // flexDirection: 'column'
      }
    }
  }
}));

// const timeOption = [
//   {
//     label: 'Upcoming',
//     value: 'upcoming'
//   },
//   {
//     label: 'Completed',
//     value: 'completed'
//   }
// ];

const applyPagination = (orders: BookingDocument[], page: number, limit: number) => {
  return orders.slice(page * limit, page * limit + limit);
};
const Results: React.FC<ComponentProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [queryInput, setQueryInput] = React.useState('');
  const { user, orders, isLoading, time, serviceType, orderDVO } = useSelector(
    (state: ApplicationState) => ({
      user: state.account.user,
      orders: state.orders.bookingData,
      isLoading: state.orders.isLoading,
      time: state.orders.time,
      serviceType: state.orders.service_type,
      orderDVO: state.orders.ordersDetailsViewOption,
      settings: state.account.settings
    })
  );

  const bookingDetails = useSelector(state => state.orders.bookingsData);
  const { page, limit, query } = orderDVO;
  const memoizedOrdersData = useMemo(() => orders, [JSON.stringify(orders)]); // eslint-disable-line
  const filteredMembers = memoizedOrdersData && applyFilters(memoizedOrdersData, query);
  const paginatedOrders = filteredMembers && applyPagination(filteredMembers, page, limit);
  const isCoachOrSwimmingExpert = user?.role === AccountType.COACH_OR_SWIMMING_EXPERT;
  const date = moment().valueOf();
  const dispatchType = isCoachOrSwimmingExpert ? getExpertBookingLists : getSwimmerBookingLists;
  useEffect(() => {
    dispatch(
      dispatchType({
        filter: time as filterType,
        service_type: serviceType
      })
    );
  }, [time, serviceType]); //eslint-disable-line

  const handlePageChange = (_: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    dispatch(setOrdersDetailsViewOptions({ ...orderDVO, page }));
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setOrdersDetailsViewOptions({ ...orderDVO, limit: +event.target.value }));
  };
  const handleQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setQueryInput(event.target.value);
    dispatch(setOrdersDetailsViewOptions({ ...orderDVO, query: event.target.value }));
  };

  const handleCloseQueryChange = () => {
    setQueryInput('');
    dispatch(setOrdersDetailsViewOptions({ ...orderDVO, query: '' }));
  };

  useEffect(() => {
    dispatch(getBookingLists());
  }, []);

  const findStatusOfVideo = (serviceStatus: string) => {
    switch (serviceStatus) {
      case VIDEO_STATUS.DOWNLOADED:
        return 'primary';
      case VIDEO_STATUS.REVIEWED:
        return 'success';
      case VIDEO_STATUS.FAILED:
        return 'error';
      case VIDEO_STATUS.REFUNDED:
        return 'secondary';
      case VIDEO_STATUS.UPLOADED:
        return 'error';
      case VIDEO_STATUS.REQUESTED:
        return 'warning';
      default:
        return 'warning';
    }
  };
  return (
    // <Card className={classes.card} {...rest}>
    // </Card>
    <>
      <Box>
        <Box display="flex" alignItems="center" marginBottom={2}>
          <Grid container>
            <Grid item lg={4} sm={4} xs={12}>
              <TextField
                // className={classes.mrTop}
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                  endAdornment: queryInput && queryInput !== '' && (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={handleCloseQueryChange}
                        aria-label="clear"
                        className={classes.clearIcon}
                        size="large"
                      >
                        <ClearIcon width="18" height="18" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                onChange={handleQueryChange}
                placeholder="Search Bookings"
                value={query}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={8} sm={4} xs={12} className={classes.switchContain}></Grid>
          </Grid>
        </Box>
      </Box>

      <Box>
        <Box width="100%" height={10}>
          {isLoading && <LinearProgress />}
        </Box>
        {bookingDetails && bookingDetails.length > 0 ? (
          <div className={classes.bookingAccordion}>
            {bookingDetails?.map(bookingDetail => (
              <Accordion className={classes.accordian}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className={classes.accordionTitleSec}>
                    <Box>
                      <Typography variant="h2">{bookingDetail.expert_name}</Typography>

                      <Label color={findStatusOfVideo(bookingDetail.status ?? 'Requested')}>
                        {bookingDetail.status ?? 'Requested'}
                      </Label>
                    </Box>
                    <Box className={classes.accordianDetail}>
                      <Typography>
                        {moment(bookingDetail.created_at).format('DD/MM/YYYY')}
                      </Typography>
                      <Typography variant="h4">$ {bookingDetail.price}</Typography>
                    </Box>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={classes.accordianDetailInner}>
                    <Typography>
                      Date: {moment(bookingDetail.created_at).format('DD/MM/YYYY')}
                    </Typography>
                    <Typography variant="h4">Price: $ {bookingDetail.price}</Typography>
                  </div>
                  <TableContainer component={Paper}>
                    <Table className={clsx(classes.table, classes.curDefault)} size="small">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell className={classes.tableCell}>
                            Service Name
                          </StyledTableCell>
                          <StyledTableCell className={classes.tableCell}>Videos</StyledTableCell>
                          <StyledTableCell className={classes.tableCell}>
                            Expert Name
                          </StyledTableCell>

                          {serviceType === 'Review' ? (
                            <StyledTableCell className={classes.tableCell}>Date</StyledTableCell>
                          ) : (
                            <StyledTableCell className={classes.tableCell}>
                              Lesson Date
                            </StyledTableCell>
                          )}
                          {isCoachOrSwimmingExpert && (
                            <StyledTableCell className={classes.tableCell}>Ratings</StyledTableCell>
                          )}
                          <StyledTableCell className={classes.tableCell}>Cost</StyledTableCell>
                          <StyledTableCell className={classes.tableCell}>Status</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {bookingDetail?.services?.map((service: any) => (
                          <>
                            {service?.videos?.map((video: any) => (
                              <StyledTableRow>
                                <StyledTableCell>{service.service_name}</StyledTableCell>
                                <StyledTableCell>{video.lv_guid_id}</StyledTableCell>
                                <StyledTableCell>{bookingDetail.expert_name}</StyledTableCell>
                                <StyledTableCell>
                                  {moment(video.created_at).format('DD/MM/YYYY')}
                                </StyledTableCell>

                                <StyledTableCell className={classes.tableCell}>
                                  $ {service.price_usd}
                                </StyledTableCell>
                                <StyledTableCell>
                                  <Label color={findStatusOfVideo(video.status ?? 'Requested')}>
                                    {video.status ?? 'Requested'}
                                  </Label>
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        ) : (
          !isLoading && (
            <TableRow>
              <TableCell colSpan={12} className={classes.bookingTable}>
                <Typography>No Bookings found</Typography>
              </TableCell>
            </TableRow>
          )
        )}

        <Card>
          {paginatedOrders?.length ? (
            <TablePagination
              className={classes.curDefault}
              component="div"
              count={memoizedOrdersData?.length || 0}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[20, 50, 100]}
            />
          ) : (
            ''
          )}
        </Card>
      </Box>
    </>
  );
};

export default Results;
