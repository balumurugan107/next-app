import React from 'react';
import { Breadcrumbs, Button, Grid, Link, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ComponentProps } from 'src/types/components';

const useStyles = makeStyles(() => ({
  backBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 'auto',
    marginBottom: 8
  }
}));

const Header: React.FC<ComponentProps> = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} justifyContent="space-between" {...rest}>
      <Grid item>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link variant="body1" color="inherit" href="/calendar" >
            Home
          </Link>
          <Link variant="body1" color="inherit" href="/train">
            Teams
          </Link>
          <Typography variant="body1" color="textPrimary">
            Team
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item className={classes.backBtn}>
        <Button
          color="secondary"
          variant="contained"
          href="/train"
          size='small'
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
