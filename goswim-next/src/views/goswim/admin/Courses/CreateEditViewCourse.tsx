import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  DialogActions, // Dialog,
  DialogContent,
  Divider,
  alpha,
  FormControlLabel,
  Grid,
  LinearProgress,
  TextField,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Form, Formik } from 'formik';
import { MultiSelectWithSearch } from 'src/components/MultiSelectWithSearch';
import QuillEditor from 'src/components/QuillEditor';
import SortableComponent from 'src/components/ScrollableList';
import {
  CreateCourseType,
  createNewCourse,
  getCourseById,
  removeAdminCoursesFromState,
  updateExistingCourse
} from 'src/store/goswim/admin/course';
import { getLessonFilterData } from 'src/store/management/lessons/actions';
import * as Yup from 'yup';
import { htmlToMarkdown, markdownToHtml } from '../../../../components/Parser';
import ConfirmDelete from './ConfirmDelete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingButton from 'src/components/LoadingButton';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  gridItem: {
    marginTop: theme.spacing(2)
  },
  gridItemRightMargin: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      marginRight: '8px'
    }
  },

  zeroMargin: {
    margin: 0
  },

  gridItemLeftMargin: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      marginLeft: '0px'
    }
  },
  newLessonWrapper: {
    '& .MuiGrid-item': {
      width: '100%'
    }
  },

  dialogContent: {
    '&:first-child': { paddingTop: theme.spacing(1) },
    margin: 0,
    padding: `${theme.spacing(1)},0, ${theme.spacing(1)}, ${theme.spacing(3)}`
  },

  Editmodal: {
    borderRadius: 15,
    minHeight: 'calc(100% - 64px)',
    width: '100%'
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

  RelationPara: {
    marginTop: theme.spacing(1),
    lineHeight: '16px'
  },
  errorMsg: {
    color: 'red'
  },
  pageTitle: {
    fontSize: '1.25rem',
    color: theme.palette.text.primary,
    fontWeight: 500
  },
  Deletebutton: {
    '@media (max-width: 600px)': {
      maxWidth: '180px'
    }
  },
  modalTitleWithDelete: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 24px 16px 24px'
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(3)
  },
  saveBtn: {
    color: theme.palette.common.white
  },
  commonErrorMsg: {
    color: 'red',
    margin: '8px 24px'
  },
  descSec: {
    marginTop: theme.spacing(2),
    '& label': {
      display: 'block',
      margin: '8px 0'
    }
  },
  fullHeightCard: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    overflowY: 'auto',
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
    padding: theme.spacing(2.5),
    [theme.breakpoints.down('md')]: {
      maxHeight: '800px'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      maxHeight: '760px'
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: '735px'
    }
  },
  editContentWrapper: {
    padding: theme.spacing(3),
    paddingTop: 0
  },
  filtertext: {
    fontWeight: 1000,
    color: theme.palette.text.primary
  },
  filterHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '8px 0'
  },
  sortableDiv: {
    padding: '24px',
    background: alpha(theme.palette.primary.main, 0.04)
  },
  description: {
    color: theme.palette.action.disabled
  },
  descriptionDark: {
    color: theme.palette.common.white
  },
  closeButton: {
    marginRight: theme.spacing(1)
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
  buttonText: { fontWeight: 500, fontSize: '0.875rem', color: theme.palette.common.white }
}));

