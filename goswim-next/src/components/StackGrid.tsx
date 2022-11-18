import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ReactStackGrid, { StackGridProps } from 'react-stack-grid';

const useStyles = makeStyles((theme) => ({
  stackRoot: {
    width: '100%',
    marginBottom: theme.spacing(2)
  }
}));

const StackGrid: React.FC<{ options?: StackGridProps }> = ({ children, options }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const laptop = useMediaQuery(theme.breakpoints.down('xl'));
  // const dasktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <ReactStackGrid
      columnWidth={mobile ? '100%' : tablet ? '50%' : laptop ? '33.33%' : '25%'}
      className={classes.stackRoot}
      itemComponent="div"
      gutterWidth={24}
      gutterHeight={24}
      {...options}
    >
      {children}
    </ReactStackGrid>
  );
};

export default StackGrid;
