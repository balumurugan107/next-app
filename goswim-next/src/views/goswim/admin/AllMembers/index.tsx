import {
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import SearchIcon from '@mui/icons-material/Search';
import { Pagination, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Edit } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { removeAllWeeklyThemes } from 'src/store/goswim/admin/weeklyThemes';
import { getAdminUsers, getusersFilterList, removeAllUsers } from 'src/store/goswim/admin/users';
import Page from 'src/components/Page';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { adminSignInUser } from 'src/store/goswim/account';
import LoadingScreen from 'src/components/LoadingScreen';
import { useRouter } from 'next/router';
export interface filterList {
  title: string;
  listitems: ListItem[];
}

export interface ListItem {
  value: string;
  key: string;
}

export interface ApiData {
  title: string;
  key: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  tableHead: {
    fontWeight: 600,
    color: `${theme.palette.common.white}!important`,
    padding: '10px 16px',
    borderBottom: 'none',
    '&:nth-child(1)': {
      minWidth: 150
    },
    // '&:nth-last-child(2)': {
    //   minWidth: 160
    // },
    '&:nth-last-child(1)': {
      minWidth: 140
    }
  },
  tableCell: {
    fontWeight: 1200,
    color: theme.palette.text.primary,
    padding: 16,
    '&:nth-last-child(2)': {
      textTransform: 'capitalize'
    },
    '&.iconWrapper': {
      '& svg': {
        marginRight: theme.spacing(0.75)
        // color: theme.palette.text.primary
      }
    }
  },
  PageTitle: {
    // marginBottom: '10px',
    fontSize: '1.25rem !important',
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
    padding: theme.spacing(2),
    width: 'auto',
    minWidth: '200px',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
      display: 'none'
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
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.common.white
    },
    [theme.breakpoints.down('md')]: {
      display: 'block',
      float: 'right',
      marginLeft: theme.spacing(1.5)
    }
  },
  filterModal: {
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
    padding: 0,
    marginRight: theme.spacing(1),
    '&:nth-last-child(1)': {
      marginRight: 0,
      '& svg': {
        fontSize: theme.spacing(2.75)
      }
    }
  },
  container: {
    marginBottom: theme.spacing(4)
  },

  // pagination: {
  //   // margin: theme.spacing(2),
  //   '& button': {
  //     marginBottom: theme.spacing(1)
  //   }
  // },
  filterTitle: {
    // margin: '25px',
    fontWeight: 600,
    color: theme.palette.primary.main,
    fontSize: 16,
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& span': {
      fontSize: '14px',
      color: theme.palette.text.primary,
      fontWeight: 400,
      cursor: 'pointer'
    }
  },
  filtertext: {
    // margin: '25px',
    fontWeight: 1000,
    color: theme.palette.text.primary
  },
  titleText: {
    fontWeight: 500,
    color: theme.palette.text.primary,
    marginTop: theme.spacing(1)
  },
  responsiveTable: {
    overflowX: 'auto'
  },
  filterListItem: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 2,
    color: theme.palette.text.secondary,
    cursor: 'pointer !important',
    textTransform: 'capitalize',
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.text.secondary
    }
  },
  filterListItemSelected: {
    fontSize: '0.875rem',
    lineHeight: 2,
    color: theme.palette.text.primary,
    textTransform: 'capitalize',
    fontWeight: 500,
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.text.secondary
    }
  },
  // filterButton: {
  //   display: 'none',
  //   color: theme.palette.text.secondary,
  //   marginLeft: theme.spacing(1),
  //   [theme.breakpoints.down('sm')]: {
  //     display: 'flex',
  //     float: 'right'
  //   }
  // },
  // filterModal: {
  //   top: '50%',
  //   left: '50%',
  //   '@media (max-width: 600px)': {
  //     display: 'block'
  //   }
  //   // transform: 'translate(-50%, -50%)',
  // },
  filterCardModal: {
    height: 'calc(100vh - 280px)',
    overflow: 'auto',
    padding: theme.spacing(2),
    margin: '140px 50px',
    width: 'auto',
    minWidth: '100px',
    backgroundColor: theme.palette.background.paper,
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block'
    }
  },
  resetBtn: {
    padding: 0,
    marginBottom: theme.spacing(1)
  },
  filterHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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

