import React from 'react';
import clsx from 'clsx';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  DialogProps,
  Typography,
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import { DialogType } from 'src/constants';
import { ComponentProps } from 'src/types';

export interface InformationProps extends DialogProps {
  type: DialogType.INFORMATION;
  title: string;
  handleCloseDialog: () => void;
  handleCloseInformation: () => void;
  buttonClasses?: Record<'buttonOk', string>;
}

export interface ConfirmationProps<T = any> extends DialogProps {
  type: DialogType.CONFIRMATION;
  title: string;
  values: T;
  handleCloseDialog: () => void;
  handleNo: () => void;
  handleYes: (values: T) => void;
  buttonClasses?: Record<'buttonYes' | 'buttonNo', string>;
}

const useStyles = makeStyles(theme => ({
  titleh1: {
    fontSize: '18px',
    color: theme.palette.primary.main
  }
}));

export default function DialogBox<T>({
  handleCloseDialog,
  title,
  type,
  children,
  open,
  className,
  ...rest
}: (ComponentProps & InformationProps) | ConfirmationProps<T>) {
  let render;
  const classes = useStyles();
  switch (type) {
    case DialogType.INFORMATION: {
      const { handleCloseInformation, buttonClasses } = rest as InformationProps;
      render = (
        <Button
          onClick={handleCloseInformation}
          className={buttonClasses?.buttonOk}
          color="secondary"
          variant="contained"
        >
          OK
        </Button>
      );
      break;
    }

    case DialogType.CONFIRMATION: {
      const { handleNo, handleYes, values, buttonClasses } = rest as ConfirmationProps;
      render = (
        <>
          <Button onClick={handleNo} className={buttonClasses?.buttonNo} variant="contained">
            No
          </Button>
          <Button
            onClick={() => handleYes(values)}
            className={clsx(buttonClasses?.buttonYes)}
            color="secondary"
            variant="contained"
          >
            Yes
          </Button>
        </>
      );
      break;
    }

    default:
      render = null;
      break;
  }
  return (
    <Dialog
      className={className}
      fullWidth={rest.fullWidth}
      maxWidth="sm"
      onClose={handleCloseDialog}
      aria-labelledby="customized-dialog-title"
      open={open}
      TransitionComponent={Slide}
      transitionDuration={500}
    >
      <DialogTitle id="customized-dialog-title">
        <Typography className={classes.titleh1}>{title} </Typography>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions> {render} </DialogActions>
    </Dialog>
  );
}
