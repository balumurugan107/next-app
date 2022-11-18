import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  SvgIcon,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { Edit } from 'react-feather';
import Page from 'src/components/Page';
import EditContractDialog from 'src/views/goswim/admin/Contracts/EditContracts';


export interface filterList {
  title: string;
  listitems: string[];
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    marginBottom: theme.spacing(3)
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
    width: '40%',
    fontWeight: 1200,
    color: theme.palette.text.secondary
  },
  tableCell: {
    width: '40%',
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
    height: '100%'
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
    backgroundColor: theme.palette.background.paper,
    '@media (max-width: 600px)': {
      display: 'block'
    }
  },
  filterCardModal: {
    marginTop: '5px',
    width: 'auto',
    minWidth: '100px',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2)
  },
  filtertext: {
    margin: '25px',
    fontWeight: 700
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
    '&:hover': {
      color: theme.palette.common.white
    },
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
    fontWeight: 600,
    color: theme.palette.primary.main,
    fontSize: 16,
    marginBottom: theme.spacing(1)
  },
  titleText: {
    fontWeight: 500,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5)
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
  IconButton: {
    padding: '0'
  },
  responsiveTable: {
    overflowX: 'auto'
  }
}));

const WeeklyThemes: React.FC = () => {
  const classes = useStyles();

  const videoNames = ['Lesson1', 'Lesson2', 'Lesson3', 'Lesson4', 'Lesson5'];

  const [open, setOpen] = React.useState(false);
  const [addEditToggle, setAddEditToggle] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
    setAddEditToggle('EDIT');
  };

  const handleWeeklyTheme = () => {
    setOpen(true);
    setAddEditToggle('NEW');
  };

  return <>
  <Page  title="Admin-Contracts">
    <Container className={classes.root}>
      <div>
        <Box>
          <div className={classes.titleContent}>
            <Typography className={classes.PageTitle}>Contracts</Typography>
            <div>
              <Button
                variant="contained"
                className={classes.viewbutton}
                onClick={handleWeeklyTheme}
                size='small'
              >
                NEW CONTRACT
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                className={classes.filterButton}
              >
                FILTER
              </Button>
            </div>
          </div>
          <Grid container className={classes.responsiveTable}>
            <Grid item lg={12} md={12} sm={12}>
              <Card className={classes.fullHeightCard}>
                <div>
                  <Table>
                    <TableHead className={classes.table}>
                      <TableRow>
                        <TableCell className={classes.tableHead}>Name</TableCell>
                        <TableCell className={classes.tableHead}>Split</TableCell>
                        <TableCell className={classes.tableHead}>Lesson Count</TableCell>
                        <TableCell className={classes.tableHead}>Actions</TableCell>
                      </TableRow>
                      <Divider light />
                      {videoNames?.map(vid => {
                        return (
                          <TableRow>
                            <TableCell className={classes.tableCell}>{vid}</TableCell>
                            <TableCell className={classes.tableCell}>{vid}</TableCell>
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
                </div>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Container>
    </Page>
    <EditContractDialog open={open} setOpen={setOpen} addEditToggle={addEditToggle} />
  </>;
};

export default WeeklyThemes;
