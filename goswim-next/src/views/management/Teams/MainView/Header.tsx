/**
 * @file Team Main View Header page
 * @author Pragadeeshwaran Jayapal
 * @since 02-06-2020
 */
import React from 'react';
import { useRouter } from 'next/router';
import { Typography, Breadcrumbs, Link, Grid } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ComponentProps } from 'src/types/components';

const Header: React.FC<ComponentProps> = ({ ...rest }) => {
  return (
    <Grid container spacing={2} justifyContent="space-between" {...rest}>
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" href="/app/dashboard" 
          // component={RouterLink}
          >
            Home
          </Link>
          <Typography color="textPrimary">Groups</Typography>
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
};

export default Header;
