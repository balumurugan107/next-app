import React from 'react';
import {
  Dialog as MUIDialog,
  DialogContentText,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide
} from '@mui/material';

export interface DialogProps {
  handleCloseDialog: () => void;
  isDialogOpen: boolean;
  tilte: JSX.Element;
  content: JSX.Element;
  handleYes?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleNo?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  yesContent?: JSX.Element;
  noContent?: JSX.Element;
  fullWidth?: boolean;
}

const Dialog: React.FC<DialogProps> = ({
  handleCloseDialog,
  isDialogOpen,
  tilte,
  content,
  handleYes,
  handleNo,
  yesContent = <>yes</>,
  noContent = <>no</>,
  fullWidth = false
}) => (
  <MUIDialog
    fullWidth={fullWidth}
    maxWidth="sm"
    onClose={handleCloseDialog}
    aria-labelledby="customized-dialog-title"
    open={isDialogOpen}
    TransitionComponent={Slide}
    transitionDuration={500}
  >
    <DialogTitle id="customized-dialog-title">{tilte}</DialogTitle>
    <DialogContent dividers>
      <DialogContentText>{content}</DialogContentText>
    </DialogContent>
    <DialogActions>
      {handleNo && (
        <Button onClick={handleNo} variant="contained" style={{color: '#fff'}}>
          {noContent}
        </Button>
      )}
      {handleYes && (
        <Button onClick={handleYes} color="primary" variant="contained" style={{color: '#fff'}}>
          {yesContent}
        </Button>
      )}
    </DialogActions>
  </MUIDialog>
);

export default Dialog;
