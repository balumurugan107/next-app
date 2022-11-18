import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Divider,
  TextField,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Checkbox,
  CircularProgress,
  LinearProgress,
  Typography,
  Box
} from '@mui/material';
import QuillEditor from 'src/components/QuillEditor';
import 'react-quill/dist/quill.bubble.css';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { MultiSelectWithSearch } from 'src/components/MultiSelectWithSearch';
import { ILesson } from 'src/store/goswim/admin/lesson/types';
import {
  createNewLesson,
  getLessonById,
  removeAdminLessonFromState,
  updateLesson
} from 'src/store/goswim/admin/lesson';
import moment from 'moment';
import * as Yup from 'yup';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { getAllCourse, IAllCourse } from 'src/store/goswim/admin/course';
import { getVideosList, VideoListResultData } from 'src/store/newdashboard';
import { ContractResponse, getContracts } from 'src/store/management/members';
import { markdownToHtml, htmlToMarkdown } from 'src/components/Parser';
import { getLessonFilterData } from 'src/store/management/lessons';
import ConfirmLessonDelete from './ConfirmLessonDelete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import makeStyles from '@mui/styles/makeStyles';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  formControl: {
    marginRight: theme.spacing(1),
    minWidth: 260
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
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
    },
    borderRadius: 15,
    minHeight: 'calc(100% - 64px)',
    width: '100%'
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
  selectField: {
    height: '50px',
    width: 'auto'
  },
  textField: {
    heigth: '45px !important'
  },
  newLessonWrapper: {
    '& .MuiGrid-item': {
      width: '100%'
    }
  },
  spacingEnd: {
    // padding: '24px',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '0px'
    },
    '& label': {
      marginBottom: theme.spacing(1.5),
      color: theme.palette.text.secondary,
      display: 'block'
    }
  },
  card: {
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
    },
    '& .ql-toolbar.ql-snow': {
      border: '1px solid #c4c4c4'
    }
  },
  dialogTitle: {
    color: '#546E7A'
  },
  positionBox: {
    //margin: theme.spacing(1),
    width: '100%'
    // minWidth: 250,
  },
  pagination: {
    margin: theme.spacing(2),
    width: '130%'
  },
  box: {
    overflow: 'hidden'
  },
  dialogContent: {
    overflow: 'hidden'
  },
  errorMsg: {
    color: 'red'
  },
  Deletebutton: {
    margin: '10px'
  },
  modalProgress: {
    height: '430px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  thumbnailList: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      marginRight: theme.spacing(1),
      maxWidth: 'calc(20% - 7px)',
      '&:nth-last-child(1)': {
        marginRight: 0
      }
    }
  },
  saveBtn: {
    color: theme.palette.common.white
  },
  commonErrorMsg: {
    color: 'red',
    margin: '8px 24px'
  },
  editContentWrapper: {
    padding: theme.spacing(3),
    paddingTop: 0
  },
  fullHeightCard: {
    backgroundColor: theme.palette.background.paper,
    // height: '100%',
    margin: '20px 0',
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
    padding: theme.spacing(2.5)
  },
  modalTitleWithDelete: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 24px 16px 0px'
  },
  pageTitle: {
    fontSize: '1.25rem',
    color: theme.palette.text.primary,
    fontWeight: 500
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(3)
  },
  backBtnWrapper: {
    padding: '16px 30px',
    display: 'flex',
    justifyContent: 'flex-end',
    '& button': {
      background: theme.palette.primary.main,
      color: theme.palette.common.white
    }
  },
  lessonDetForm: {
    width: '100%',
    float: 'left',
    marginTop: theme.spacing(3)
  }
}));

