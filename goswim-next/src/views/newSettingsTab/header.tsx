import React from 'react';
import { Typography, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ComponentProps } from 'src/types/components';

const Header: React.FC<ComponentProps> = ({ className, ...rest }) => {
    return (
        <div className={className} {...rest}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" to="/app/dashboard" component={RouterLink}>
                    Home
                </Link>
                <Typography color="textPrimary">Settings</Typography>
            </Breadcrumbs>
        </div>
    );
};

export default Header;