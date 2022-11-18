import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, Box, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ComponentProps } from 'src/types/components';
import BackIcon from 'src/components/BackIcon';

const useStyles = makeStyles(theme => ({
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  addButton: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(3),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  backButton: {
    marginTop: -15,
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 'auto',
    color: theme.palette.common.white
  },
  buttonText: { fontWeight: 500 }
}));

const Header: React.FC<ComponentProps> = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} justifyContent="space-between" className={className} {...rest}>
      <Grid item>
        <Box>
          <Button
            color="secondary"
            variant="contained"
            className={classes.backButton}
            component={RouterLink}
            to="/members"
            startIcon={<BackIcon />}
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
