import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ComponentProps } from 'src/types/components';

const Header: React.FC<ComponentProps> = ({ className, ...rest }) => {
  return (
    <Grid className={className} container justifyContent="space-between" spacing={3} {...rest}>
      <Grid item>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link variant="body1" color="inherit" to="/app/dashboard" component={RouterLink}>
            Home
          </Link>
          <Typography variant="body1" color="textPrimary">
            Services
          </Typography>
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
};

export default Header;
