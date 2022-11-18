import React from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import EditPlanDialog from './EditPlan';
import Page from 'src/components/Page';

export interface filterList {
  title: string;
  listitems: string[];
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  viewbutton: {
    float: 'right',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    minWidth: '175px'
  },
  tableHead: {
    width: '40%',
    fontWeight: 600,
    color: '#fff',
    padding: '10px 16px',
    borderBottom: 'none'
  },
  tableCell: {
    width: '40%',
    fontWeight: 1200,
    color: theme.palette.text.primary,
    padding: 16
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
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)'
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
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
  titleContent: {
    width: '100%',
    float: 'left',
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
      height: '200px'
    }
  },
  table: {
    '& .MuiTableRow-head': {
      background: theme.palette.primary.main,
      color: '#fff'
    },
    '& .MuiTableHead-root': {
      color: theme.palette.text.secondary
    }
  },
  IconButton: {
    padding: 0
  },
  container: {
    marginBottom: theme.spacing(4)
  }
}));

const Plans: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [addPlanToggle, setAddPlanToggle] = React.useState('');
  const handleEditPlan = () => {
    setOpen(true);
    setAddPlanToggle('New');
  };
  return (
    <>
    <Page className={classes.root} title="Admin-Plans">
      <Container className={classes.container}>
        <div>
          <Box>
            <div className={classes.titleContent}>
              <Typography variant="h1" className={classes.PageTitle}>
                Plans
              </Typography>

              <Button
                variant="contained"
                className={classes.viewbutton}
                onClick={() => handleEditPlan()}
                size='small'
              >
                NEW PLAN
              </Button>
            </div>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }}>
                <Card className={classes.fullHeightCard}>
                  <Table>
                    <TableHead className={classes.table}>
                      <TableRow>
                        <TableCell className={classes.tableHead}>Name</TableCell>
                        <TableCell className={classes.tableHead}>Subscribers</TableCell>
                        <TableCell className={classes.tableHead}>URL</TableCell>
                        <TableCell className={classes.tableHead}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Container>
      </Page>
      <EditPlanDialog open={open} setOpen={setOpen} addPlanToggle={addPlanToggle} />
    </>
  );
};

export default Plans;
