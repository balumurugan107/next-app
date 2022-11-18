import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  Hidden,
  IconButton,
  Modal,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Pagination, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Edit, Eye } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewVideo,
  CreateVideoType,
  getFilteredVideosCount,
  getVideosList,
  removeS3VideoFromState,
  uploadVideoToS3Bucket
} from 'src/store/goswim/admin/video';
import { removeAllVideos, VideoListResultData } from 'src/store/newdashboard';
import EditVideo from './EditVideo';
import FinalVideo from './FinalVideo';
import Page from 'src/components/Page';
import { getFilteredVideosCounts } from 'src/store/newdashboard/admin/videos';

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
  Topcard: {
    height: '30px'
  },
  viewbutton: {
    float: 'right',
    width: 150,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white
  },

  progressCenter: {
    float: 'right',
    width: 150,
    height: 35,
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  chooseFileInput: {
    float: 'right',
    display: 'none',
    marginTop: '13px'
  },
  tableHead: {
    width: '80%',
    fontWeight: 1200,
    padding: '10px 16px',
    color: '#fff !important'
  },
  tableCell: {
    width: '80%',
    fontWeight: 1200,
    padding: '16px !important',
    color: `${theme.palette.text.primary} !important`
  },
  PageTitle: {
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
    width: '100%'
  },

  fullWidth: {
    width: '100%'
  },

  formControl: {
    marginRight: theme.spacing(1),
    minWidth: 250
  },
  Choosefile: {
    color: 'white',
    marginTop: theme.spacing(2),
    background: theme.palette.primary.main
  },
  caution: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  customthumb: {
    marginTop: '15px',
    marginBottom: '35px'
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 8
  },
  Deletebutton: {
    margin: '10px',
    '@media (max-width: 600px)': {
      maxWidth: '180px'
    }
  },
  Editmodal: {
    '& .MuiDialog-paper': {
      margin: '0px !important'
    },
    '@media (max-width: 600px)': {
      '& .MuiDialog-paperScrollPaper': {
        maxHeight: 'calc(100%)',
        borderRadius: '0'
      }
    }
  },
  centralDiv: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  filterCard: {
    padding: 16,
    marginLeft: 16,
    // margin: '10px',
    width: 'auto',
    minWidth: '200px',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  filterCardModal: {
    width: 'auto',
    minWidth: '100px',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      transform: 'translate(-50%, -50%)'
    }
  },
  filtertext: {
    // margin: '25px',
    fontWeight: 1000,
    color: theme.palette.text.primary
  },
  titleContent: {
    width: '100%',
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
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      float: 'left'
    },
    '&:hover': {
      color: theme.palette.common.white
    }
  },
  filterModal: {
    top: '50%',
    left: '50%'
    // transform: 'translate(-50%, -50%)',
  },
  selectField: {
    height: '50px',
    marginRight: theme.spacing(1)
  },
  textField: {
    heigth: '45px !important'
  },
  selectSpacing: {
    marginBottom: theme.spacing(1)
  },

  titleText: {
    fontWeight: 500,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5)
  },
  filterTitle: {
    // margin: '25px',
    fontWeight: 600,
    color: theme.palette.primary.main,
    fontSize: 16,
    marginBottom: theme.spacing(1)
  },
  dialogTitle: {
    color: theme.palette.text.primary,
    fontSize: '1.25rem'
  },
  pagination: {
    '& button': {
      marginBottom: theme.spacing(1)
    }
  },
  container: {
    marginBottom: theme.spacing(4)
  },

  box: {
    width: '100%',
    padding: 0
  },
  filterListItem: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 2,
    color: theme.palette.text.secondary,
    cursor: 'pointer !important'
  },
  filterListItemSelected: {
    fontSize: '0.875rem',
    lineHeight: 2,
    fontWeight: 500,
    cursor: 'pointer !important'
  },
  desc: {
    fontSize: 16,
    padding: '0 0 10px 0',
    width: '100%',
    float: 'left'
  },
  IconButton: {
    padding: 0,
    marginRight: theme.spacing(2)
  },

  filterHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  resetBtn: {
    padding: 0,
    marginBottom: theme.spacing(1)
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
  rowStyling: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.info.main
    },
    '&:hover': {
      backgroundColor: `${theme.palette.info.main} !important`
    }
  }
}));

