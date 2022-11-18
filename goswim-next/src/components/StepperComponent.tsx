import React, { ReactNode } from 'react';
import {
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  SvgIcon,
  Typography,
  StepIconProps,
  Grid,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import { Send as SendIcon } from 'react-feather';
import { useFormikContext } from 'formik';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CancelIcon from '@mui/icons-material/Cancel';

import TooltipComponent from 'src/components/Tooltip';
import LoadingButton from 'src/components/LoadingButton';
import { ComponentProps } from 'src/types';
import { InitialValues } from 'src/views/management/Services/MainView/LiveLessons/FormModel';
import { useCommonStyles } from 'src/styles/common';

const useStyles = makeStyles(theme => ({
  '@global': {
    [theme.breakpoints.down('sm')]: {
      '.MuiFormLabel-root': {
        fontSize: '0.9rem'
      }
    }
  },
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLeft: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  buttonRight: { marginTop: theme.spacing(1), marginRight: 0 },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end'
  },
  resetContainer: {
    padding: theme.spacing(3)
  },
  iconSize: {
    fontSize: 32
  },
  actionIcon: {
    marginLeft: theme.spacing(1)
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  },
  completed: {
    backgroundColor: '#ccc'
  },
  stepperRoot: {
    backgroundColor: 'unset',
    '& .MuiStepConnector-vertical': {
      marginLeft: '24px !important'
    },
    '& .MuiStepLabel-label': { color: '#999999' },
    '& .MuiStepLabel-active': {
      color: theme.palette.text.secondary
    }
  },
  stepperContent: {
    paddingLeft: theme.spacing(8),
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1.25)
    }
  },
  stepperLabel: {
    fontWeight: 800
  },
  VRStepper: {
    [theme.breakpoints.down('sm')]: {
      '& .MuiStepper-root': {
        padding: '0.25rem'
      }
    }
  }
}));

interface Step {
  title: string;
  step: ReactNode;
  icon: ReactNode;
}

interface StepperComponentProps {
  handleClose: () => void;
  steps: Step[];
  handleNext?: () => void;
  handleBack: () => void;
  handleReset: () => void;
  activeStep: number;
}

const StepperComponent: React.FC<ComponentProps & StepperComponentProps> = ({
  handleClose,
  handleBack,
  handleReset,
  activeStep,
  steps
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isSubmitting, isValid } = useFormikContext<InitialValues>();

  const [titles, stepComponents, icons] = steps.reduce<
    [string[], ReactNode[], { [key: string]: ReactNode }]
  >(
    (acc, curr, index) => {
      acc[0] = acc[0].concat(curr.title);
      acc[1] = acc[1].concat(curr.step);
      acc[2][String(index + 1)] = curr.icon;
      return acc;
    },
    [[], [], {}]
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case step:
        return stepComponents[step];

      default:
        return 'Unknown step';
    }
  };

  const ColorlibStepIcon = ({ active, completed, icon }: StepIconProps) => {
    const classes = useStyles();
    return (
      <Box
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed
        })}
      >
        {icons[String(icon)]}
      </Box>
    );
  };

  return <>
    <Box position="relative" className={classes.VRStepper}>
      <Box component="span" position="absolute" right={mobile ? -8 : 0} top={mobile ? -8 : 0}>
        <TooltipComponent title="Close">
          <IconButton onClick={handleClose} size="large">
            <CancelIcon className={commonClasses.cancelColor} fontSize="large" />
          </IconButton>
        </TooltipComponent>
      </Box>
      <Stepper className={classes.stepperRoot} activeStep={activeStep} orientation="vertical">
        {titles?.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <Box ml={3.75}>
                <Typography component="h4" variant="h4" className={classes.stepperLabel}>
                  {label}
                </Typography>
              </Box>
            </StepLabel>

            <StepContent className={classes.stepperContent}>
              <Grid container spacing={3}>
                {getStepContent(index)}
              </Grid>
              <Box className={classes.actionsContainer}>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={activeStep === 0 || isSubmitting}
                    onClick={handleBack}
                    className={classes.buttonLeft}
                  >
                    <ArrowBackIosIcon />
                  </Button>
                  {true && (
                    <LoadingButton
                      isLoading={isSubmitting}
                      variant="contained"
                      color="primary"
                      className={classes.buttonRight}
                      type="submit"
                      progressSize={20}
                      onClick={event => {
                        event.stopPropagation();
                      }}
                      {...{ isValid }}
                    >
                      {activeStep === steps.length - 1 ? (
                        <Box display="flex" justifyContent="center" alignItems="center">
                          <Typography component="span">Assign</Typography>
                          <SvgIcon fontSize="small" className={classes.actionIcon}>
                            <SendIcon />
                          </SvgIcon>
                        </Box>
                      ) : (
                        <ArrowForwardIosIcon />
                      )}
                    </LoadingButton>
                  )}
                  {false && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.buttonRight}
                      type="submit"
                    >
                      {activeStep === steps.length - 1 ? (
                        <Box display="flex" justifyContent="center" alignItems="center">
                          <Typography component="span">Assign</Typography>
                          <SvgIcon fontSize="small" className={classes.actionIcon}>
                            <SendIcon />
                          </SvgIcon>
                        </Box>
                      ) : (
                        <ArrowForwardIosIcon />
                      )}
                    </Button>
                  )}
                </Box>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.buttonLeft}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  </>;
};

export default StepperComponent;
