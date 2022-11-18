import React from 'react';
import {
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Formik } from 'formik';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  formControl: {
    marginRight: theme.spacing(1),
    minWidth: 260
  },
  Choosefile: {
    color: 'white',
    background: theme.palette.primary.main
  },
  caution: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  customthumb: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
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
        borderRadius: '0'
      }
    }
  },
  centralDiv: {
    display: 'flex',
    justifyContent: 'space-between'
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
  filterCardModal: {
    marginTop: '5px',
    width: 'auto',
    minWidth: '100px',
    backgroundColor: '#fff',
    padding: theme.spacing(2),
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
    color: theme.palette.text.secondary
  },
  titleText: {
    fontWeight: 1000,
    color: theme.palette.text.secondary
  },
  scheduleLessonSection: {
    '@media (min-width: 600px)': {
      display: 'flex'
    }
  },
  spacingEnd: {
    // padding: '24px',
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
    color: theme.palette.text.primary
  },
  saveBtn: {
    color: theme.palette.common.white
  }
}));

type PropsFunction = (event: any | null) => void;
const EditContractDialog = (props: {
  open: boolean;
  setOpen: PropsFunction;
  addEditToggle: string;
}) => {
  const classes = useStyles();
  const handleClose = () => props.setOpen(false);

  interface IValue {
    name: string;
    revenueSplit: number;
  }

  const initialValues: IValue = {
    name: '',
    revenueSplit: 0
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.Editmodal}
    >
      <div className={classes.top}>
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          {props.addEditToggle} WEEKLY THEMES
        </DialogTitle>
      </div>
      <Formik<IValue>
        initialValues={initialValues}
        onSubmit={async () => {
        }}
      >
        {/* {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => ( */}
        {({ handleSubmit, handleBlur, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={3} className={classes.newLessonWrapper}>
                <Grid item xs={12} md={12} lg={12}>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <TextField
                    id="outlined-number"
                    name="revenueSplit"
                    label="Revenue Split"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    //   className={classes.positionBox}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                className={classes.saveBtn}
                onClick={handleClose}
                type="submit"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditContractDialog;
