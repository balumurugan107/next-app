import React, { useEffect, useState } from 'react';
import * as fns from 'date-fns';
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
  TableBody,
  TextField,
  TableContainer,
  // TableFooter
  Paper
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { DateRange, DateRangePicker } from 'materialui-daterange-picker';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CancelIcon from '@mui/icons-material/Cancel';
import GetAppIcon from '@mui/icons-material/GetApp';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStatistics,
  removeAllStatisticState,
  statisticsArgs
} from 'src/store/goswim/admin/statistics';
import { Pagination, Skeleton } from '@mui/material';
import { store } from 'src/store';
import Page from 'src/components/Page';
import config from 'src/config';
export interface filterList {
  title: string;
  listitems: string[];
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  tableHead: {
    fontWeight: 600,
    // color: theme.palette.text.secondary,
    color: '#fff',
    padding: '10px 16px',
    borderBottom: 'none'
  },
  tableCell: {
    fontWeight: 1200,
    color: theme.palette.text.primary,
    padding: 16
  },
  PageTitle: {
    // marginBottom: '10px',
    fontSize: '1.25rem',
    color: theme.palette.text.primary,
    fontWeight: 500,
    width: '100%',
    margin: '0',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1)
    }
  },
  fullHeightCard: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
    overflowX: 'auto'
    // margin: 10,
    // padding: 16
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  filterCard: {
    marginTop: '10px',
    width: 'auto',
    minWidth: '200px',
    backgroundColor: '#fff',
    '@media (max-width: 600px)': {
      display: 'block'
    }
  },
  titleContent: {
    width: '100%',
    float: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '16px 0',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },
  downloadButton: {
    background: theme.palette.primary.main,
    color: '#fff',
    padding: '8px 16px',
    borderRadius: 4,
    marginBottom: theme.spacing(2),
    '& svg': {
      marginRight: theme.spacing(0.5)
    },
    '&:hover': {
      background: 'rgb(15, 69, 109) !important'
    }
  },
  filterModal: {
    top: '50%',
    left: '50%',
    '@media (max-width: 600px)': {
      display: 'block'
    }
    // transform: 'translate(-50%, -50%)',
  },
  card: {
    height: '100%',
    '& .quill.makeStyles-root-94.makeStyles-editor-56': {
      height: '100%'
    }
  },

  table: {
    '& .MuiTableRow-head': {
      background: theme.palette.primary.main,
      color: '#fff'
    },
    '& .MuiTableHead-root': {
      color: theme.palette.text.secondary
    }
  },
  IconButton: {
    padding: 0
  },
  container: {
    marginBottom: theme.spacing(8),
    minHeight: 'calc(100vh - 350px)'
  },
  dateSelector: {
    marginBottom: theme.spacing(2)
  },
  resultWrapper: {
    marginBottom: theme.spacing(3)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  dateRangePickerWrapper: {
    position: 'absolute !important' as any
  },
  resultTable: {
    '& th': {
      fontWeight: 600,
      whiteSpace: 'nowrap'
      // wordBreak: 'break'
    }
  },
  noResult: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pagination: {
    margin: theme.spacing(2),
    '& button': {
      marginBottom: theme.spacing(1)
    }
  },
  rowStyling: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.info.main
    },
    '&:hover': {
      backgroundColor: `${theme.palette.info.main} !important`
    }
  },
  skeletonLoader: {
    width: 1200
  },
  subSkeletonLoader: {
    width: '100%'
  }
}));

