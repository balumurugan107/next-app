import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Grid, Box, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ComponentProps } from 'src/types/components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
const useStyles = makeStyles(theme => ({
  inviteButton: {
    color: theme.palette.common.white,
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  cancelBtn: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      flex: 'auto'
    }
  },
  buttonText: { fontWeight: 500 },
  pageTitle: {
    fontSize: '1.25rem',
    fontWeight: 500,
    color: theme.palette.text.primary
  }
}));

const Header: React.FC<ComponentProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const history = useRouter();
  return (
    <Grid
      container
      justifyContent="space-between"
      {...rest}
      style={{ alignItems: 'center' }}
      sx={{ mb: 2 }}
    >
      <Grid item>
        <Typography variant="h3" className={classes.pageTitle}>
          Members
        </Typography>
      </Grid>
      <Grid item className={classes.cancelBtn}>
        <Box component="span">
          <Button
            color="secondary"
            variant="contained"
            className={classes.inviteButton}
            // component={RouterLink}
            onClick={() => history.back()}
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
