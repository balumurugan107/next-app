import {
  Button,
  CircularProgress, // CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Form, Formik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { CustomThumbnail } from 'src/constants';
import {
  getVideo,
  GetVideoResponseType,
  removeS3VideoFromState,
  updateExistingVideo
} from 'src/store/goswim/admin/video';
import { VideoListResultData } from 'src/store/newdashboard';
const useStyles = makeStyles(theme => ({
  Editmodal: {
    '& .MuiDialog-paper': {
      margin: '0px !important'
    },
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 700
    },
    '@media (max-width: 600px)': {
      '& .MuiDialog-paperScrollPaper': {
        maxHeight: 'calc(100%)',
        borderRadius: '0'
      }
    },
    borderRadius: 15,
    minHeight: 'calc(100% - 200px)',
    width: '100%'
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid #e1e1e1'
  },
  editVideo: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    marginLeft: '10px'
  },
  titleText: {
    color: theme.palette.text.primary,
    fontSize: '1.25rem'
  },
  dialogContent: {
    padding: '10px 16px'
  },
  videoDetails: {
    // minWidth: '475px',
    // maxWidth: '475px'
  },
  textDecor: {
    color: theme.palette.text.primary
  },
  cardMedia: {
    height: 350,
    width: 350
  },
  modalProgress: {
    height: '200px',
    minWidth: '500px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
}));

type PropsFunction = (event: boolean) => void;

export default function FinalVideo(props: {
  editDialogOpen: boolean;
  showFinalVideo: boolean;
  item: VideoListResultData | null | undefined;
  setOpen: PropsFunction;
  closeClicked: PropsFunction;
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const adminVideo = useSelector(state => state.adminVideo);

  // const [selectedFile, setSelectedFile] = useState<File>();
  const { showFinalVideo, item, editDialogOpen } = props;

  const [apiCalled, setApiCalled] = useState<boolean>(false);
  const innerFolder = moment().format('yyyy/MM/DD/HH/mm/ss/SSS');

  const handleClose = () => {
    dispatch(removeS3VideoFromState());
    props.closeClicked(true);
  };

  // useEffect(() => {
  //     if (showEditVideo && item) {
  //       dispatch(getVideo({ _id: item._id }));
  //     }
  //   }, [item, showEditVideo]);

  //   const filteredData: any = useSelector(state => state.adminVideo.filteredData);

  const videoData = useSelector(state => state.adminVideo.getVideo);

  // useEffect(() => {
  //     if (selectedFile && videoData) {
  //         dispatch(uploadThumbCustomToS3Bucket(selectedFile, videoData.id, innerFolder));
  //     }
  // }, [selectedFile]);

  useEffect(() => {
    if (apiCalled && adminVideo.updateVideo) {
      dispatch(removeS3VideoFromState());
      props.closeClicked(true);
    }
  }, [apiCalled, adminVideo]);

  useEffect(() => {
    if (showFinalVideo && item) {
      dispatch(removeS3VideoFromState());
      dispatch(getVideo({ _id: item._id }));
    }
  }, [item, showFinalVideo]);
  useEffect(() => {}, [videoData]);

  const handleSave = (values: GetVideoResponseType) => {
    if (adminVideo.thumbCustomUploaded) {
      var fileNameSplit = adminVideo.thumbCustomUploaded.key.split('/'); //split path
      var fileName =
        fileNameSplit?.length > 1
          ? fileNameSplit[fileNameSplit?.length - 1]
          : adminVideo.thumbCustomUploaded.key; //take file name
      var customThumb = `${innerFolder}/${fileName}`;
      values.custom_thumbnail_uid = customThumb;
    }
    setApiCalled(true);
    dispatch(updateExistingVideo(values));
  };

  const getInitialValues = () => {
    const initialValues: GetVideoResponseType = videoData
      ? { ...videoData }
      : {
          _id: '',
          state: '',
          videoUrl: '',
          thumbnailUrl: '',
          id: '',
          thumbnail_file_name: '',
          video_file_name: '',
          custom_thumbnail_uid: ''
        };
    return initialValues;
  };
  /*Uploading file to aws started here*/

  return (
    <>
      <Dialog
        open={props.editDialogOpen && props.item !== null}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.Editmodal}
      >
        <div className={classes.top}>
          <Typography variant="h5" className={classes.titleText}>
            Video Details
          </Typography>
        </div>

        <Formik<GetVideoResponseType>
          enableReinitialize
          initialValues={getInitialValues()}
          onSubmit={async values => {
            handleSave(values);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {adminVideo.isLoading && !adminVideo.isCustomThumbLoading ? (
                <div className={classes.modalProgress}>
                  <CircularProgress />
                </div>
              ) : (
                <DialogContent className={classes.dialogContent}>
                  {/* <CardMedia
                                    // className={classes.cardMedia}
                                    component="img"
                                    alt={CustomThumbnail}
                                    image={
                                        videoData?.thumbnailUrl
                                        // `https://goswimtv-production.s3.amazonaws.com/2020/11/24/09/38/48/89973bff-3763-4549-9fb5-bfa74bfcfd1d/0050 - Vertical Flutter 1.jpg`
                                    }
                                // onError={CustomThumbnail}
                                // title={props.lesson.name}
                                /> */}
                  {/* <img
                                    src={videoData?.thumbnailUrl}
                                    alt=""
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = CustomThumbnail;
                                    }}
                                    className={classes.cardMedia}
                                /> */}
                  <div className={classes.videoDetails}>
                    {/* <Typography className={classes.textDecor}>
                                        Video Details
                                    </Typography>
                                    <Divider /> */}

                    <Grid container>
                      <Grid item xs={12} className={classes.textDecor}>
                        <Grid container className={classes.videoDetails} spacing={2}>
                          <Grid item xs={4}>
                            <Typography>Name</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography>{videoData?.video_file_name}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography>Thumbnail Name</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography>{videoData?.thumbnail_file_name}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography>State</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography>{videoData?.state}</Typography>
                          </Grid>
                          {/* <Grid item xs={6}>
                                                    <Typography>Lesson</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography>Lorem Ipsum</Typography>
                                                </Grid> */}
                        </Grid>
                      </Grid>
                      {/* <Grid item xs={6} className={classes.textDecor}>
                                            <Grid container className={classes.videoDetails} spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography>Length</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography>Lorem Ipsum</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography>Job id</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography>Lorem Ipsum</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography>Encoding status</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography>Lorem Ipsum</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid> */}
                    </Grid>
                  </div>
                </DialogContent>
              )}

              <Divider />
              {!apiCalled && (
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>
                  {/* <Button variant="contained" color="primary" type="submit">
                                        Save
                                    </Button> */}
                </DialogActions>
              )}
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
