import React from 'react';
import { Breadcrumbs, Link, Typography, Grid, Box, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ComponentProps } from 'src/types/components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const useStyles = makeStyles(theme => ({
  inviteButton: {
    color: theme.palette.common.white,
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  cancelBtn: {
    marginTop: -7,
    paddingTop: '0px !important',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      flex: 'auto'
    }
  },
  buttonText: { fontWeight: 500 },
  backFillColor: {
    fill: theme.palette.background.dark
  }
}));

const Header: React.FC<ComponentProps> = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} justifyContent="space-between" {...rest}>
      <Grid item>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link variant="body1" color="inherit" 
          href="/app/dashboard"
           >
            Home
          </Link>
          <Link variant="body1" color="inherit" 
          href="/train" 
          >
            Groups
          </Link>
          <Typography variant="body1" color="textPrimary">
            Group
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item className={classes.cancelBtn}>
        <Box>
          <Button
            color="secondary"
            variant="contained"
            className={classes.inviteButton}
            href="/train"
            startIcon={<ArrowBackIcon />}
          >
            <Typography component="span" className={classes.buttonText}>
              Back
            </Typography>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Header;
