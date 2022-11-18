import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ComponentProps } from 'src/types/components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const useStyles = makeStyles(theme => ({
  inviteButton: {
    color: theme.palette.common.white,
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  buttonText: { fontWeight: 500 },
  titleWithBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pageTitle: {
    fontSize: '1.25rem',
    fontWeight: 500,
    color: theme.palette.text.primary
  }
}));

const Header: React.FC<ComponentProps> = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <Box className={classes.titleWithBtn}>
        <Typography variant="h3" className={classes.pageTitle}>
          Create Special Group
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          className={classes.inviteButton}
          // component={RouterLink}
          onClick={() => history.goBack()}
          startIcon={<ArrowBackIcon />}
        >
          <Typography component="span" className={classes.buttonText}>
            Back
          </Typography>
        </Button>
      </Box>

      <Box component="span"></Box>
    </>
  );
};

export default Header;