export default function CreateEditViewCourse() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useRouter();
  const dropDownDataList = useSelector(state => state.lesson.filterData[0]);
  const getCourseByIdData = useSelector(state => state.adminCourse.courseById);
  const { isLoading, isCourseDeleted, courseCreated, courseUpdated } = useSelector(
    state => state.adminCourse
  );
  const [isCourseSaving, setIsCourseSaving] = useState<boolean>(false);
  const courseData = useSelector(state => state.courses.courseData);
  const [openConfirmDelete, setConfirmDelete] = React.useState(false);
  const location = history.pathname.split('/');
  const { courseId }= history.query;
  // const courseId = location[4];
  const modalType = location[4] === 'edit' ? 'Edit' : location[4] === 'create' ? 'Create' : 'View';

  useEffect(() => {
    dispatch(getLessonFilterData('Lesson'));
    if (location[5] && courseId) dispatch(getCourseById(courseId));
  }, []);

  const handleSave = (values: CreateCourseType) => {
    if (modalType === 'Edit') dispatch(updateExistingCourse(values));
    else if (modalType === 'Create') dispatch(createNewCourse(values));
  };
  const getInitialValues = () => {
    if (getCourseByIdData) {
      const initialValues: CreateCourseType = {
        name: getCourseByIdData?.name ? getCourseByIdData.name : '',
        split: getCourseByIdData?.split ? getCourseByIdData?.split : 0,
        published: getCourseByIdData?.published ? getCourseByIdData?.published : false,
        stroke: getCourseByIdData?.stroke ? getCourseByIdData?.stroke : [],
        expertise: getCourseByIdData?.expertise ? getCourseByIdData?.expertise : [],
        position: getCourseByIdData?.position ? getCourseByIdData.position : 0,
        description: getCourseByIdData?.description
          ? markdownToHtml(getCourseByIdData?.description)
          : ''
      };
      if (getCourseByIdData._id) {
        initialValues._id = getCourseByIdData._id;
      }
      return initialValues;
    } else {
      const initialValues = {
        name: '',
        split: 0,
        published: false,
        stroke: [],
        expertise: [],
        position: courseData?.totalCount > 0 ? courseData?.totalCount : 0,
        description: ''
      };
      return initialValues;
    }
  };

  const EditLessonValidationSchema = Yup.object().shape({
    name: Yup.string()
      .max(255)
      .required('Title is required'),
    description: Yup.string()
      // .test({
      //   name: 'description',
      //   test: function (values) {
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
    if (isCourseDeleted || courseUpdated || courseCreated) {
      history.push('/app/admin/courses');
      dispatch(removeAdminCoursesFromState());
    }
  }, [isCourseDeleted, courseUpdated, courseCreated]);

  let delayDebounceFn: NodeJS.Timeout;

  return (
    <>
      <ConfirmDelete
        id={courseId}
        open={openConfirmDelete}
        close={() => setConfirmDelete(false)}
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
                  {modalType} Course
                </Typography>
                <Button
                  variant="outlined"
                  className={classes.Deletebutton}
                  style={{ display: modalType === 'Edit' ? 'flex' : 'none' }}
                  onClick={() => setConfirmDelete(true)}
                >
                  <DeleteOutlineOutlinedIcon /> Delete Course
                </Button>
              </div>
              {isLoading ? <LinearProgress /> : <Divider />}

              <Formik<CreateCourseType>
                enableReinitialize
                validationSchema={EditLessonValidationSchema}
                initialValues={getInitialValues()}
                onSubmit={async values => {
                  setIsCourseSaving(true);
                  //Need to change description type from html to markdown text
                  values.description = htmlToMarkdown(values.description);
                  handleSave(values);
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  values,
                  errors,
                  touched,
                  isValid
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <DialogContent className={classes.dialogContent}>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              disabled={modalType === 'View' ? true : false}
                              checked={values.published}
                              onChange={e => {
                                handleChange(e);
                              }}
                              name="published"
                              color="primary"
                            />
                          }
                          label="Published"
                        />
                      </div>

                      <Grid container className={classes.newLessonWrapper}>
                        <Grid item className={classes.gridItem}>
                          <TextField
                            size="small"
                            id="name"
                            label="Name*"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.name && touched.name ? true : false}
                            variant="outlined"
                            fullWidth
                            disabled={modalType === 'View' ? true : false}
                          />
                          {errors.name && touched.name && (
                            <div className={classes.errorMsg}>{errors.name}</div>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container className={classes.newLessonWrapper}>
                        <Grid item md={12} lg={6} className={classes.zeroMargin}>
                          <div className={classes.gridItemRightMargin}>
                            <TextField
                              fullWidth
                              id="outlined-number"
                              label="Position"
                              name="position"
                              type="number"
                              size="small"
                              value={values.position}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              InputLabelProps={{
                                shrink: true
                              }}
                              InputProps={{
                                inputProps: { min: 0, max: values.position }
                              }}
                              variant="outlined"
                              disabled={modalType === 'View' ? true : false}
                            />
                            <Typography className={classes.RelationPara} variant="caption">
                              Where is this course in relation to other courses? (0 - top of the
                              list,
                              {courseData?.totalCount > 0 ? courseData?.totalCount : 0} - bottom of
                              the list)
                            </Typography>
                          </div>
                        </Grid>

                        <Grid item md={12} lg={6} className={classes.zeroMargin}>
                          <TextField
                            className={classes.gridItemLeftMargin}
                            id="split"
                            name="split"
                            label="Revenue Split"
                            type="number"
                            size="small"
                            value={values.split}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputLabelProps={{
                              shrink: true
                            }}
                            variant="outlined"
                            fullWidth
                            disabled={modalType === 'View' ? true : false}
                          />
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem}>
                          {dropDownDataList?.stroke?.tags?.length && (
                            <MultiSelectWithSearch
                              id="stroke"
                              value={values.stroke}
                              setOnChange={(value: string[]) =>
                                setFieldValue('stroke', value as string[])
                              }
                              option={dropDownDataList?.stroke?.tags}
                              label="Stroke"
                              disabled={modalType === 'View' ? true : false}
                            />
                          )}
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem}>
                          {dropDownDataList?.expertise?.tags?.length && (
                            <MultiSelectWithSearch
                              id="expertise"
                              value={values.expertise}
                              setOnChange={(value: string[]) =>
                                setFieldValue('expertise', value as string[])
                              }
                              option={dropDownDataList?.expertise?.tags}
                              label="Expertise"
                              disabled={modalType === 'View' ? true : false}
                            />
                          )}
                        </Grid>
                      </Grid>
                      <Grid className={classes.descSec}>
                        <label htmlFor="">Description*</label>
                        <QuillEditor
                          className={classes.editor}
                          value={values?.description || ''}
                          onChange={(value: any) => {
                            if (delayDebounceFn) clearTimeout(delayDebounceFn);
                            delayDebounceFn = setTimeout(() => {
                              setFieldValue('description', value);
                            }, 500);
                          }}
                          readOnly={modalType === 'View' ? true : false}
                        />
                        {errors.description && touched.description && (
                          <div className={classes.errorMsg}>{errors.description}</div>
                        )}
                      </Grid>
                    </DialogContent>
                    {modalType !== 'View' && (
                      <>
                        {Object.keys(errors)?.length > 0 && Object.keys(touched)?.length > 0 && (
                          <div className={classes.commonErrorMsg}>
                            Please fill the above required details to submit*
                          </div>
                        )}
                        <Divider />
                        <DialogActions>
                          <LoadingButton
                            color="primary"
                            type="submit"
                            variant="contained"
                            isLoading={isCourseSaving}
                            isValid={isValid}
                            progressSize={20}
                            size="large"
                          >
                            <Typography component="span" className={classes.buttonText}>
                              Save
                            </Typography>
                          </LoadingButton>
                          {/* <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.saveBtn}
                          >
                            Save
                          </Button> */}
                        </DialogActions>
                      </>
                    )}
                  </Form>
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
        {/* {(modalType === 'Edit' || modalType === 'View') && (
          <Grid item xs={12} sm={10} md={4}>
            <Card className={classes.fullHeightCard} style={{ overflowY: 'auto' }}>
              <div className={classes.filterHeader}>
                <Typography className={classes.filtertext}>Lessons of this course</Typography>
              </div>
              <SortableComponent courseId={courseId} modalType={modalType} />
            </Card>
          </Grid>
        )} */}
      </Grid>
    </>
  );
}
