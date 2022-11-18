/* eslint-disable no-unused-expressions */
import React from 'react';
// import { Link as RouterLink } from 'next/router';

import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ComponentProps } from 'src/types/components';

const Header: React.FC<ComponentProps> = ({ className, ...rest }) => {
  return (
    <Grid container spacing={3} justifyContent="space-between" className={className} {...rest}>
      <Grid item xs={12}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link variant="body1" 
          color="inherit" 
          href="/app/dashboard" 
          // component={RouterLink}
          >
            Home
          </Link>
          <Typography variant="body1" color="textPrimary">
            Members
          </Typography>
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
};

export default Header;
