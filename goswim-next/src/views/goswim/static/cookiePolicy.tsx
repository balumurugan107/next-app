import React from 'react';
import MarkDownComponent from './MarkDownComponent';
import Cookie from '../static/parts/_cookie.md';

// const useStyles = makeStyles(theme => ({
//   root: {
//     minHeight: '100vh',
//     padding: 0,
//     margin: 0,
//     backgroundColor: theme.palette.background.dark,
//     color: '#243237'
//   }
// }));

const CookiePolicy = () => {
  let markDown = Cookie.toString();
  return <MarkDownComponent title="Cookie Policy" markDown={markDown} />;
};

export default CookiePolicy;
