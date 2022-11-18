import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  SvgIcon,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Modal,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Edit } from 'react-feather';
import QuillEditor from 'src/components/QuillEditor';
import { Formik } from 'formik';

// export interface ICardList {
//   key : filterList
// }
export interface filterList {
  title: string;
  listitems: string[];
}

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    '& MuiBox-root': {
      marginBottom: theme.spacing(3)
    }
  },
  Topcard: {
    height: '30px'
  },
  viewbutton: {
    float: 'right',
    width: 150,
    height: 35,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white
  },
  tableHead: {
    width: '80%',
    fontWeight: 1200,
    color: theme.palette.text.secondary
  },
  tableCell: {
    width: '80%',
    fontWeight: 1200,
    color: theme.palette.text.primary
  },
  PageTitle: {
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
    // margin: 10,
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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
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
    // margin: '10px',
    width: 'auto',
    minWidth: '200px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  filterCardModal: {
    margin: '140px 50px',
    width: 'auto',
    minWidth: '100px',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    display: 'none',
    '@media (max-width: 600px)': {
      display: 'block'
    }
  },
  filtertext: {
    // margin: '25px',
    fontWeight: 700,
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
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      display: 'block',
      float: 'right'
    }
  },
  filterModal: {
    top: '50%',
    left: '50%'
    // transform: 'translate(-50%, -50%)',
  },
  selectField: {
    height: '50px'
    // marginRight: theme.spacing(1)
  },
  textField: {
    heigth: '45px !important'
  },
  selectSpacing: {
    marginBottom: theme.spacing(1)
  },
  parentSelectSpacing: {
    justifyContent: 'space-between',
    '@media (min-width: 600px)': {
      display: 'flex'
    }
  },
  titleText: {
    fontWeight: 500,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5)
  },
  filterTitle: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    fontSize: 16,
    marginBottom: theme.spacing(1)
  },
  dialogTitle: {
    color: theme.palette.text.secondary,
    paddingBottom: '15px !important'
  },
  spacingEnd: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '0px'
    }
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
    '& .MuiPaper-elevation1': {
      boxShadow: 'none'
    },
    '& .ql-editor': {
      height: '360px'
    },
    '& .ql-toolbar.ql-snow': {
      border: '1px solid #c4c4c4'
    }
  },
  dialogContent: {
    overflow: 'hidden'
  },
  IconButton: {
    padding: 0
  },
  box: {
    marginBottom: theme.spacing(3)
  },
  filterListItem: {
    color: theme.palette.text.secondary,
    cursor: 'pointer !important',
    '&:hover': {
      cursor: 'alias',
      color: theme.palette.text.secondary
    }
  },
  filterListItemSelected: {
    color: '#000',
    '&:hover': {
      cursor: 'alias',
      color: theme.palette.text.secondary
    }
  }
}));

