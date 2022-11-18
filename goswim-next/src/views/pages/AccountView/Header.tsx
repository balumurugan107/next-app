import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ComponentProps } from 'src/types/components';
import { Subscription } from 'src/store/subscriptions';

interface HeaderProps {
  subscriptions: Subscription[];
}

const Header: React.FC<ComponentProps & HeaderProps> = ({ className, subscriptions, ...rest }) => {
  return (
    <div {...rest}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {subscriptions && (
          <Link color="inherit" to="/app/dashboard" component={RouterLink}>
            Home
          </Link>
        )}
        <Typography color="textPrimary">Account</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default Header;
