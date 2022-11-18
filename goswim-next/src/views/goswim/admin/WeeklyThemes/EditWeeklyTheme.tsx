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
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Formik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from 'src/components/LoadingButton';
import { MultiSelectWithSearch } from 'src/components/MultiSelectWithSearch';
import QuillEditor from 'src/components/QuillEditor';
import {
  createWeeklyThemes,
  editWeeklyThemes,
  getWeeklyThemesById,
  ILessonData,
  IValue,
  removeAdminWeeklyThemeFromState,
  uploadWeeklyThemesThumbCustomToS3Bucket
} from 'src/store/goswim/admin/weeklyThemes';
import * as Yup from 'yup';
import ConfirmWeeklyThemeDelete from './ConfirmWeeklyThemeDelete';
import { markdownToHtml, htmlToMarkdown } from 'src/components/Parser';
import { getFilterData } from 'src/store/management/courses';
import { getLessons } from 'src/store/management/goswim/lessons';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  formControl: {
    marginRight: theme.spacing(1),
    minWidth: 260
  },
  Choosefile: {
    color: theme.palette.common.white,
    background: theme.palette.primary.main
  },
  caution: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  customthumb: {
    margin: '8px 0'
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    // marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: '16px',
    borderBottom: '1px solid #e1e1e1',
    alignItems: 'center'
  },
  Deletebutton: {
    margin: '10px'
  },
  Editmodal: {
    '& .MuiDialog-paper': {
      margin: '0px !important'
    },
    '@media (max-width: 600px)': {
      '& .MuiDialog-paperScrollPaper': {
        maxHeight: 'calc(100%)',
        borderRadius: '0',
        padding: '0 8px'
      }
    },
    borderRadius: 15,
    minHeight: 'calc(100% - 64px)',
    width: '100%'
  },
  centralDiv: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  filterCard: {
    marginTop: '10px',
    width: 'auto',
    minWidth: '200px',
    backgroundColor: theme.palette.common.white,
    '@media (max-width: 600px)': {
      display: 'block'
    }
  },
  filterCardModal: {
    marginTop: '5px',
    width: 'auto',
    minWidth: '100px',
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(2)
  },
  filtertext: {
    margin: '25px',
    fontWeight: 700
  },
  titleContent: {
    width: '100%',
    float: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  filterButton: {
    display: 'none',
    '@media (max-width: 600px)': {
      display: 'block',
      float: 'right'
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
  filterTitle: {
    margin: '25px',
    fontWeight: 1000,
    color: theme.palette.text.primary
  },
  titleText: {
    color: theme.palette.text.primary,
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1)
  },
  scheduleLessonSection: {
    marginTop: 10
  },
  spacingEnd: {
    // padding: '24px',
    paddingBottom: theme.spacing(1),
    height: '100%',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '0px'
    },
    '& label': {
      margin: '8px 0',
      display: 'block'
    }
  },
  card: {
    height: '100%',
    '& .quill.makeStyles-root-94.makeStyles-editor-56': {
      height: '100%'
    }
  },
  editor: {
    margin: '8px 0',
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
  thumbnail: {
    marginBottom: theme.spacing(1)
  },
  table: {
    '& .MuiTableHead-root': {
      color: theme.palette.text.secondary
    }
  },
  dialogTitle: {
    color: theme.palette.text.primary,
    fontSize: '1.25rem',
    fontWeight: 600
  },

  dialogContent: {
    padding: '10px 16px !important',
    overflow: 'hidden'
  },
  chooseFileInput: {
    display: 'none'
  },
  chooseFileDiv: {
    marginTop: theme.spacing(2)
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
  errorMsg: {
    color: 'red'
  },
  modalProgress: {
    height: '430px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  saveBtn: {
    color: theme.palette.common.white,
    fontSize: '0.875rem',
    padding: `0 ${theme.spacing(1)}`
  },
  commonErrorMsg: {
    color: 'red',
    margin: '8px 16px'
  },
  loadingButton: {
    float: 'right',
    maxHeight: '35px'
  },
  formControlOne: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  filterContent: {
    marginTop: theme.spacing(2)
  }
}));