export default function CreateEditViewLesson() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useRouter();
  const videosList = useSelector(state => state.dashboardNew.videoList);
  const videosListCopy = [...videosList.results];
  const { isUpdated, isDeleted, isCreated, isLoading, filteredData } = useSelector(
    state => state.adminLesson
  );
  const location = history.pathname.split('/');
  const { lessonId }= history.query;
  // const lessonId = location[5];
  const modalType = location[4] === 'edit' ? 'Edit' : location[4] === 'create' ? 'Create' : 'View';
  const addEditToggle = location[4] === 'edit' ? 'EDIT' : location[4] === 'create' ? 'ADD' : 'VIEW';
  const courseList = useSelector(state => state.adminCourse.allCourseList);
  const contractList = useSelector(state => state.members.contracts);
  const otherList = useSelector(state => state.lesson.filterData[0]);
  const lessonDataById = useSelector(state => state.adminLesson.lessonById);
  const videos: any = {
    _id: lessonDataById?.video_id,
    video_file_name: lessonDataById?.video_file_name
  };
  videosListCopy.push(videos);
  const getInitialValues = () => {
    const getCourseListById = () => {
      let filteredCourseListArr: IAllCourse[] = [];
      courseList?.map(
        course =>
          lessonDataById &&
          lessonDataById?.course_id?.map(course_id => {
            if (course._id === course_id) {
              filteredCourseListArr.push(course);
            }
          })
      );
      return filteredCourseListArr;
    };
    const getContractsListById = () => {
      let filteredContractsListArr: ContractResponse[] = [];
      contractList?.map(
        contract =>
          lessonDataById &&
          lessonDataById?.contract_id?.map(contract_id => {
            if (contract._id === contract_id) {
              filteredContractsListArr.push(contract);
            }
          })
      );
      return filteredContractsListArr;
    };
    const getVideosListById = () => {
      let filteredVideosListArr: VideoListResultData[] = [];
      videosListCopy?.map(video => {
        if (video._id === lessonDataById?.video_id) {
          filteredVideosListArr.push(video);
        }
      });
      return filteredVideosListArr;
    };
    if (lessonDataById) {
      const initialValues: ILesson = {
        publish_at: lessonDataById.publish_at
          ? moment(lessonDataById.publish_at).valueOf()
          : moment().valueOf(),
        description: lessonDataById.description ? markdownToHtml(lessonDataById.description) : '',
        published: lessonDataById.published ? lessonDataById.published : false,
        bonus: lessonDataById.bonus ? lessonDataById.bonus : false,
        name: lessonDataById.name ? lessonDataById.name : '',
        subtitle: lessonDataById.subtitle ? lessonDataById.subtitle : '',
        video_id: lessonDataById.video_id ? lessonDataById.video_id : '',
        video_list: getVideosListById(),
        course_id: lessonDataById.course_id ? lessonDataById.course_id : [],
        course_list: getCourseListById(),
        contract_id: lessonDataById.contract_id ? lessonDataById.contract_id : [],
        contract_list: getContractsListById(),
        position: lessonDataById.position ? lessonDataById.position : 0,
        tags: lessonDataById.tags ? lessonDataById.tags : [],
        stroke: lessonDataById.stroke ? lessonDataById.stroke : [],
        anatomy: lessonDataById.anatomy ? lessonDataById.anatomy : [],
        expertise: lessonDataById.expertise ? lessonDataById.expertise : [],
        camera_position: lessonDataById.camera_position ? lessonDataById.camera_position : [],
        contract_ids: lessonDataById.contract_id ? lessonDataById.contract_id : [],
        thumbnail_file_name: lessonDataById.thumbnail_file_name
          ? lessonDataById.thumbnail_file_name
          : ''
      };
      return initialValues;
    } else {
      const initialValues: ILesson = {
        publish_at: moment().valueOf(),
        description: '',
        published: false,
        bonus: false,
        name: '',
        subtitle: '',
        video_id: '',
        video_list: [],
        thumbnail_file_name: '',
        course_id: [],
        course_list: [],
        contract_ids: [],
        contract_id: [],
        contract_list: [],
        position: Number(`${filteredData?.[0]?.all}`),
        tags: [],
        stroke: [],
        anatomy: [],
        expertise: [],
        camera_position: []
      };
      return initialValues;
    }
  };

  // const handleClose = () => {
  //     props.setOpen(false);
  // };

  const handleSave = (values: ILesson) => {
    const course_id = values.course_list?.map(course => course._id);
    if (course_id) values.course_id = course_id;
    const contract_id = values.contract_list?.map(contract => contract._id);
    if (contract_id) values.contract_ids = contract_id;
    const video_id = values.video_list?.map(video => video._id);
    if (video_id) values.video_id = video_id[0];
    if (addEditToggle === 'EDIT') dispatch(updateLesson(lessonId, values));
    else if (addEditToggle === 'ADD') dispatch(createNewLesson(values));
  };

  const thumbnailData = [
    'thumb_0000.png',
    'thumb_0001.png',
    'thumb_0002.png',
    'thumb_0003.png',
    'thumb_0004.png',
  ];

  const filterData = [
    {
      key: '0',
      title: 'Assignment'
    },
    {
      key: 'finished',
      title: 'State'
    }
  ];

  const thumbnails = useSelector((state: any) => state.adminLesson.lessonById?.thumbnails);
  const EditLessonValidationSchema = Yup.object().shape({
    name: Yup.string()
      .max(255)
      .required('Title is required'),
    description: Yup.string()
      // .test({
      //   name: 'description',
      //   test: function(values) {
      //     let desc = values ? values.replace(/<\/?[^>]+(>|$)/g, '') : '';
      //     desc = desc.trim();
      //     if (desc && desc.length >= 50) return true;
      //     return this.createError({
      //       path: 'description',
      //       message: 'Description need minimum 50 characters'
      //     });
      //   }
      // })
      .required('Description is required')
  });

  useEffect(() => {
    if (lessonId && location[5]) dispatch(getLessonById(lessonId));
    dispatch(
      getVideosList({
        filterData
      })
    );
    dispatch(getAllCourse());
    dispatch(getContracts(1, 25));
    dispatch(getLessonFilterData('Lesson'));
  }, []);

  useEffect(() => {
    dispatch(removeAdminLessonFromState());
  }, [isDeleted, isUpdated, isCreated]);

  const [openConfirmDelete, setConfirmDelete] = React.useState(false);

  useEffect(() => {
    if (isUpdated || isDeleted || isCreated) {
      history.push('/app/admin/lessons');
    }
  }, [isUpdated, isDeleted, isCreated]);

  let delayDebounceFn: NodeJS.Timeout;

  return (
    <>
      <ConfirmLessonDelete
        id={lessonId}
        open={openConfirmDelete}
        setConfirmDelete={setConfirmDelete}
      />
      <Box className={classes.backBtnWrapper}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          size="small"
          onClick={() => history.back()}
        >
          Back
        </Button>
      </Box>
      <Grid container spacing={3} className={classes.editContentWrapper}>
        <Grid item xs={12} sm={10} md={8}>
          <Card className={classes.fullHeightCard}>
            <>
              <div className={classes.modalTitleWithDelete}>
                <Typography variant="h3" id="form-dialog-title" className={classes.pageTitle}>
                  {modalType} Lesson
                </Typography>
                <Button
                  variant="outlined"
                  className={classes.Deletebutton}
                  style={{ display: modalType === 'Edit' ? 'flex' : 'none' }}
                  onClick={() => setConfirmDelete(true)}
                >
                  <DeleteOutlineOutlinedIcon /> Delete Lesson
                </Button>
              </div>
              {isLoading ? <LinearProgress /> : <Divider />}

              <Formik<ILesson>
                enableReinitialize
                initialValues={getInitialValues()}
                validationSchema={EditLessonValidationSchema}
                onSubmit={async values => {
                  //Need to change description type from html to markdown text
                  values.description = htmlToMarkdown(values.description);

                  handleSave(values);
                }}
              >
                {({
                  handleSubmit,
                  handleBlur,
                  handleChange,
                  setFieldValue,
                  values,
                  errors,
                  touched
                }) => (
                  <form onSubmit={handleSubmit} className={classes.lessonDetForm}>
                    {isLoading ? (
                      <div className={classes.modalProgress}>
                        <CircularProgress />
                      </div>
                    ) : (
                      <Grid container spacing={3} className={classes.newLessonWrapper}>
                        <Grid item md={6} lg={6} sm={12} xs={12}>
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                              // label="Basic example"
                              value={values.publish_at ? new Date(values.publish_at) : new Date()}
                              onChange={(date: any) => setFieldValue('publish_at', date?.valueOf())}
                              renderInput={(params: any) => (
                                <TextField name="publish_at" {...params} />
                              )}
                              label="Date picker dialog"
                              toolbarFormat="DD/MM/yyyy"
                              disabled={addEditToggle === 'VIEW' ? true : false}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item md={12} lg={12}>
                          <div>
                            <Checkbox
                              // checked={true}
                              checked={values.published}
                              onChange={e => setFieldValue('published', e.target.checked)}
                              name="published"
                              disabled={addEditToggle === 'VIEW' ? true : false}
                              inputProps={{ 'aria-label': 'Publish' }}
                            />{' '}
                            Publish
                            <Checkbox
                              // checked={true}
                              checked={values.bonus}
                              name="bonus"
                              disabled={addEditToggle === 'VIEW' ? true : false}
                              onChange={e => setFieldValue('bonus', e.target.checked)}
                              inputProps={{ 'aria-label': 'Bonus Content' }}
                            />{' '}
                            Bonus Content
                          </div>
                        </Grid>
                        <Grid item md={12} lg={6}>
                          <TextField
                            id="outlined-basic"
                            label="Title*"
                            name="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            disabled={addEditToggle === 'VIEW' ? true : false}
                            error={errors.name && touched.name ? true : false}
                            variant="outlined"
                            fullWidth
                            className={classes.textField}
                            inputProps={{
                              style: {
                                padding: '15px 20px'
                              }
                            }}
                          />
                          {errors.name && touched.name && (
                            <div className={classes.errorMsg}>{errors.name}</div>
                          )}
                        </Grid>
                        <Grid item md={12} lg={6}>
                          <TextField
                            id="outlined-basic"
                            label="Subtitle"
                            name="subtitle"
                            value={values.subtitle}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            disabled={addEditToggle === 'VIEW' ? true : false}
                            variant="outlined"
                            fullWidth
                            className={classes.textField}
                            inputProps={{
                              style: {
                                padding: '15px 20px'
                              }
                            }}
                          />
                        </Grid>
                        {videosList?.results?.length ? (
                          <Grid item md={12}>
                            <MultiSelectWithSearch
                              multiple={false}
                              id="video_list"
                              name="video_list"
                              value={values.video_list}
                              setOnChange={(value: string[]) => {
                                setFieldValue('video_list', value);
                              }}
                              disabled={addEditToggle === 'VIEW' ? true : false}
                              option={videosList?.results}
                              label="Videos"
                            />
                          </Grid>
                        ) : (
                          ''
                        )}
                        {contractList?.length ? (
                          <Grid item md={12} lg={6}>
                            <MultiSelectWithSearch
                              id="contract_list"
                              disabled={addEditToggle === 'VIEW' ? true : false}
                              isMultiple={false}
                              value={values.contract_list}
                              setOnChange={(value: string[]) =>
                                setFieldValue('contract_list', value)
                              }
                              option={contractList}
                              label="Contracts"
                            />
                          </Grid>
                        ) : (
                          ''
                        )}
                        <Grid item md={6}>
                          <FormControl variant="outlined" className={classes.formControl} fullWidth>
                            <InputLabel id="demo-simple-select-outlined-label">
                              Thumbnail
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              name="thumbnail_file_name"
                              value={values.thumbnail_file_name ? values.thumbnail_file_name : ''}
                              onChange={e => setFieldValue('thumbnail_file_name', e.target.value)}
                              label="Thumbnail"
                              className={classes.selectField}
                              disabled={addEditToggle === 'VIEW' ? true : false}
                            >
                              {thumbnailData?.map(thumbnail => (
                                <MenuItem key={thumbnail} value={thumbnail}>
                                  {thumbnail}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <div className={classes.thumbnailList}>
                            {thumbnails?.map((thumbnail: any) => (
                              <img key={`list ${thumbnail}`} src={thumbnail} alt="" />
                            ))}
                          </div>
                        </Grid>
                        {courseList?.length ? (
                          <Grid item md={12} lg={6}>
                            <MultiSelectWithSearch
                              id="course_list"
                              value={values.course_list}
                              setOnChange={(value: string[]) => {
                                setFieldValue('course_list', value);
                              }}
                              option={courseList}
                              label="Courses"
                              disabled={addEditToggle === 'VIEW' ? true : false}
                            />
                          </Grid>
                        ) : (
                          ''
                        )}
                        <Grid item md={12} lg={6}>
                          <TextField
                            id="outlined-number"
                            label="Position"
                            name="position"
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values?.position || 0}
                            disabled={addEditToggle === 'VIEW' ? true : false}
                            className={classes.positionBox}
                            InputProps={{
                              inputProps: { min: 0, max: values.position || 0 }
                            }}
                            variant="outlined"
                          />
                          <p>
                            Where is this lesson in relation to other lessons? (0 - top of the list,
                            {Number(`${values.position}`)} - bottom of the list)
                          </p>
                        </Grid>
                        <Grid item md={12} lg={6}>
                          {otherList?.tags?.tags?.length && (
                            <MultiSelectWithSearch
                              id="tags"
                              value={values.tags}
                              setOnChange={(value: string[]) =>
                                setFieldValue('tags', value as string[])
                              }
                              option={otherList?.tags?.tags}
                              label="Tag"
                              disabled={addEditToggle === 'VIEW' ? true : false}
                            />
                          )}
                        </Grid>
                        <Grid item md={12} lg={6}>
                          {otherList?.stroke?.tags?.length && (
                            <MultiSelectWithSearch
                              id="stroke"
                              value={values.stroke}
                              setOnChange={(value: string[]) =>
                                setFieldValue('stroke', value as string[])
                              }
                              option={otherList?.stroke?.tags}
                              label="Stroke"
                              disabled={addEditToggle === 'VIEW' ? true : false}
                            />
                          )}
                        </Grid>
                        <Grid item md={12} lg={6}>
                          {otherList?.anatomy?.tags?.length && (
                            <MultiSelectWithSearch
                              id="anatomy"
                              value={values.anatomy}
                              setOnChange={(value: string[]) =>
                                setFieldValue('anatomy', value as string[])
                              }
                              option={otherList?.anatomy?.tags}
                              label="Anatomy"
                              disabled={addEditToggle === 'VIEW' ? true : false}
                            />
                          )}
                        </Grid>
                        <Grid item md={12} lg={6}>
                          {otherList?.expertise?.tags?.length && (
                            <MultiSelectWithSearch
                              id="expertise"
                              value={values.expertise}
                              setOnChange={(value: string[]) =>
                                setFieldValue('expertise', value as string[])
                              }
                              option={otherList?.expertise?.tags}
                              label="Expertise"
                              disabled={addEditToggle === 'VIEW' ? true : false}
                            />
                          )}
                        </Grid>
                        <Grid item md={12} lg={6}>
                          {otherList?.camera_position?.tags?.length && (
                            <MultiSelectWithSearch
                              id="camera_position"
                              value={values.camera_position}
                              setOnChange={(value: string[]) =>
                                setFieldValue('camera_position', value as string[])
                              }
                              option={otherList?.camera_position?.tags}
                              label="Camera Position"
                              disabled={addEditToggle === 'VIEW' ? true : false}
                            />
                          )}
                        </Grid>
                        <Grid item md={12} lg={12}>
                          <div className={classes.spacingEnd}>
                            <label htmlFor="">Description*</label>
                            {/* <Card className={classes.card}> */}
                            <QuillEditor
                              className={classes.editor}
                              value={values.description}
                              name="description"
                              onChange={(value: any) => {
                                if (delayDebounceFn) clearTimeout(delayDebounceFn);
                                delayDebounceFn = setTimeout(() => {
                                  setFieldValue('description', value);
                                }, 500);
                              }}
                              readOnly={addEditToggle === 'VIEW' ? true : false}
                            />
                            {errors.description && touched.description && (
                              <div className={classes.errorMsg}>{errors.description}</div>
                            )}
                            {/* </Card> */}
                          </div>
                        </Grid>
                      </Grid>
                    )}
                    {Object.keys(errors)?.length > 0 && Object.keys(touched)?.length > 0 && (
                      <div className={classes.commonErrorMsg}>
                        Please fill the above required details to submit*
                      </div>
                    )}
                    <Divider />
                    <DialogActions>
                      {addEditToggle !== 'VIEW' && !isLoading && (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className={classes.saveBtn}
                        >
                          Save
                        </Button>
                      )}
                    </DialogActions>
                  </form>
                )}
              </Formik>
            </>
            {isLoading && (
              <Grid container className={classes.loaderContainer}>
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            )}
          </Card>
        </Grid>
        {/* <Grid item sm={4}>
                    <Card className={classes.fullHeightCard} style={{ overflow: 'scroll' }}>
                        <div className={classes.filterHeader}>
                            <Typography className={classes.filtertext}>Lessons of this course</Typography>
                        </div>
                        <SortableComponent courseId={courseId} modalType={modalType} />
                    </Card>
                </Grid> */}
      </Grid>
    </>
  );
}