const Videos: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const videoData = useSelector(state => state.adminVideo.videoList);
  const videoUploadedState = useSelector(state => state.adminVideo);
  const PER_PAGE = 10;
  const count = Math.ceil(videoData.totalCount / PER_PAGE);
  const [page, setPage] = useState(1);
  const { isVideoCreated, isVideoUpdated, isVideoDeleted, isLoading } = useSelector(
    state => state.adminVideo
  );
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [finalDialogOpen, setFinalDialogOpen] = useState(false);
  const [editClickedItem, setEditClickedItem] = useState<VideoListResultData>();
  const [finalClickedItem, setFinalClickedItem] = useState<VideoListResultData>();
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filterData, setFilterData] = useState<ApiData[]>([]);
  const [uniqueID, setUniqueID] = useState<number>(0);
  let initialRender = true;
  const [selectedFile, setSelectedFile] = useState<File>();
  const [apiCalled, setApiCalled] = useState<boolean>();
  let intervalHandler: NodeJS.Timeout | null = null;
  const filteredData: any = useSelector(state => state.adminVideo.filteredData);
  useEffect(() => {
    if (selectedFile) {
      const date = new Date();
      const millis = +date;
      setUniqueID(millis);
      clearInterval(intervalHandler!);
      intervalHandler = null;
      dispatch(removeS3VideoFromState());
      if (selectedFile.type === 'video/mp4')
        dispatch(uploadVideoToS3Bucket(selectedFile, millis, 'original'));
      else dispatch(uploadVideoToS3Bucket(selectedFile, millis, 'original'));

      // getImageThumb(selectedFile, millis);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (
      !apiCalled &&
      videoUploadedState.videoUploaded
      // videoUploadedState.thumbLargeUploaded.length > 4
    ) {
      setApiCalled(true);
      var fileNameSplit = videoUploadedState.videoUploaded.key.split('/'); //split path
      var filename =
        fileNameSplit?.length > 1
          ? fileNameSplit[fileNameSplit?.length - 1]
          : videoUploadedState.videoUploaded.key; //take file name
      const createVideo: CreateVideoType = {
        id: uniqueID,
        video_file_name: filename
      };
      dispatch(createNewVideo(createVideo));
    }
  }, [videoUploadedState]);

  useEffect(() => {
    if (initialRender === true) {
      dispatch(removeAllVideos());
      initialRender = false;
    }
    dispatch(
      getVideosList({
        page: page,
        limit: 10,
        filterData
      })
    );
  }, [page, filterData, isVideoCreated, isVideoUpdated, isVideoDeleted]);

  useEffect(() => {
    dispatch(getFilteredVideosCounts())
    // dispatch(getFilteredVideosCount());
  }, []);
  useEffect(() => {
    dispatch(removeS3VideoFromState());
    setApiCalled(false);
  }, [isVideoCreated, isVideoUpdated, isVideoDeleted]);
  /*Uploading file to aws started here*/

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;

    if (target != null) {
      const item: File = (target.files as FileList)[0];
      setSelectedFile(item);
    }
  };

  /*Uploading file to aws ended here*/

  const sampleObject: filterList[] = [
    {
      title: 'Order',
      listitems: [
        {
          value: 'Created At',
          key: 'created_at'
        },
        {
          value: 'Updated At',
          key: 'updated_at'
        }
      ]
    },
    {
      title: 'State',
      listitems: [
        {
          value: `Finished(${filteredData?.[0]?.state?.finished ? filteredData?.[0]?.state?.finished : 0
            })`,
          key: 'finished'
        },
        {
          value: `Failed(${filteredData?.[0]?.state?.failed ? filteredData?.[0]?.state?.failed : 0
            })`,
          key: 'failed'
        },
        {
          value: `Unsubmitted(${filteredData?.[0]?.state?.unsubmitted ?? 0})`,
          key: 'unsubmitted'
        }
      ]
    },
    {
      title: 'Assignment',
      listitems: [
        {
          value: `Assigned(${filteredData?.[0]?.assignment?.assigned ? filteredData?.[0]?.assignment?.assigned : 0
            })`,
          key: '1'
        },
        {
          value: `Unassigned(${filteredData?.[0]?.assignment?.unassigned
              ? filteredData?.[0]?.assignment?.unassigned
              : 0
            })`,
          key: '0'
        }
      ]
    }
  ];

  const handleEditDialogCloseClick = () => {
    setEditDialogOpen(false);
  };

  const handleFinalDialogCloseClick = () => {
    setFinalDialogOpen(false);
  };

  const handleFinalDialogOpenClick = (video: VideoListResultData) => {
    setFinalClickedItem(video);
    setFinalDialogOpen(true);
  };
  const handleEditDialogOpenClick = (video: VideoListResultData) => {
    setEditClickedItem(video);
    setEditDialogOpen(true);
  };

  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
  };

  function truncate(input: string) {
    if (input.length > 20) {
      return input.substring(0, 20) + '...' + input.slice(-4);
    }
    return input;
  }

  const FilterDataFunc = (items: any, listitem: any) => {
    let commentData = {} as ApiData;
    commentData.title = items.title;
    commentData.key = listitem.key;
    const orderExist = filterData?.filter(order => order.title === 'Order');
    const AssignmentExist = filterData?.filter(assignment => assignment.title === 'Assignment');
    if (items.title === 'Order' && orderExist) {
      if (listitem.key === 'created_at') {
        listitem.key = 'updated_at';
      } else listitem.key = 'created_at';
    }
    if (items.title === 'Assignment' && AssignmentExist) {
      if (listitem.key === '0') {
        listitem.key = '1';
      } else listitem.key = '0';
    }
    const isExist = filterData?.filter(
      filterItem => filterItem.key === listitem.key && filterItem.title === items.title
    );
    if (isExist && isExist.length > 0) {
      const removedList = filterData?.filter(filterItem => filterItem.key !== listitem.key);
      if (listitem.key === '0') {
        removedList.push({
          key: '1',
          title: 'Assignment'
        });
      } else if (listitem.key === '1') {
        removedList.push({
          key: '0',
          title: 'Assignment'
        });
      }

      if (listitem.key === 'created_at') {
        removedList.push({
          key: 'updated_at',
          title: 'Order'
        });
      } else if (listitem.key === 'updated_at') {
        removedList.push({
          key: 'created_at',
          title: 'Order'
        });
      }
      setFilterData(removedList);
      setPage(1);
    } else {
      const dataWithoutState = filterData.filter(data => data.title !== 'State');
      const filter = [...dataWithoutState, commentData];
      setFilterData(filter);
      setPage(1);
    }
  };

  const handleReset = () => {
    setFilterData([]);
    setPage(1);
  };

  const selectedFilter = (items: any, listitem: any) => {
    const isExist = filterData?.filter(
      filterItem => filterItem.key === listitem.key && filterItem.title === items.title
    );
    return isExist && isExist.length > 0;
  };

  return (
    <>
      <EditVideo
        editDialogOpen={editDialogOpen}
        showEditVideo={editDialogOpen}
        item={editClickedItem}
        setOpen={setEditDialogOpen}
        closeClicked={handleEditDialogCloseClick}
      />
      <FinalVideo
        editDialogOpen={finalDialogOpen}
        showFinalVideo={finalDialogOpen}
        item={finalClickedItem}
        setOpen={setFinalDialogOpen}
        closeClicked={handleFinalDialogCloseClick}
      />
      <Page title="Admin-Videos">
        <Container className={classes.container}>
          <div>
            <Box p={2} className={classes.box}>
              <Grid container>
                <Grid item className={classes.fullWidth}>
                  <div className={classes.titleContent}>
                    <Typography variant="h1" className={classes.PageTitle}>
                      Videos
                    </Typography>

                    <div>
                      {videoUploadedState.isLoading && (
                        <div className={classes.progressCenter}>
                          <CircularProgress color="secondary" disableShrink />
                        </div>
                      )}
                      {videoUploadedState.isLoading !== true && (
                        <div>
                          <input
                            className={classes.chooseFileInput}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              handleFileInput(e)
                            }
                            id="contained-button-file"
                            type="file"
                            accept=".mov, video/*"
                          />
                          <label htmlFor="contained-button-file">
                            <Button
                              variant="contained"
                              component="span"
                              className={classes.viewbutton}
                            >
                              CHOOSE FILE
                            </Button>
                          </label>
                        </div>
                      )}
                    </div>

                    <div>
                      <Button
                        variant="contained"
                        className={classes.filterButton}
                        onClick={() => setFilterModalOpen(true)}
                      >
                        FILTER
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item lg={9} md={8} className={classes.fullWidth}>
                  <Card className={classes.fullHeightCard}>
                    <Table>
                      <TableHead className={classes.table}>
                        <TableRow>
                          <TableCell className={classes.tableHead}>Name</TableCell>
                          <TableCell className={classes.tableHead}>Actions</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {!isLoading ? (
                          videoData?.results?.length ? (
                            videoData?.results?.map(video => {
                              return (
                                <TableRow key={video._id} className={classes.rowStyling}>
                                  <TableCell className={classes.tableCell}>
                                    <Hidden lgDown>{video.video_file_name}</Hidden>
                                    <Hidden lgUp>{truncate(video.video_file_name)}</Hidden>
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    <IconButton
                                      className={classes.IconButton}
                                      onClick={() => handleEditDialogOpenClick(video)}
                                      size="large"
                                    >
                                      <SvgIcon fontSize="small">
                                        <Edit />
                                      </SvgIcon>
                                    </IconButton>
                                    <IconButton
                                      onClick={() => handleFinalDialogOpenClick(video)}
                                      className={classes.IconButton}
                                      size="large"
                                    >
                                      <SvgIcon fontSize="small">
                                        <Eye />
                                      </SvgIcon>
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          ) : (
                            <TableRow>
                              <TableCell colSpan={2} align="center" className={classes.tableCell}>
                                NO VIDEOS AVAILABLE
                              </TableCell>
                            </TableRow>
                          )
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2}>
                              {[...Array(10)].map((_: any, i) => (
                                <Skeleton height={80} key={i} animation="wave" />
                              ))}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={2}>
                            <Pagination
                              count={count}
                              variant="outlined"
                              shape="rounded"
                              boundaryCount={1}
                              size="small"
                              page={page}
                              onChange={(_, page) => {
                                window.scrollTo(0, 0);
                                setPage(page);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </Card>
                </Grid>
                {/* <Box> */}
                <Grid item lg={3} md={4}>
                  <Card className={classes.filterCard}>
                    <div className={classes.filterHeader}>
                      <Typography className={classes.filterTitle}>FILTERS</Typography>
                      {filterData.length > 0 ? (
                        <Button
                          className={classes.resetBtn}
                          variant="outlined"
                          onClick={handleReset}
                        >
                          RESET
                        </Button>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className={classes.filtertext}>
                      {!(filteredData.length > 0) ? (
                        <div>
                          {sampleObject?.map((objItems, i) => (
                            <div key={i}>
                              <Skeleton height={25} width="auto" key={i} animation="wave" />
                              {objItems?.listitems?.map((_, index) => (
                                <Skeleton height={25} animation="wave" key={index} />
                              ))}
                              <br />
                            </div>
                          ))}
                        </div>
                      ) : (
                        sampleObject?.map(items => {
                          return (
                            <div key={items.title}>
                              <Typography className={classes.titleText} key={items.title}>
                                {items.title}
                              </Typography>
                              {items.listitems?.map(listitem => (
                                <Typography
                                  onClick={() => FilterDataFunc(items, listitem)}
                                  className={
                                    selectedFilter(items, listitem)
                                      ? classes.filterListItemSelected
                                      : classes.filterListItem
                                  }
                                  key={listitem.key}
                                >
                                  {listitem.value}
                                </Typography>
                              ))}
                              <br />
                            </div>
                          );
                        })
                      )}
                    </div>
                  </Card>
                </Grid>
              </Grid>
              {/* </Box> */}
            </Box>
            {/* filter modal */}
            <Modal
              open={filterModalOpen}
              onClose={handleFilterModalClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              className={classes.filterModal}
            >
              <Card className={classes.filterCardModal}>
                <div className={classes.filterHeader}>
                  <Typography className={classes.filterTitle}>FILTERS</Typography>
                  {filterData?.length > 0 ? (
                    <Button className={classes.resetBtn} variant="outlined" onClick={handleReset}>
                      RESET
                    </Button>
                  ) : (
                    ''
                  )}
                </div>
                <div className={classes.filtertext}>
                  {sampleObject?.map(items => {
                    return (
                      <div key={items.title}>
                        <Typography className={classes.titleText} key={items.title}>
                          {items.title}
                        </Typography>

                        {items?.listitems?.map(listitem => (
                          <Typography
                            onClick={() => FilterDataFunc(items, listitem)}
                            className={
                              selectedFilter(items, listitem)
                                ? classes.filterListItemSelected
                                : classes.filterListItem
                            }
                            key={listitem.key}
                          >
                            {listitem.value}
                          </Typography>
                        ))}
                        <br />
                      </div>
                    );
                  })}
                </div>
              </Card>
            </Modal>
            {/* filter modal */}
          </div>
        </Container>
      </Page>
    </>
  );
};

export default Videos;
