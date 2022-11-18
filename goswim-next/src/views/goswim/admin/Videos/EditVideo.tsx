import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import { VideoListResultData } from 'src/store/newdashboard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVideo,
  GetVideoResponseType,
  removeS3VideoFromState,
  updateExistingVideo,
  uploadThumbCustomToS3Bucket
} from 'src/store/goswim/admin/video';
import moment from 'moment';
import * as Yup from 'yup';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ConfirmDelete from './ConfirmDelete';
const useStyles = makeStyles(theme => ({
  Editmodal: {
    '& .MuiDialog-paper': {
      margin: '0px !important'
    },
    '@media (max-width: 600px)': {
      '& .MuiDialog-paperScrollPaper': {
        maxHeight: 'calc(100%)',
        borderRadius: '0'
      }
    },
    borderRadius: 15,
    minHeight: 'calc(100% - 286px)',
    width: '100%'
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid #e1e1e1'
  },
  dialogTitle: {
    color: theme.palette.text.primary
  },
  Deletebutton: {
    '@media (max-width: 600px)': {
      maxWidth: '180px'
    }
  },
  titleText: {
    color: theme.palette.text.primary,
    fontSize: '1.25rem',
  },
  caution: {
    margin: '10px 0'
  },
  parentSelectSpacing: {
    marginTop: 10
  },
  selectSpacing: {
    // marginBottom: theme.spacing(1)
  },
  formControl: {
    marginRight: theme.spacing(1),
    minWidth: 250
  },
  selectField: {
    height: '50px',
    marginRight: theme.spacing(1)
  },
  customthumb: {
    margin: '16px 0'
  },
  Choosefile: {
    color: theme.palette.common.white,
    background: theme.palette.primary.main
  },
  chooseFileDiv: {
    marginTop: theme.spacing(2)
  },

  chooseFileInput: {
    display: 'none'
  },
  progressCenter: {
    width: 150,
    height: 35,
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },

  textField: {
    heigth: '45px !important'
  },
  dialogContent: {
    padding: '8px 16px 0 16px'
  },
  errorMsg: {
    color: 'red'
  },
  modalProgress: {
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  saveBtn: {
    color: theme.palette.common.white
  }
}));

type PropsFunction = (event: boolean) => void;

export default function EditVideo(props: {
  editDialogOpen: boolean;
  showEditVideo: boolean;
  item: VideoListResultData | null | undefined;
  setOpen: PropsFunction;
  closeClicked: PropsFunction;
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const adminVideo = useSelector(state => state.adminVideo);
  const videoData = useSelector(state => state.adminVideo.getVideo);
  const [selectedFile, setSelectedFile] = useState<File>();
  const { showEditVideo, item } = props;
  const [apiCalled, setApiCalled] = useState<boolean>(false);
  const [innerFolder,setInnerFolder] = useState(moment().format('yyyy/MM/DD/HH/mm/ss/SSS'));
  const thumbList = [
    {
      key: 'thumb_0000.png',
      value: 'Thumb 1'
    },
    {
      key: 'thumb_0001.png',
      value: 'Thumb 2'
    },
    {
      key: 'thumb_0002.png',
      value: 'Thumb 3'
    },
    {
      key: 'thumb_0003.png',
      value: 'Thumb 4'
    },
    {
      key: 'thumb_0004.png',
      value: 'Thumb 5'
    }
  ];

  const stateList = [
    {
      key: 'finished',
      value: 'Finished'
    },
    {
      key: 'unsubmitted',
      value: 'Unsubmitted'
    },
    {
      key: 'transcoding',
      value: 'Transcoding'
    },
    {
      key: 'failed',
      value: 'Failed'
    },
    {
      key: 'transferred',
      value: 'Transferred'
    },
    {
      key: 'processing',
      value: 'Processing'
    }
  ];

  const handleClose = () => {
    dispatch(removeS3VideoFromState());
    props.closeClicked(true);
  };

  useEffect(() => {
    if (selectedFile && videoData) {
      dispatch(uploadThumbCustomToS3Bucket(selectedFile, videoData.id, innerFolder));
    }
  }, [selectedFile]);

  useEffect(() => {
    if (apiCalled && adminVideo.updateVideo) {
      dispatch(removeS3VideoFromState());
      props.closeClicked(true);
    }
  }, [apiCalled, adminVideo]);

  useEffect(() => {
    if (showEditVideo && item) {
      dispatch(removeS3VideoFromState());
      dispatch(getVideo({ _id: item._id }));
    }
  }, [item, showEditVideo]);
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
    }else{
      delete values.custom_thumbnail_uid
    }
    setApiCalled(true);
    dispatch(updateExistingVideo(values));
  };

  const getFileName = (values: GetVideoResponseType) => {
    if (adminVideo.thumbCustomUploaded) {
      var fileNameSplit = adminVideo.thumbCustomUploaded.key.split('/'); //split path
      var fileName =
        fileNameSplit?.length > 1
          ? fileNameSplit[fileNameSplit?.length - 1]
          : adminVideo.thumbCustomUploaded.key; //take file name
      return fileName;
    } else if (values.thumbnail_file_name) return values.thumbnail_file_name;
    return null;
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

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target != null) {
      const item: File = (target.files as FileList)[0];
      setSelectedFile(item);
    }
  };

  const EditVideoValidationSchema = Yup.object().shape({
    video_file_name: Yup.string()
      .nullable()
      .max(255)
      .required('Video File Name is required')
  });

  useEffect(() => {
    if (adminVideo.isVideoCreated) {
      props.setOpen(false);
    }
  }, [adminVideo.isVideoCreated]);

  const [openConfirmDelete, setConfirmDelete] = React.useState(false);
  return (
    <>
      <ConfirmDelete
        id={item?._id}
        open={openConfirmDelete}
        close={() => setConfirmDelete(false)}
        handleModal = {() => handleClose()}
      />
      <Dialog
        open={props.editDialogOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: classes.Editmodal
        }}
      >
        <div className={classes.top}>
          <Typography variant="h5" className={classes.titleText}>
            EDIT VIDEO
          </Typography>
          {showEditVideo && item && (
            <Button
              variant="outlined"
              className={classes.Deletebutton}
              onClick={() => {
                setConfirmDelete(true);
              }}
            >
              <DeleteOutlineOutlinedIcon /> Delete
            </Button>
          )}
        </div>

        <Formik<GetVideoResponseType>
          enableReinitialize
          initialValues={getInitialValues()}
          validationSchema={EditVideoValidationSchema}
          onSubmit={async values => {
            handleSave(values);
          }}
        >
          {({ handleSubmit, handleBlur, values, setFieldValue, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              {adminVideo.isLoading && !adminVideo.isCustomThumbLoading ? (
                <div className={classes.modalProgress}>
                  <CircularProgress />
                </div>
              ) : (
                <DialogContent className={classes.dialogContent}>
                  <TextField
                    id="video_file_name"
                    name="video_file_name"
                    label="Video File Name"
                    fullWidth
                    variant="outlined"
                    error={errors.video_file_name && touched.video_file_name ? true : false}
                    value={values.video_file_name ?? ''}
                    // onChange={handleChange}
                    onBlur={handleBlur}
                    // value={initialValues.videoFileName}
                    className={classes.textField}
                    inputProps={{
                      style: {
                        padding: '15px 20px'
                      }
                    }}
                  />
                  {errors.video_file_name && touched.video_file_name && (
                    <div className={classes.errorMsg}>*Title is required</div>
                  )}
                  <Typography className={classes.caution}>
                    Be very careful about changing this, this will not rename the remote file name
                    and you risk dereferencing the video
                  </Typography>

                  <Grid container spacing={2} className={classes.parentSelectSpacing}>
                    <Grid item md={6}>
                      <div className={classes.selectSpacing}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                          <InputLabel>Thumbnail</InputLabel>
                          <Select
                            id="thumbnail_file_name"
                            onChange={event => {
                              setFieldValue('thumbnail_file_name', event.target.value);
                            }}
                            label="Thumbnail"
                            fullWidth
                            value={values.thumbnail_file_name ?? ''}
                            className={classes.selectField}
                          >
                            {thumbList?.map(thumb => {
                              return (
                                <MenuItem key={thumb.key} value={thumb.key}>
                                  {thumb.value}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </div>
                    </Grid>
                    <Grid item md={6}>
                      <div className={classes.selectSpacing}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                          <InputLabel>State</InputLabel>
                          <Select
                            id="state"
                            value={values.state ?? ''}
                            // onChange={event => {
                            //   setFieldValue('state', event.target.value);
                            // }}
                            readOnly
                            label="State"
                            className={classes.selectField}
                            fullWidth
                          >
                            {stateList?.map(statevalue => {
                              return (
                                <MenuItem key={statevalue.key} value={statevalue.key}>
                                  {statevalue.value}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </div>
                    </Grid>
                  </Grid>

                  <div className={classes.customthumb}>
                    <Typography variant="h3" className={classes.titleText}>
                      {getFileName(values) ?? 'Custom Thumbnail'}
                    </Typography>
                    {adminVideo.isCustomThumbLoading && (
                      <div className={classes.progressCenter}>
                        <CircularProgress color="secondary" disableShrink />
                      </div>
                    )}

                    {!adminVideo.isLoading && !adminVideo.isCustomThumbLoading && (
                      <div className={classes.chooseFileDiv}>
                        <input
                          className={classes.chooseFileInput}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileInput(e)}
                          id="chooseFileInput"
                          type="file"
                        />
                        <label htmlFor="chooseFileInput">
                          <Button
                            variant="contained"
                            component="span"
                            className={classes.Choosefile}
                          >
                            CHOOSE FILE
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>
                </DialogContent>
              )}
              <Divider />
              <DialogActions>
                {!adminVideo.isLoading && !adminVideo.isCustomThumbLoading && (
                  <>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={classes.saveBtn}
                    >
                      Save
                    </Button>
                  </>
                )}
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
