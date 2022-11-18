import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import COMPANY from '../static/parts/_company.md';
import MarkDownComponent from './MarkDownComponent';

// const useStyles = makeStyles(theme => ({
//   root: {
//     minHeight: '100vh',
//     padding: 0,
//     margin: 0,
//     backgroundColor: theme.palette.background.dark,
//     color: '#243237'
//   }
// }));

const Company = () => {
  // const classes = useStyles();
  let markdownText = COMPANY.toString();
  return <MarkDownComponent title="GOSWIM" markDown={markdownText} />;
};

export default Company;
