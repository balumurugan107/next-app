import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  SvgIcon,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
  TableBody
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Edit } from 'react-feather';
import EditDialogBox from 'src/views/goswim/admin/WeeklyThemes/EditWeeklyTheme';
import { getWeeklyThemes, removeAllWeeklyThemes } from 'src/store/goswim/admin/weeklyThemes';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Skeleton } from '@mui/material';
import Page from 'src/components/Page';

export interface filterList {
  title: string;
  listitems: string[];
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  viewbutton: {
    float: 'right',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    minWidth: '175px'
  },
  tableHead: {
    width: '40%',
    fontWeight: 600,
    // color: theme.palette.text.secondary,
    color: '#fff',
    padding: '10px 16px',
    borderBottom: 'none'
  },
  tableCell: {
    width: '40%',
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
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)'
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
  filterButton: {
    display: 'none',
    '@media (max-width: 600px)': {
      display: 'block',
      float: 'right'
    },
    '&:hover': {
      color: theme.palette.common.white
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
  editor: {
    '& .ql-root.ql-editor': {
      height: '100%'
    },
    '& .ql-root': {
      height: '100%'
    },

    '& .ql-editor': {
      height: '360px'
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
    marginBottom: theme.spacing(4)
  },

  responsiveTable: {
    overflowX: 'auto'
  },
  rowStyling: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.info.main
    },
    '&:hover': {
      backgroundColor: `${theme.palette.info.main} !important`
    }
  }
}));

const WeeklyThemes: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const weeklyThemesList = useSelector(state => state.adminWeeklyTheme);
  const [weeklyThemeId, setWeeklyThemeId] = useState('');
  const [open, setOpen] = React.useState(false);
  const [addEditToggle, setAddEditToggle] = React.useState('');
  const { weeklyThemesCreated, weeklyThemesUpdated, weeklyThemesDeleted, isLoading } = useSelector(
    state => state.adminWeeklyTheme
  );
  let initialRender = true;
  const initialTimeZone = useSelector(state => state.account.settings.timeZone);
  const timeZone = initialTimeZone === '' ? moment.tz.guess() : initialTimeZone;

  const handleClickOpen = (_id: string) => {
    setOpen(true);
    setAddEditToggle('Edit');
    setWeeklyThemeId(_id);
  };

  const handleWeeklyTheme = () => {
    setOpen(true);
    setAddEditToggle('New');
  };

  useEffect(() => {
    if (initialRender === true) {
      dispatch(removeAllWeeklyThemes());
      initialRender = false;
    }
    dispatch(getWeeklyThemes(undefined, timeZone));
  }, [weeklyThemesCreated, weeklyThemesUpdated, weeklyThemesDeleted]);

  return (
    <>
      <Page className={classes.root} title="Admin-WeeklyTheme">
        <Container className={classes.container}>
          <div>
            <Box>
              <div className={classes.titleContent}>
                <Typography variant="h1" className={classes.PageTitle}>
                  Weekly Themes
                </Typography>

                <Button
                  variant="contained"
                  className={classes.viewbutton}
                  onClick={handleWeeklyTheme}
                  size="small"
                >
                  NEW WEEKLY THEME
                </Button>
                <div>
                  {/* <Button
                variant="contained"
                className={classes.filterButton}
                onClick={() => setFilterModalOpen(true)}
              >
                FILTER
              </Button> */}
                </div>
              </div>
              <Grid container>
                <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }}>
                  <Card className={classes.fullHeightCard}>
                    <div className={classes.responsiveTable}>
                      <Table>
                        <TableHead className={classes.table}>
                          <TableRow>
                            <TableCell className={classes.tableHead}>Name</TableCell>
                            <TableCell className={classes.tableHead}>Schedule</TableCell>
                            <TableCell className={classes.tableHead}>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        {/* <Divider light /> */}
                        <TableBody>
                          {weeklyThemesList?.weeklyThemes?.length ? (
                            weeklyThemesList?.weeklyThemes?.map(weeklyTheme => {
                              return (
                                <TableRow key={weeklyTheme._id} className={classes.rowStyling}>
                                  <TableCell className={classes.tableCell}>
                                    {weeklyTheme.title}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {moment(weeklyTheme.updated).format('DD MMM YYYY')}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    <IconButton
                                      className={classes.IconButton}
                                      onClick={() => handleClickOpen(weeklyTheme._id)}
                                      size="large"
                                    >
                                      <SvgIcon fontSize="small">
                                        <Edit />
                                      </SvgIcon>
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          ) : isLoading ? (
                            <TableRow>
                              <TableCell colSpan={3}>
                                {[...Array(10)].map((_: any, i) => (
                                  <Skeleton height={80} key={i} />
                                ))}
                              </TableCell>
                            </TableRow>
                          ) : (
                            <TableRow>
                              <TableCell colSpan={2} align="center" className={classes.tableCell}>
                                NO WEEKLY THEMES AVAILABLE
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </div>
        </Container>
      </Page>
      {open && (
        <EditDialogBox
          open={open}
          setOpen={setOpen}
          addEditToggle={addEditToggle}
          weeklyThemeId={weeklyThemeId}
        />
      )}
    </>
  );
};

export default WeeklyThemes;
