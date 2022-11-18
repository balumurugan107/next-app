import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Breadcrumbs, Button, Grid, Link, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ComponentProps } from 'src/types/components';

const useStyles = makeStyles(theme => ({
  backButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 'auto'
  },
  BtnCommon: {
    color: `${theme.palette.common.white} !important`
  }
}));

const Header: React.FC<ComponentProps> = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} justifyContent="space-between" className={className} {...rest}>
      <Grid item>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link variant="body1" color="inherit" to="/app/dashboard" component={RouterLink}>
            Home
          </Link>
          <Link variant="body1" color="inherit" to="/members" component={RouterLink}>
            Members
          </Link>
          <Typography variant="body1" color="textPrimary">
            Member
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item className={classes.backButton}>
        <Button
          variant="contained"
          component={RouterLink}
          to="/members"
          className={classes.BtnCommon}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