const AllMembers: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useRouter();
  const PER_PAGE = 15;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loginLoader, setLoginLoader] = useState(false);
  const { allUsersList, filterList, totalCount, isLoading } = useSelector(
    state => state.adminUsers
  );
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
  };
  const count = Math.ceil(totalCount / PER_PAGE);
  let initialRender = true;
  const filterValues = Object.entries(filterList);
  const [args, setArgs] = useState<any>([]);
  const FilterDataFunc = (filterType: string, filterOption: string) => {
    // window.scrollTo(0, 0);
    dispatch(removeAllUsers());
    let filterObj: any = { key: filterType, title: filterOption };
    const isExist: any = args?.filter(
      (arg: any) => arg.key === filterType && arg.title === filterOption
    );
    const argsWithoutSort = args?.filter((arg: any) => arg.key !== 'sort');
    const filterArg = args?.filter((arg: any) => arg.title !== filterOption);
    if (filterType === 'sort') {
      switch (filterOption) {
        case 'Recent':
          filterObj.key = filterType;
          filterObj.title = 'Recent';
          break;
        case 'Most Active':
          filterObj.key = filterType;
          filterObj.title = 'Most Active';
          break;
        case 'Least Active':
          filterObj.key = filterType;
          filterObj.title = 'Least Active';
          break;
        case 'Alphabetical':
          filterObj.key = filterType;
          filterObj.title = 'Alphabetical';
          break;
        case 'Reverse Alphabetical':
          filterObj.key = filterType;
          filterObj.title = 'Reverse Alphabetical';
          break;
        default:
          filterObj = {};
      }
    }
    if (filterType === 'sort' && isExist?.length < 1) {
      setArgs([...argsWithoutSort, filterObj]);
    } else if (isExist && isExist?.length > 0) {
      setArgs(filterArg);
    } else if (filterType === 'role') {
      const argsWithoutRole = args.filter((role: any) => role.key !== 'role');
      setArgs([...argsWithoutRole, filterObj]);
    } else if (filterType === 'subscription_status') {
      const argsWithoutSubscription = args.filter(
        (role: any) => role.key !== 'subscription_status'
      );
      setArgs([...argsWithoutSubscription, filterObj]);
    } else {
      setArgs((prevState: any) => [...prevState, filterObj]);
    }
    setPage(1);
  };
  // Recent; Most Active, Least Active Alphabetical Reverse Alphabetical
  const selectedFilter = (list: string, item: string) => {
    const isFilterExist = args?.filter((arg: any) => arg.key === list && arg.title === item);
    return isFilterExist && isFilterExist.length > 0;
  };
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleFilterList = () => {
    return filterValues?.map((filterValue, i) => (
      <div key={`${filterValue[0]} - (${i})`}>
        <Typography className={classes.titleText}>
          {capitalizeFirstLetter(filterValue[0])}
        </Typography>
        {filterValue[0] !== 'sort'
          ? Object.entries(filterValue[1])?.map(value => (
              <div key={value[0]}>
                <Typography
                  className={
                    selectedFilter(filterValue[0], value[0])
                      ? classes.filterListItemSelected
                      : classes.filterListItem
                  }
                  onClick={() => FilterDataFunc(filterValue[0], value[0])}
                >
                  {`${value[0]} (${value[1]})`}
                </Typography>
              </div>
            ))
          : filterValue[1]?.map((sortValue: any) => (
              <div key={sortValue}>
                <Typography
                  className={
                    selectedFilter(filterValue[0], sortValue)
                      ? classes.filterListItemSelected
                      : classes.filterListItem
                  }
                  onClick={() => FilterDataFunc(filterValue[0], sortValue)}
                >
                  {sortValue}
                </Typography>
              </div>
            ))}
        <br />
      </div>
    ));
  };

  useEffect(() => {
    if (initialRender === true) {
      dispatch(removeAllWeeklyThemes());
      initialRender = false;
    }
    dispatch(getAdminUsers({ page: page, limit: PER_PAGE, filter: args, search: query }));
  }, [page, query, args]);
  useEffect(() => {
    dispatch(getusersFilterList());
  }, []);

  const handleReset = () => {
    setArgs([]);
    setPage(1);
  };

  if (loginLoader) {
    return <LoadingScreen />;
  }
  return (
    <Page title="Admin-Users">
      <Container className={classes.container}>
        <>
          <div className={classes.titleContent}>
            <Typography variant="h1" className={classes.PageTitle}>
              USERS
            </Typography>
            <TextField
              id="outlined-number"
              label="Search Users"
              name="position"
              type="text"
              size="small"
              onChange={e => setQuery(e.target.value)}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />

            <div>
              <Button
                variant="contained"
                className={classes.filterButton}
                onClick={() => setFilterModalOpen(true)}
              >
                FILTER
              </Button>
            </div>
            <div>
              {/* <Button
                variant="contained"
                className={classes.filterButton}
                odispatch(adminSignInUser(user._id, history))nClick={() => setFilterModalOpen(true)}
              >
                FILTER
              </Button> */}
            </div>
          </div>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={8}
              lg={9}
              sx={{ pt: 0 }}
              style={{ width: '100%', paddingTop: 0 }}
            >
              <Card className={classes.fullHeightCard}>
                <div className={classes.responsiveTable}>
                  <Table>
                    <TableHead className={classes.table}>
                      <TableRow>
                        <TableCell className={classes.tableHead}>Name</TableCell>
                        <TableCell className={classes.tableHead}>Email</TableCell>
                        <TableCell className={classes.tableHead}>Role</TableCell>
                        <TableCell className={classes.tableHead}>Status</TableCell>
                        <TableCell className={classes.tableHead}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    {/* <Divider light /> */}
                    <TableBody>
                      {allUsersList && allUsersList.length > 0
                        ? allUsersList?.map((user, i) => {
                            return (
                              <TableRow key={`userList(${i})`} className={classes.rowStyling}>
                                <TableCell className={classes.tableCell}>
                                  {user.full_name}
                                </TableCell>
                                <TableCell className={classes.tableCell}>{user.email}</TableCell>
                                <TableCell className={classes.tableCell}>{user.role}</TableCell>
                                <TableCell className={classes.tableCell}>{user.status}</TableCell>
                                <TableCell className={`${classes.tableCell} iconWrapper`}>
                                  <IconButton
                                    className={classes.IconButton}
                                    size="large"
                                    onClick={() => {
                                      setLoginLoader(true);
                                      dispatch(adminSignInUser(user._id, history));
                                    }}
                                  >
                                    <SvgIcon>
                                      <VpnKeyOutlinedIcon />
                                    </SvgIcon>
                                  </IconButton>
                                  <IconButton
                                    className={classes.IconButton}
                                    onClick={
                                      () =>
                                        history.push({
                                          pathname: `members/edit/${user._id}`,
                                        })
                                      // getSelecterUser(i)
                                    }
                                    size="large"
                                  >
                                    <SvgIcon fontSize="small">
                                      <Edit />
                                    </SvgIcon>
                                  </IconButton>
                                  <IconButton
                                    className={classes.IconButton}
                                    onClick={
                                      () =>
                                        history.push({
                                          pathname: `members/view/${user._id}`,
                                          query: { from: 'admin' }
                                        })
                                      // getSelecterUser(i)
                                    }
                                    size="large"
                                  >
                                    <SvgIcon fontSize="small">
                                      <VisibilityOutlinedIcon />
                                    </SvgIcon>
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        : isLoading
                        ? [...Array(10)].map((_: any, i) => (
                            <TableRow key={`skeleton(${i})`}>
                              <TableCell colSpan={5}>
                                <Skeleton height={80} />
                              </TableCell>
                            </TableRow>
                          ))
                        : !isLoading && (
                            <TableRow>
                              <TableCell colSpan={5} align="center" className={classes.tableCell}>
                                No Results Found
                              </TableCell>
                            </TableRow>
                          )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={5}>
                          <Pagination
                            count={count}
                            variant="outlined"
                            shape="rounded"
                            boundaryCount={1}
                            size="small"
                            page={page}
                            onChange={(_, page) => {
                              dispatch(removeAllUsers());
                              window.scrollTo(0, 0);
                              setPage(page);
                            }}
                            // className={classes.pagination}
                          />
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </Card>
            </Grid>
            <Grid item lg={3} md={4} style={{ paddingTop: 0 }}>
              <Card className={classes.filterCard}>
                <div className={classes.filterHeader}>
                  <Typography className={classes.filterTitle}>FILTERS</Typography>
                  {args.length ? (
                    <Button className={classes.resetBtn} variant="outlined" onClick={handleReset}>
                      RESET
                    </Button>
                  ) : (
                    ''
                  )}
                </div>
                <div className={classes.filtertext}>
                  {filterList && Object.keys(filterList)?.length < 1 ? (
                    <>
                      {[...Array(20)].map((_: any, i) => (
                        <Skeleton height={25} key={i} />
                      ))}
                      <br />
                    </>
                  ) : (
                    handleFilterList()
                  )}
                </div>
              </Card>
            </Grid>
          </Grid>

          {/* mobile filter */}
          <Modal
            open={filterModalOpen}
            onClose={handleFilterModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.filterModal}
          >
            <Card className={classes.filterCardModal}>
              <div className={classes.filterHeader}>
                <Typography className={classes.filtertext}>FILTERS</Typography>
                {args.length! ? (
                  <Button className={classes.resetBtn} variant="outlined" onClick={handleReset}>
                    RESET
                  </Button>
                ) : (
                  ''
                )}
              </div>
              <div className={classes.filtertext}>
                {filterList && Object.keys(filterList)?.length < 1 ? (
                  <>
                    {[...Array(20)].map((_: any, i) => (
                      <Skeleton height={25} key={i} />
                    ))}
                    <br />
                  </>
                ) : (
                  handleFilterList()
                )}
              </div>
            </Card>
          </Modal>
        </>
      </Container>
    </Page>
  );
};

export default AllMembers;