const Workouts: React.FC = () => {
  const classes = useStyles();

  interface IWarmUp {
    Repetitions: number;
    Distance: number;
    Stroke: string | unknown;
    Description: string;
  }
  interface Workout {
    title: string;
    strokeTheme: string | unknown;
    abilityLevel: string | unknown;
    goal: string | unknown;
    duration: string | unknown;
    lesson: string | unknown;
    description: string;
    warmUp: IWarmUp[];
    main: IWarmUp[];
    warmDown: IWarmUp[];
  }

  const initialValues: Workout = {
    title: '',
    strokeTheme: 'All Strokes',
    abilityLevel: 'Basic/ Beginner',
    goal: 'Fitness',
    duration: 'None',
    lesson: 'Swim Doll',
    description: '',
    warmUp: [],
    main: [],
    warmDown: []
  };
  const [workout, setWorkOut] = React.useState(initialValues);
  const [updated, setUpdated] = React.useState(false);

  const videoNames = ['Workout1', 'Workout2', 'Workout3'];

  const strokeThemeData = ['All Strokes', 'Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly'];

  const abilityLevel = ['Basic/ Beginner', 'Intermediate', 'Advanced'];

  const goal = [
    'Fitness',
    'Technique',
    'Endurance/Distance',
    'Speed',
    'Recovery',
    'Starts/Turns',
    'Stay Together as Group'
  ];

  const Duration = ['None', '30 minutes', '45 minutes', '60 minutes', '90 minutes'];

  const Lesson = [
    'Swim Doll',
    'All Strokes - Backyard Balance',
    'All Strokes - FINIS Fins',
    'Turns - Under Over Drill',
    'Dryland - Box Jumps'
  ];

  const [open, setOpen] = React.useState(false);
  const [filterModalOpen, setFilterModalOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeTitle = (value: string) => {
    const workOutTemp = workout;
    workOutTemp.title = value;
    setWorkOut(workOutTemp);
    setUpdated(!updated);
  };

  const onChangeStroke = (value: string | unknown) => {
    const workOutTemp = workout;
    workOutTemp.strokeTheme = value;
    setWorkOut(workOutTemp);
    setUpdated(!updated);
  };

  const onChangeAbility = (value: string | unknown) => {
    const workOutTemp = workout;
    workOutTemp.abilityLevel = value;
    setWorkOut(workOutTemp);
    setUpdated(!updated);
  };

  const onChangeGoal = (value: string | unknown) => {
    const workOutTemp = workout;
    workOutTemp.goal = value;
    setWorkOut(workOutTemp);
    setUpdated(!updated);
  };

  const onChangeLesson = (value: string | unknown) => {
    const workOutTemp = workout;
    workOutTemp.lesson = value;
    setWorkOut(workOutTemp);
    setUpdated(!updated);
  };

  const onChangeDescription = (value: string) => {
    const workOutTemp = workout;
    workOutTemp.description = value;
    setWorkOut(workOutTemp);
    setUpdated(!updated);
  };

  const onChangeDuration = (value: string | unknown) => {
    const workOutTemp = workout;
    workOutTemp.duration = value;
    setWorkOut(workOutTemp);
    setUpdated(!updated);
  };

  const onAddSets = (type: string) => {
    const warmUp: IWarmUp = {
      Repetitions: 0,
      Distance: 0,
      Stroke: '',
      Description: ''
    };
    const workOutTemp = workout;
    if (type === 'warmup') workOutTemp.warmUp.push(warmUp);
    else if (type === 'main') workOutTemp.main.push(warmUp);
    else if (type === 'warmdown') workOutTemp.warmDown.push(warmUp);
    setWorkOut(workOutTemp);
    setUpdated(!updated);
  };

  const onRemoveSets = (type: string, index: number) => {
    const workOutTemp = workout;
    if (type === 'warmup') workOutTemp.warmUp.splice(index, 1);
    else if (type === 'main') workOutTemp.main.splice(index, 1);
    else if (type === 'warmdown') workOutTemp.warmDown.splice(index, 1);
    setWorkOut(workOutTemp);
    setUpdated(!updated);
  };

  const onChangeWarmUpRepetitions = (value: string, index: number) => {
    const workOutTemp = workout;
    if (workOutTemp.warmUp.length > index) {
      workOutTemp.warmUp[index].Repetitions = parseInt(value);
      setWorkOut(workOutTemp);
      setUpdated(!updated);
    }
  };

  const onChangeMainRepetitions = (value: string, index: number) => {
    const workOutTemp = workout;
    if (workOutTemp.main.length > index) {
      workOutTemp.main[index].Repetitions = parseInt(value);
      setWorkOut(workOutTemp);
      setUpdated(!updated);
    }
  };

  const onChangeWarmDownRepetitions = (value: string, index: number) => {
    const workOutTemp = workout;
    if (workOutTemp.warmDown.length > index) {
      workOutTemp.warmDown[index].Repetitions = parseInt(value);
      setWorkOut(workOutTemp);
      setUpdated(!updated);
    }
  };

  const onChangeWarmUpDistance = (value: string, index: number) => {
    const workOutTemp = workout;
    if (workOutTemp.warmUp.length > index) {
      workOutTemp.warmUp[index].Distance = parseInt(value);
      setWorkOut(workOutTemp);
      setUpdated(!updated);
    }
  };

  const onChangeMainDistance = (value: string, index: number) => {
    const workOutTemp = workout;
    if (workOutTemp.main.length > index) {
      workOutTemp.main[index].Distance = parseInt(value);
      setWorkOut(workOutTemp);
      setUpdated(!updated);
    }
  };

  const onChangeWarmDownDistance = (value: string, index: number) => {
    const workOutTemp = workout;
    if (workOutTemp.warmDown.length > index) {
      workOutTemp.warmDown[index].Distance = parseInt(value);
      setWorkOut(workOutTemp);
      setUpdated(!updated);
    }
  };

  const onChangeWarmUpStroke = (value: string | unknown, index: number) => {
    const workOutTemp = workout;
    if (workOutTemp.warmUp.length > index) {
      workOutTemp.warmUp[index].Stroke = value;
      setWorkOut(workOutTemp);
      setUpdated(!updated);
    }
  };

  const onChangeMainStroke = (value: string | unknown, index: number) => {
    const workOutTemp = workout;
    if (workOutTemp.main.length > index) {
      workOutTemp.main[index].Stroke = value;
      setWorkOut(workOutTemp);
      setUpdated(!updated);
    }
  };

  const onChangeWarmDownStroke = (value: string | unknown, index: number) => {
    const workOutTemp = workout;
    if (workOutTemp.warmDown.length > index) {
      workOutTemp.warmDown[index].Stroke = value;
      setWorkOut(workOutTemp);
      setUpdated(!updated);
    }
  };

  const onChangeWarmUpDescription = (value: any, index: number) => {
    const workOutTemp = workout;
    if (workOutTemp.warmUp.length > index) {
      workOutTemp.warmUp[index].Description = value;
      setWorkOut(workOutTemp);
      setUpdated(!updated);
    }
  };

  const onChangeMainDescription = (value: any, index: number) => {
    const workOutTemp = workout;
    if (workOutTemp.main.length > index) {
      workOutTemp.main[index].Description = value;
      setWorkOut(workOutTemp);
      setUpdated(!updated);
    }
  };

  const onChangeWarmDownDescription = (value: any, index: number) => {
    const workOutTemp = workout;
    if (workOutTemp.warmDown.length > index) {
      workOutTemp.warmDown[index].Description = value;
      setWorkOut(workOutTemp);
      setUpdated(!updated);
    }
  };

  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
  };
  const sampleObject: filterList[] = [
    {
      title: 'Order',
      listitems: ['Created At', 'Updated At']
    },
    {
      title: 'State',
      listitems: ['Finished()', 'Failed()', 'Unsubmitted()']
    },
    {
      title: 'Assignment',
      listitems: ['Assigned()', 'Unassigned()']
    }
  ];

  useEffect(() => {
  }, [updated]);

  let delayDebounceFn: NodeJS.Timeout;

  return <>
    {/* E */}
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.Editmodal}
    >
      <div className={classes.top}>
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          Edit Workout
        </DialogTitle>
        <Button variant="outlined" className={classes.Deletebutton}>
          Delete this Workout
        </Button>
      </div>
      <Formik<Workout>
        initialValues={initialValues}
        onSubmit={async () => {
        }}
      >
        {/* {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => ( */}
        {({ handleSubmit, handleBlur, handleChange, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent className={classes.dialogContent}>
              <Grid container spacing={3}>
                <Grid item md={12} lg={12} xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Title"
                    name="title"
                    onBlur={handleBlur}
                    variant="outlined"
                    value={workout.title}
                    onChange={event => {
                      onChangeTitle(event.target.value);
                      handleChange(event);
                    }}
                    fullWidth
                    inputProps={{
                      style: {
                        padding: '15px 20px'
                      }
                    }}
                  />
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                  <FormControl variant="outlined" className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">Stroke Theme</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      name="strokeTheme"
                      value={workout.strokeTheme}
                      onBlur={handleBlur}
                      onChange={event => {
                        onChangeStroke(event.target.value);
                        handleChange(event);
                      }}
                      label="Stroke Theme"
                      className={classes.selectField}
                    >
                      {strokeThemeData?.map(stroke => (
                        <MenuItem value={stroke}>{stroke}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                  <FormControl variant="outlined" className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">Ability level</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      name="abilityLevel"
                      value={workout.abilityLevel}
                      onBlur={handleBlur}
                      onChange={event => {
                        onChangeAbility(event.target.value);
                        handleChange(event);
                      }}
                      label="Ability level"
                      className={classes.selectField}
                    >
                      {abilityLevel?.map(ability => (
                        <MenuItem value={ability}>{ability}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                  <FormControl variant="outlined" className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">Goal</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      name="goal"
                      value={workout.goal}
                      onBlur={handleBlur}
                      onChange={event => {
                        onChangeGoal(event.target.value);
                        handleChange(event);
                      }}
                      label="Goal"
                      className={classes.selectField}
                    >
                      {goal?.map(goalItem => (
                        <MenuItem value={goalItem}>{goalItem}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                  <FormControl variant="outlined" className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">Duration</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      name="duration"
                      value={workout.duration}
                      onBlur={handleBlur}
                      onChange={event => {
                        onChangeDuration(event.target.value);
                        handleChange(event);
                      }}
                      label="Duration"
                      className={classes.selectField}
                    >
                      {Duration?.map(durationItem => (
                        <MenuItem value={durationItem}>{durationItem}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                  <FormControl variant="outlined" className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">Lesson</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      name="lesson"
                      value={workout.lesson}
                      onBlur={handleBlur}
                      onChange={event => {
                        onChangeLesson(event.target.value);
                        handleChange(event);
                      }}
                      label="Lesson"
                      className={classes.selectField}
                    >
                      {Lesson?.map(lesson => (
                        <MenuItem value={lesson}>{lesson}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                  <div className={classes.spacingEnd}>
                    <Card className={classes.card}>
                      <QuillEditor
                        className={classes.editor}
                        name="description"
                        value={workout.description}
                        onChange={(value: any) => {
                          if(delayDebounceFn) clearTimeout(delayDebounceFn);
                             delayDebounceFn = setTimeout(() => {
                            onChangeDescription(value);
                            setFieldValue('description', value);
                            }, 500);
                        }}
                        onBlur={handleBlur}
                      />
                    </Card>
                  </div>
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                  <h3 className={classes.dialogTitle}>SETS</h3>
                  <p>Define the exercises in each of the sets listed below.</p>
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                  <h3 className={classes.dialogTitle}>Warmup</h3>
                  {workout?.warmUp?.length > 0 &&
                    workout.warmUp.map((item, i) => (
                      <div>
                        <Grid container spacing={3}>
                          <Grid item lg={12} md={12}>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              label="Repetitions"
                              variant="outlined"
                              value={item.Repetitions}
                              onChange={event => {
                                onChangeWarmUpRepetitions(event.target.value, i);
                              }}
                              fullWidth
                              inputProps={{
                                style: {
                                  padding: '15px 20px'
                                }
                              }}
                            />
                          </Grid>
                          <Grid item lg={12} md={12}>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              label="Distance"
                              variant="outlined"
                              value={item.Distance}
                              onChange={event => {
                                onChangeWarmUpDistance(event.target.value, i);
                              }}
                              fullWidth
                              inputProps={{
                                style: {
                                  padding: '15px 20px'
                                }
                              }}
                            />
                          </Grid>
                          <Grid item lg={12} md={12}>
                            <FormControl
                              variant="outlined"
                              className={classes.formControl}
                              fullWidth
                            >
                              <InputLabel id="demo-simple-select-outlined-label">
                                Stroke
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={item.Stroke}
                                onChange={event => onChangeWarmUpStroke(event.target.value, i)}
                                label="Stroke"
                                className={classes.selectField}
                              >
                                {strokeThemeData?.map(stroke => (
                                  <MenuItem value={stroke}>{stroke}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item md={12} lg={12} xs={12}>
                            <div className={classes.spacingEnd}>
                              <Card className={classes.card}>
                                <QuillEditor
                                  className={classes.editor}
                                  value={item.Description}
                                  onChange={(value: any) => {
                                    if(delayDebounceFn) clearTimeout(delayDebounceFn);
                                    delayDebounceFn = setTimeout(() => {
                                    onChangeWarmUpDescription(value, i);
                                  }, 500);
                                  }}
                                />
                              </Card>
                            </div>
                            <div>
                              <hr style={{ marginTop: '5px' }} />
                            </div>
                          </Grid>
                          <Grid item md={12} lg={12} xs={12}>
                            <Button
                              onClick={() => {
                                onRemoveSets('warmup', i);
                              }}
                            >
                              Remove Warmup Exercise
                            </Button>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  <Button
                    onClick={() => {
                      onAddSets('warmup');
                    }}
                  >
                    Add Warmup Exercise
                  </Button>
                  <Divider />
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                  <h3 className={classes.dialogTitle}>Main</h3>
                  {workout?.main?.length > 0 &&
                    workout.main.map((item, i) => (
                      <Grid container spacing={3}>
                        <Grid item lg={12} md={12}>
                          <TextField
                            id="outlined-basic"
                            type="number"
                            label="Repetitions"
                            variant="outlined"
                            value={item.Repetitions}
                            onChange={event => {
                              onChangeMainRepetitions(event.target.value, i);
                            }}
                            fullWidth
                            inputProps={{
                              style: {
                                padding: '15px 20px'
                              }
                            }}
                          />
                        </Grid>
                        <Grid item lg={12} md={12}>
                          <TextField
                            id="outlined-basic"
                            type="number"
                            label="Distance"
                            variant="outlined"
                            value={item.Distance}
                            onChange={event => {
                              onChangeMainDistance(event.target.value, i);
                            }}
                            fullWidth
                            inputProps={{
                              style: {
                                padding: '15px 20px'
                              }
                            }}
                          />
                        </Grid>
                        <Grid item lg={12} md={12}>
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                            fullWidth
                          >
                            <InputLabel id="demo-simple-select-outlined-label">Stroke</InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={item.Stroke}
                              onChange={event => onChangeMainStroke(event.target.value, i)}
                              label="Stroke"
                              className={classes.selectField}
                            >
                              {strokeThemeData?.map(stroke => (
                                <MenuItem value={stroke}>{stroke}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item md={12} lg={12} xs={12}>
                          <div className={classes.spacingEnd}>
                            <Card className={classes.card}>
                              <QuillEditor
                                className={classes.editor}
                                value={item.Description}
                                onChange={(value: any) => {
                                  if(delayDebounceFn) clearTimeout(delayDebounceFn);
                                    delayDebounceFn = setTimeout(() => {
                                  onChangeMainDescription(value, i);
                                }, 500);
                                }}
                              />
                            </Card>
                          </div>
                          <Divider />
                        </Grid>
                        <Grid item md={12} lg={12} xs={12}>
                          <Button
                            onClick={() => {
                              onRemoveSets('main', i);
                            }}
                          >
                            Remove Main Exercise
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                  <Button
                    onClick={() => {
                      onAddSets('main');
                    }}
                  >
                    Add Main Exercise
                  </Button>
                  <Divider />
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                  <h3 className={classes.dialogTitle}>Warmdown</h3>
                  {workout?.warmDown?.length > 0 &&
                    workout.warmDown.map((item, i) => (
                      <Grid container spacing={3}>
                        <Grid item lg={12} md={12}>
                          <TextField
                            id="outlined-basic"
                            type="number"
                            label="Repetitions"
                            variant="outlined"
                            value={item.Repetitions}
                            name={`warmDownRepitition${i}`}
                            onChange={event => {
                              onChangeWarmDownRepetitions(event.target.value, i);
                            }}
                            fullWidth
                            inputProps={{
                              style: {
                                padding: '15px 20px'
                              }
                            }}
                          />
                        </Grid>
                        <Grid item lg={12} md={12}>
                          <TextField
                            id="outlined-basic"
                            type="number"
                            label="Distance"
                            variant="outlined"
                            value={item.Distance}
                            name={`warmDownDistance${i}`}
                            onChange={event => {
                              onChangeWarmDownDistance(event.target.value, i);
                            }}
                            fullWidth
                            inputProps={{
                              style: {
                                padding: '15px 20px'
                              }
                            }}
                          />
                        </Grid>
                        <Grid item lg={12} md={12}>
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                            fullWidth
                          >
                            <InputLabel id="demo-simple-select-outlined-label">Stroke</InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              name={`warmDownStroke${i}`}
                              value={item.Stroke}
                              onChange={event => onChangeWarmDownStroke(event.target.value, i)}
                              label="Stroke"
                              className={classes.selectField}
                            >
                              {strokeThemeData?.map(stroke => (
                                <MenuItem value={stroke}>{stroke}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item md={12} lg={12} xs={12}>
                          <div className={classes.spacingEnd}>
                            <Card className={classes.card}>
                              <QuillEditor
                                className={classes.editor}
                                value={item.Description}
                                name={`warmDownDiscription${i}`}
                                onChange={(value: any) => {
                                  if(delayDebounceFn) clearTimeout(delayDebounceFn);
                                    delayDebounceFn = setTimeout(() => {
                                  onChangeWarmDownDescription(value, i);
                                }, 500);
                                }}
                              />
                            </Card>
                          </div>
                          <Divider />
                        </Grid>
                        <Grid item md={12} lg={12} xs={12}>
                          <Button
                            onClick={() => {
                              onRemoveSets('warmdown', i);
                            }}
                          >
                            Remove Warmdown Exercise
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                  <Button
                    onClick={() => {
                      onAddSets('warmdown');
                    }}
                  >
                    Add Warmdown Exercise
                  </Button>
                </Grid>
                <Divider />
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} type="submit" variant="contained" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>

    <Container className={classes.root}>
      <div>
        <Box className={classes.box}>
          <div className={classes.titleContent}>
            <Typography variant="h1" className={classes.PageTitle}>
              Workouts
            </Typography>
            <div>
              <Button variant="contained" className={classes.viewbutton} size='small'>
                NEW WORKOUT
              </Button>
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
          <Grid container spacing={2}>
            <Grid item xs={12} lg={9} md={8}>
              <Card className={classes.fullHeightCard}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableHead}>Name</TableCell>
                      <TableCell className={classes.tableHead}>Actions</TableCell>
                    </TableRow>

                    {videoNames?.map(vid => {
                      return (
                        <TableRow>
                          <TableCell className={classes.tableCell}>{vid}</TableCell>
                          <TableCell className={classes.tableCell}>
                            <IconButton onClick={handleClickOpen} className={classes.IconButton} size="large">
                              <SvgIcon fontSize="small">
                                <Edit />
                              </SvgIcon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableHead>
                </Table>
              </Card>
            </Grid>
            {/* <Box> */}
            <Grid item lg={3} md={4} sm={4}>
              <Card className={classes.filterCard}>
                <Typography className={classes.filterTitle}>FILTERS</Typography>
                <div className={classes.filtertext}>
                  {sampleObject?.map(items => {
                    return (
                      <>
                        <Typography className={classes.titleText}>{items.title}</Typography>

                        {items?.listitems?.map(listitem => (
                          <Typography className={classes.filterListItem}>{listitem}</Typography>
                        ))}
                        <br />
                      </>
                    );
                  })}
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
            <Typography className={classes.filtertext}>FILTERS</Typography>
            <div className={classes.filtertext}>
              <Typography>Order</Typography>
              <Typography>Created At</Typography>
              <Typography>Updated At</Typography>
            </div>
            <div className={classes.filtertext}>
              <Typography>State</Typography>
              <Typography>Finished()</Typography>
              <Typography>Failed()</Typography>
              <Typography>Unsubmitted()</Typography>
            </div>
            <div className={classes.filtertext}>
              <Typography>Assignment</Typography>
              <Typography>Assigned()</Typography>
              <Typography>Unassigned()</Typography>
            </div>
          </Card>
        </Modal>
        {/* filter modal */}
      </div>
    </Container>
  </>;
};

export default Workouts;