type PropsFunction = (event: any | null) => void;
const EditWeeklyThemeDailog = (props: {
  open: boolean;
  setOpen: PropsFunction;
  addEditToggle: string;
  weeklyThemeId: string;
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allLessonList = useSelector(state => state.courseDetails.lessonWeeklyTheme);
  const {
    weeklyThemesById,
    thumbCustomUploaded,
    isLoading,
    weeklyThemesUpdated,
    weeklyThemesDeleted,
    weeklyThemesCreated
  } = useSelector(state => state.adminWeeklyTheme);
  const handleClose = () => {
    dispatch(removeAdminWeeklyThemeFromState());
    props.setOpen(false);
    setCat('all');
  };
  const [thumbnailErrMsg, setThumbnailMsg] = useState(false);
  const [thumbUploading, setThumbUploading] = useState<boolean>(false);
  const [cat, setCat] = useState('all');
  const [exp, setExp] = useState('all');
  const [thumbUpdatedDateFormat, setThumbUpdatedDateFormat] = useState<string>();
  const innerFolder = moment().format('yyyy/MM/DD/HH/mm/ss/SSS');
  const today = new Date();
  let todayDate = today.getTime();
  let previousCount = 0;
  const filterData = useSelector(state => state.courses.courseFilterData[0]);
  let lessonReqArgs = {
    isAdmin: false,
    isBasic: true,
    course_id: null,
    stroke: cat ? cat : null,
    expertise: exp !== 'all' ? exp : '',
    tags: null,
    search: null
  };
  const EditWeeklyThemesValidationSchema = Yup.object().shape({
    title: Yup.string()
      .max(255)
      .nullable()
      .required('Title is required'),
    description: Yup.string()
      // .min(50, 'Description need minimum 50 characters')
      .required('Description Group is required')
  });

  const value =
    props.addEditToggle === 'Edit' && weeklyThemesById && weeklyThemesById?.description?.length > 0
      ? true
      : false;
  const [showQuill, setShowQuill] = useState(value);

  useEffect(() => {
    if (props.open === true) {
      const quil = weeklyThemesById && weeklyThemesById?._id === props.weeklyThemeId ? true : false;

      setShowQuill(quil);
    }
  }, [weeklyThemesById]);

  const capitalise = (str: any) => {
    // return str.toUpperCase();
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  };
  const handleChangeOne = () => {
    // setCat(event.target.value);
  };
  const handleChangeExpertise = () => {
    //  setExp(event.target.value);
  };
  const createLessons = () => {
    const weeklyThemeArray: ILessonData[] = [];
    if (weeklyThemesById && weeklyThemesById?.weeklyThemeLessonAssignments?.length > 0)
      weeklyThemesById?.weeklyThemeLessonAssignments?.map((weeklyTheme, index) => {
        weeklyThemeArray.push({
          UI_ID: index + 1,
          lesson_id: weeklyTheme?.lesson?._id ? weeklyTheme.lesson._id : weeklyTheme.lesson_id,
          name: weeklyTheme?.lesson?.name ? weeklyTheme?.lesson?.name : 'Null',
          scheduled_on_timestamp: weeklyTheme.scheduled_on_timestamp
        });
      });
    for (let index = weeklyThemeArray.length; index < 7; index++) {
      const element = {
        UI_ID: index + 1,
        lesson_id: '',
        name: null,
        scheduled_on_timestamp: todayDate + 86400000 * index
      };
      weeklyThemeArray.push(element);
    }
    return weeklyThemeArray;
  };
  const initialTimeZone = useSelector(state => state.account.settings.timeZone);
  const localtz = initialTimeZone === '' ? moment.tz.guess() : initialTimeZone; // returns user's timezone

  const getInitialValues = () => {
    if (weeklyThemesById) {
      const initialValues: IValue = {
        title: weeklyThemesById ? weeklyThemesById.title : '',
        description: weeklyThemesById ? markdownToHtml(weeklyThemesById.description) : '',
        thumbnail_uid: weeklyThemesById ? weeklyThemesById.thumbnail_uid : '',
        thumbnail_name: weeklyThemesById ? weeklyThemesById.thumbnail_name : '',
        tz: localtz,
        lessons: createLessons()
      };
      return initialValues;
    } else {
      const initialValues: IValue = {
        title: '',
        description: '',
        thumbnail_uid: '',
        thumbnail_name: '',
        tz: localtz,
        lessons: createLessons()
      };
      return initialValues;
    }
  };

  const isPreviousDate = (values: IValue) => {
    previousCount = 0;
    const todayDate = moment();
    values?.lessons.map(theme => {
      const valueDate = moment(theme.scheduled_on_timestamp);
      if (todayDate.diff(valueDate, 'days') > 0) {
        previousCount = previousCount + 1;
      }
    });
    return previousCount > 0;
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target != null) {
      const item: File = (target.files as FileList)[0];
      setThumbnailMsg(false);
      setThumbUploading(true);
      dispatch(uploadWeeklyThemesThumbCustomToS3Bucket(item, '4', innerFolder));
      setThumbUpdatedDateFormat(innerFolder);
    }
  };

  useEffect(() => {
    if (props.open === true) {
      dispatch(getLessons(lessonReqArgs));
      props.addEditToggle === 'Edit' && dispatch(getWeeklyThemesById(props.weeklyThemeId));
    } else previousCount = 0;
  }, [props.open, cat, exp]);

  useEffect(() => {
    if (weeklyThemesCreated) {
      props.setOpen(false);
    }
  }, [weeklyThemesCreated]);
  useEffect(() => {
    dispatch(getFilterData('Course'));
  }, []);
  const handleSave = (values: IValue) => {
    if (thumbCustomUploaded) {
      var fileNameSplit = thumbCustomUploaded.key.split('/'); //split path
      var fileName =
        fileNameSplit?.length > 1
          ? fileNameSplit[fileNameSplit?.length - 1]
          : thumbCustomUploaded.key; //take file name
      var customThumb = `${thumbUpdatedDateFormat}/${fileName}`;
      values.thumbnail_uid = customThumb;
      values.thumbnail_name = fileName;
    }
    if (props.addEditToggle === 'New') dispatch(createWeeklyThemes(values));
    else if (props.addEditToggle === 'Edit')
      dispatch(editWeeklyThemes(values, props.weeklyThemeId));
  };

  const getFileName = (values: IValue) => {
    if (thumbCustomUploaded) {
      var fileNameSplit = thumbCustomUploaded.key.split('/'); //split path
      var fileName =
        fileNameSplit?.length > 1
          ? fileNameSplit[fileNameSplit?.length - 1]
          : thumbCustomUploaded.key; //take file name
      return fileName;
    } else if (values.thumbnail_name) return values.thumbnail_name;
    return null;
  };

  const findMatch = (lesson: any) => {
    if (lesson.lesson_id !== '' && lesson.lesson_id) {
      return [lesson];
    }
    return [];
  };

  useEffect(() => {
    dispatch(removeAdminWeeklyThemeFromState());
    if (weeklyThemesUpdated || weeklyThemesCreated || weeklyThemesDeleted) {
      props.setOpen(false);
    }
  }, [weeklyThemesUpdated, weeklyThemesCreated, weeklyThemesDeleted]);

  const [openConfirmDelete, setConfirmDelete] = React.useState(false);

  let delayDebounceFn: NodeJS.Timeout;

  return (
    <>
      <ConfirmWeeklyThemeDelete
        id={props.weeklyThemeId}
        open={openConfirmDelete}
        setConfirmDelete={setConfirmDelete}
        editModalOpen={props.setOpen}
      />
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: classes.Editmodal
        }}
      >
        <div className={classes.top}>
          <Typography variant="h1" id="form-dialog-title" className={classes.dialogTitle}>
            {props.addEditToggle} Weekly Themes
          </Typography>
          {props.addEditToggle === 'Edit' && (
            <Button
              variant="outlined"
              className={classes.Deletebutton}
              onClick={() => setConfirmDelete(true)}
            >
              <DeleteOutlineOutlinedIcon /> Delete
            </Button>
          )}
        </div>
        <Formik<IValue>
          enableReinitialize={props.addEditToggle === 'Edit'}
          initialValues={getInitialValues()}
          validationSchema={EditWeeklyThemesValidationSchema}
          onSubmit={async values => {
            //Need to change description type from html to markdown text
            values.description = htmlToMarkdown(values.description);
            if (thumbCustomUploaded) {
              handleSave(values);
              setThumbnailMsg(false);
            } else if (props.addEditToggle === 'Edit') handleSave(values);
            else setThumbnailMsg(true);
          }}
        >
          {({ handleSubmit, handleBlur, handleChange, setFieldValue, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              {isLoading && !thumbUploading ? (
                <div className={classes.modalProgress}>
                  <CircularProgress />
                </div>
              ) : (
                <DialogContent className={classes.dialogContent}>
                  <Grid container className={classes.newLessonWrapper}>
                    <Grid item md={12} lg={12}>
                      <TextField
                        id="title"
                        label="Title*"
                        variant="outlined"
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        error={errors.title && touched.title ? true : false}
                        fullWidth
                        className={classes.textField}
                        inputProps={{
                          style: {
                            padding: '15px 20px'
                          }
                        }}
                      />
                      {errors.title && touched.title && (
                        <div className={classes.errorMsg}>{errors.title}</div>
                      )}
                      {
                        <div className={classes.customthumb}>
                          <Typography variant="h3" className={classes.titleText}>
                            {getFileName(values) ?? 'Custom Thumbnail*'}
                          </Typography>

                          {isLoading && thumbUploading && (
                            <div className={classes.progressCenter}>
                              <CircularProgress color="secondary" disableShrink />
                            </div>
                          )}

                          <div className={classes.chooseFileDiv}>
                            <input
                              className={classes.chooseFileInput}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleFileInput(e)
                              }
                              accept="image/*"
                              id="chooseFileInput"
                              type="file"
                            />
                            {isLoading ? (
                              <> </>
                            ) : (
                              <label htmlFor="chooseFileInput">
                                <Button
                                  variant="contained"
                                  component="span"
                                  className={classes.Choosefile}
                                >
                                  CHOOSE FILE
                                </Button>
                              </label>
                            )}
                          </div>
                          {thumbnailErrMsg && (
                            <div id="thumbnailErrMsg" className={classes.errorMsg}>
                              Thumbnail is required
                            </div>
                          )}
                        </div>
                      }
                    </Grid>
                    {(showQuill || props.addEditToggle !== 'Edit') && (
                      <Grid item xs={12} md={12} lg={12}>
                        <div className={classes.spacingEnd}>
                          <label htmlFor="">Description*</label>
                          <QuillEditor
                            className={classes.editor}
                            defaultValue={values.description}
                            name="description"
                            onChange={(value: any) => {
                              if (delayDebounceFn) clearTimeout(delayDebounceFn);
                              delayDebounceFn = setTimeout(() => {
                                setFieldValue('description', value);
                              }, 500);
                            }}
                          />
                          {errors.description && touched.description && (
                            <div className={classes.errorMsg}>{errors.description}</div>
                          )}
                        </div>
                      </Grid>
                    )}

                    <Grid item md={12} lg={12} sm={12}>
                      <h3 className={classes.titleText}>Scheduled Lessons</h3>
                      <p>Select a lesson to assign for each date.</p>
                      <Grid className={classes.filterContent}>
                        <Grid item xs={12}>
                          <FormControl
                            variant="outlined"
                            className={classes.formControlOne}
                            // size="small"
                          >
                            <InputLabel
                              id="demo-simple-select-label"
                              htmlFor="outlined-age-native-simple"
                            >
                              Select Category
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={cat}
                              onChange={handleChangeOne}
                              label="Select Category"
                              name="inputOne"
                            >
                              <MenuItem value="all">All</MenuItem>
                              {filterData?.stroke?.tags?.map((catVal, index) => (
                                <MenuItem value={catVal} key={`${catVal}-${index}`}>
                                  {capitalise(catVal)}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl
                            variant="outlined"
                            className={classes.formControlOne}
                            // size="small"
                          >
                            <InputLabel htmlFor="outlined-age-native-simple">
                              Designate Expertise
                            </InputLabel>
                            <Select
                              value={exp}
                              onChange={handleChangeExpertise}
                              label="Designate Expertise"
                              name="inputTwo"
                            >
                              <MenuItem value="all">All</MenuItem>
                              {filterData?.expertise?.tags?.map((expVal, index) => (
                                <MenuItem
                                  value={expVal}
                                  key={`${expVal}++${index}`}
                                  onClick={() => setExp(expVal)}
                                >
                                  {capitalise(expVal)}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                      {values?.lessons?.map((lesson, index) => (
                        <Grid
                          container
                          spacing={2}
                          className={classes.scheduleLessonSection}
                          key={`${lesson.UI_ID}index${index}`}
                        >
                          <Grid item md={6} lg={6} sm={12} xs={12}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                              <DatePicker
                                // label="Basic example"
                                toolbarFormat="DD/MM/yyyy"
                                value={lesson.scheduled_on_timestamp}
                                disablePast
                                onChange={date => {
                                  if (date) {
                                    setFieldValue(
                                      `lessons[${index}].scheduled_on_timestamp`,
                                      date.valueOf()
                                    );
                                  }
                                }}
                                renderInput={(params: any) => (
                                  <TextField
                                    fullWidth
                                    name={`lessons[${index}].scheduled_on_timestamp`}
                                    {...params}
                                  />
                                )}
                                label="Date picker dialog"
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item md={6} lg={6} sm={12}>
                            <MultiSelectWithSearch
                              multiple={false}
                              id={`lessons[${index}]._id`}
                              value={findMatch(values.lessons[index])}
                              setOnChange={(stringJson: string[]) => {
                                if (stringJson?.length > 0) {
                                  const value = JSON.parse(JSON.stringify(stringJson[0]));
                                  setFieldValue(`lessons[${index}].lesson_id`, value?._id);
                                  setFieldValue(`lessons[${index}].name`, value?.name);
                                }
                              }}
                              option={allLessonList}
                              label="Lessons"
                            />
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </DialogContent>
              )}
              {((Object.keys(errors)?.length > 0 && Object.keys(touched)?.length > 0) ||
                thumbnailErrMsg) && (
                <div className={classes.commonErrorMsg}>
                  Please fill the above required details to submit*
                </div>
              )}
              <Divider />
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <LoadingButton
                  color="secondary"
                  type="submit"
                  variant="contained"
                  isLoading={isLoading}
                  isValid={true}
                  disabled={isPreviousDate(values)}
                  className={classes.loadingButton}
                  progressSize={20}
                >
                  <span className={classes.saveBtn}>Save</span>
                </LoadingButton>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default EditWeeklyThemeDailog;