const Statistics: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState({});
  const { statistics } = useSelector(state => state);
  const { isLoading } = statistics;
  const dispatch = useDispatch();
  const [downloadURL, setDownloadURL] = useState('');
  const initialTimeZone = useSelector(state => state.account.settings.timeZone);
  const localtz = initialTimeZone === '' ? moment.tz.guess() : initialTimeZone;
  const [args, setArgs] = useState<statisticsArgs>({
    page: 1,
    limit: 10,
    start_date: 0,
    end_date: 0,
    tz: localtz
  });
  const dateFormat = 'dd-MM-yyyy';
  const toggle = () => setOpen(!open);
  const handleDateRange = (dateRange: DateRange) => {
    const startDate = dateRange?.startDate
      ? fns.format(dateRange.startDate, dateFormat)
      : undefined;
    const endDate = dateRange?.endDate ? fns.format(dateRange.endDate, dateFormat) : undefined;
    return startDate || endDate ? `${startDate} - ${endDate}` : '';
  };
  const totalPages: number = Math.ceil(statistics.totalCount / 10);
  const handleSetRange = (range: any) => {
    setDateRange(range);
    const start_date = moment(range.startDate)
      .local()
      .startOf('day')
      .valueOf();
    const end_date = moment(range.endDate)
      .local()
      .endOf('day')
      .valueOf();
    setArgs((prev: any) => ({ ...prev, start_date: start_date, end_date: end_date }));
  };
  useEffect(() => {
    if (args.start_date) {
      dispatch(getStatistics(args));
    } else dispatch(removeAllStatisticState());
    let startDate = '';
    let endDate = '';
    // url generation
    if (args.start_date) {
      startDate = `&start_date=${args.start_date}`;
    }
    if (args.end_date) {
      endDate = `&end_date=${args.end_date}`;
    }
    if (startDate && endDate)
      fetch(
        `${config.api.default.url}/api/v1/statistics/exportcsv?page=${args.page}&limit=${args.limit}${startDate}${endDate}&tz=${localtz}`,
        { headers: { Authorization: `Bearer ${store?.getState()?.account?.token}` } }
      )
        .then(res => {
          return res.blob();
        })
        .then(blob => {
          const csvURL = window.URL.createObjectURL(blob);
          setDownloadURL(csvURL);
          // Use `filename` here e.g. with file-saver:
          // saveAs(blob, filename);
        });
  }, [args]);

  const onDownload = () => {
    const link = document.createElement('a');
    link.download = `statistic.csv`;
    link.href = downloadURL;
    link.click();
  };

  const handleReset = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(removeAllStatisticState());
    setOpen(false);
    setArgs((prev: any) => ({ ...prev, start_date: 0, end_date: 0 }));
    setDateRange({});
  };

  return (
    <>
      <Page title="Admin-Statistics">
        <Container className={classes.container}>
          <div>
            <Box>
              <div className={classes.titleContent}>
                <Typography variant="h1" className={classes.PageTitle}>
                  Statistics
                </Typography>
                {/* <div>
                <Button
                  variant="contained"
                  className={classes.filterButton}
                  onClick={() => setFilterModalOpen(true)}
                >
                  FILTER
                </Button>
              </div> */}
              </div>
              <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    id="date-range"
                    label="Select Date Range"
                    variant="outlined"
                    className={classes.dateSelector}
                    onClick={() => setOpen(true)}
                    value={handleDateRange(dateRange)}
                    InputProps={{
                      endAdornment: (
                        <>
                          {args.start_date && args.end_date ? (
                            <IconButton>
                              <CancelIcon onClick={e => handleReset(e)} />
                            </IconButton>
                          ) : (
                            ''
                          )}
                          <IconButton>
                            <DateRangeIcon />
                          </IconButton>
                        </>
                      )
                    }}
                  />
                  {open && (
                    <DateRangePicker
                      open={open}
                      toggle={toggle}
                      wrapperClassName={classes.dateRangePickerWrapper}
                      onChange={range => {
                        handleSetRange(range);

                        toggle();
                      }}
                      initialDateRange={dateRange}
                    />
                  )}
                  {args.start_date && args.end_date ? (
                    <Button className={classes.downloadButton} onClick={() => onDownload()}>
                      <GetAppIcon />
                      Download File
                    </Button>
                  ) : (
                    ''
                  )}
                </Grid>
                {Object.keys(dateRange)?.length > 1 && !statistics.isLoading ? (
                  <Grid item xs={12} md={5} className={classes.resultWrapper}>
                    {/* <Typography variant="h4" className={classes.title}>
                  Results
                </Typography> */}
                    <TableContainer className={classes.fullHeightCard} component={Paper}>
                      {statistics.from ? (
                        <Table size="small" className={classes.resultTable}>
                          <TableHead>
                            <TableRow>
                              <TableCell>Item</TableCell>
                              <TableCell>Description</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>From</TableCell>
                              <TableCell>{statistics.from}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>To</TableCell>
                              <TableCell>{statistics.to}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Action</TableCell>
                              <TableCell>{statistics.action}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Revenue</TableCell>
                              <TableCell>{statistics.revenue}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Liability</TableCell>
                              <TableCell>{statistics.liability}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Total</TableCell>
                              <TableCell>{statistics.totalCount}</TableCell>
                            </TableRow>
                          </TableBody>
                          {/* <Divider light /> */}
                        </Table>
                      ) : (
                        <div className={classes.noResult}>
                          <Typography variant="h5">No Results Found</Typography>
                        </div>
                      )}
                    </TableContainer>
                  </Grid>
                ) : (
                  isLoading && (
                    <>
                      <Grid item xs={12} md={5} className={classes.resultWrapper}>
                        <Card className={classes.fullHeightCard}>
                          <Table>
                            <TableRow>
                              {/* <TableCell> */}
                              <TableCell className={classes.subSkeletonLoader}>
                                {[...Array(8)].map((_: any, i) => (
                                  <Skeleton height={25} key={i} />
                                ))}
                                {/* </TableCell> */}
                              </TableCell>
                            </TableRow>
                          </Table>
                        </Card>
                      </Grid>
                    </>
                  )
                )}
              </Grid>
              {statistics?.statisticsList && statistics.statisticsList?.length > 0 ? (
                <Card className={classes.fullHeightCard}>
                  <Table>
                    <TableHead className={classes.table}>
                      <TableRow>
                        <TableCell className={classes.tableHead}>Name</TableCell>
                        <TableCell className={classes.tableHead}>Percent Of Views</TableCell>
                        <TableCell className={classes.tableHead}>Split</TableCell>
                        <TableCell className={classes.tableHead}>Attributable Revenue</TableCell>
                        <TableCell className={classes.tableHead}>Split Revenue</TableCell>
                        <TableCell className={classes.tableHead}>Count</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {statistics.statisticsList.map(statistics => (
                        <TableRow key={statistics.name} className={classes.rowStyling}>
                          <TableCell>{statistics.name}</TableCell>
                          <TableCell>{statistics.percentOfViews}</TableCell>
                          <TableCell>{statistics.split}</TableCell>
                          <TableCell>{statistics.attributeRevenue}</TableCell>
                          <TableCell>{statistics.splitRevenue}</TableCell>
                          <TableCell>{statistics.courseViewCount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    {/* <TableFooter> */}

                    {/* </TableFooter> */}
                    {/* <Divider light /> */}
                  </Table>
                  <Pagination
                    count={totalPages}
                    variant="outlined"
                    shape="rounded"
                    boundaryCount={1}
                    size="small"
                    page={args.page}
                    onChange={(_, page) => {
                      setArgs((prev: any) => ({ ...prev, page: page }));
                    }}
                    className={classes.pagination}
                  />
                </Card>
              ) : (
                isLoading && (
                  <>
                    <Card className={classes.fullHeightCard}>
                      <Table>
                        <TableRow>
                          <TableCell>
                            <div className={classes.skeletonLoader}>
                              {[...Array(10)].map((_: any, i) => (
                                <Skeleton height={80} key={i} />
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      </Table>
                    </Card>
                  </>
                )
              )}
            </Box>
          </div>
        </Container>
      </Page>
    </>
  );
};

export default Statistics;
