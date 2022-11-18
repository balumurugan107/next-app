import React, { useEffect } from 'react';
import {
  Box,
  FormControlLabel,
  IconButton,
  InputAdornment,
  SvgIcon,
  Switch,
  TextField,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { X as ClearIcon, Search as SearchIcon } from 'react-feather';
import TooltipComponent from 'src/components/Tooltip';
import { setServiceSearchQuery } from 'src/store/management/service';
import clsx from 'clsx';
import SetIcon from 'src/components/SetIcon';
import LiveLessonIcon from 'src/components/LiveLessonIcon';
import VideoReviewIcon from 'src/components/VideoReviewIcon';

const useStyles = makeStyles(theme => ({
  clearIcon: {
    marginRight: '-1.25rem'
  },
  searchField: {
    marginLeft: 'auto',
    marginBottom: 8,
    [theme.breakpoints.down('sm')]: { marginTop: 8 }
  },
  queryField: {
    width: 250,
    marginTop: 25,
    [theme.breakpoints.between(360, 420)]: { width: '305px !important' },
    [theme.breakpoints.down('sm')]: { width: 355 }
  },
  switchBtnBox: {
    float: 'right',
    marginTop: 15
  },
  switchBtn: {
    marginRight: 5,
    [theme.breakpoints.down('sm')]: { marginRight: -11, fontSize: 12, marginLeft: 0 },
    '& .MuiTypography-body1 ': {
      [theme.breakpoints.down('sm')]: { fontSize: 12 }
    }
  },
  iconsBtn: {
    marginLeft: 'auto',
    // background: 'red',
    '& svg':{
      '& path':{
        fill: theme.palette.secondary.main
      }
    }
  },
  settingIcon: {
    fill: '#9C9C9C',
    fontSize: 35,
    [theme.breakpoints.down('sm')]: { fontSize: 28 }
  }
}));

interface FilterHeaderProps {
  searchPlaceholder: string;
  iscompleted: boolean;
  isSet: boolean;
  isLesson: boolean;
  handleCompletedSwitch(value: boolean): void;
  handleAddNew(): void;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({
  iscompleted,
  isSet,
  isLesson,
  handleCompletedSwitch,
  handleAddNew,
  searchPlaceholder
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { searchQuery } = useSelector(state => {
    return {
      searchQuery: state.service.searchQuery
    };
  }, _.isEqual);

  const handleQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setServiceSearchQuery(event.target.value));
  };

  const handleCloseQueryChange = () => {
    dispatch(setServiceSearchQuery(''));
  };

  useEffect(
    () => () => {
      dispatch(setServiceSearchQuery(''));
    },
    [] // eslint-disable-line
  );

  return <>
    <Box mt={-2} className={classes.searchField}>
      <TextField
        className={classes.queryField}
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon fontSize="small" color="action">
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="start">
              <IconButton
                aria-label="clear"
                className={classes.clearIcon}
                onClick={handleCloseQueryChange}
                size="large">
                <ClearIcon width="18" height="18" />
              </IconButton>
            </InputAdornment>
          )
        }}
        onChange={handleQueryChange}
        value={searchQuery}
        placeholder={searchPlaceholder}
        variant="outlined"
        size="small"
      />
      <Box className={classes.switchBtnBox}>
        <FormControlLabel
          control={<Switch color="secondary" />}
          checked={iscompleted}
          label="Show completed"
          labelPlacement="start"
          className={classes.switchBtn}
          onChange={(_1: React.ChangeEvent<{}>, checked: boolean) =>
            handleCompletedSwitch(checked)
          }
        />
        <TooltipComponent
          title={isSet ? 'Add Set' : isLesson ? 'Add Live Lesson' : 'Add Video Review'}
        >
          <IconButton
            color="secondary"
            className={clsx(classes.iconsBtn)}
            onClick={() => handleAddNew()}
            size="large">
            {isSet ? <SetIcon /> : isLesson ? <LiveLessonIcon /> : <VideoReviewIcon />}
          </IconButton>
        </TooltipComponent>
      </Box>
      <Box flexGrow={1} />
    </Box>
  </>;
};

export default FilterHeader;
