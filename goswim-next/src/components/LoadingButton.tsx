import React from 'react';
import { ButtonProps, Button, CircularProgress, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ComponentProps } from 'src/types';

interface LoadingButtonProps {
  isLoading: boolean;
  isValid: boolean;
  progressSize?: string | number;
  buttonVariant?: boolean;
}

const useStyles = makeStyles(theme => ({
  actionIcon: {
    marginLeft: 10
  },

  lodingBtn: {
    color: theme.palette.common.white,
    '& svg': {
      color: theme.palette.common.white
    }
  },
  lodingBtnText: {
    color: theme.palette.primary.main,
    '& svg': {
      color: theme.palette.primary.main
    }
  },
  selectedBtn: {
    color: theme.palette.primary.main,
    '& svg': {
      color: theme.palette.primary.main
    },
    borderColor: theme.palette.secondary.main,
    minWidth: '175px',
    '&.Mui-disabled': {
      color: '#000',
      opacity: 0.5,
      borderColor: theme.palette.primary.main
    }
  },
}));

const LoadingButton: React.FC<LoadingButtonProps & ComponentProps & ButtonProps> = ({
  isLoading,
  children,
  progressSize,
  isValid,
  disabled,
  buttonVariant,
  ...props
}) => {
  const classes = useStyles();

  const LoadingState: React.FC<ComponentProps> = () => (
    <Box>
      <Box component="span">{children}</Box>
      <Box component="span" display="flex" justifyContent="center" mt={-2.5}>
        <CircularProgress size={progressSize} className={classes.actionIcon} />
      </Box>
    </Box>
  );

  return (
    <Button
      className={buttonVariant && classes.selectedBtn || props.variant === 'text' ? classes.lodingBtnText : classes.lodingBtn}
      size='small'
      variant={buttonVariant ? "outlined" : "contained"}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <LoadingState /> : <>{children}</>}
    </Button>
  );
};

export default LoadingButton;
