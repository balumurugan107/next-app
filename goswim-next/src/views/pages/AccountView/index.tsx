import React from 'react';
import { Box, Container, Slide } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import General from 'src/views/pages/AccountView/General';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'theme.palette.background.dark',
    marginBottom: theme.spacing(3),
    '& span.MuiTab-wrapper': {
      flexDirection: 'row-reverse'
    }
  }
}));

const AccountView = () => {
  const classes = useStyles();

  return (
    <Slide direction="right" in mountOnEnter unmountOnExit>
      <Container>
        <Box mt={3}>
          <General />
        </Box>
      </Container>
    </Slide>
  );
};

export default AccountView;
