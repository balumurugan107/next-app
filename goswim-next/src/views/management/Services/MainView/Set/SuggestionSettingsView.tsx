import React, { useMemo, useState } from 'react';
import {
  Card,
  Box,
  Tabs,
  Tab,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  InputAdornment,
  SvgIcon,
  TextField,
  Grid,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { X as ClearIcon, Search as SearchIcon } from 'react-feather';
import CancelIcon from '@mui/icons-material/Cancel';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CommonComponent from 'src/views/management/Services/MainView/Set/SuggestionComponent/CommonComponent';
import TooltipComponent from 'src/components/Tooltip';
import { useCommonStyles } from 'src/styles/common';

interface SuggestionSettingsViewProps {
  handleSugestionSettings(state: boolean): void;
}

const useStyles = makeStyles(theme => ({
  '@global': {
    '.MuiDialog-scrollPaper': {
      alignItems: 'flex-start',
      position: 'relative'
    }
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    cursor: 'default',
    padding: 16,
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      }
    }
  },
  tabs: {
    maxHeight: 50
  },
  dialogBody: {
    marginBottom: 24
  },
  iconsBtn: {
    marginTop: -6
  },
  iconSize: {
    fontSize: 32
  },
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
    [theme.breakpoints.between(360, 420)]: { width: '305px !important' },
    [theme.breakpoints.down('sm')]: { width: 355 }
  }
}));

export const SuggestionSettingsView: React.FC<SuggestionSettingsViewProps> = ({
  handleSugestionSettings
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentTab, setCurrentTab] = useState<string>('intensity_enum');
  const [isSugestionEditorVisible, setSugestionEditorVisible] = useState<boolean>(false);
  const [enumSearchQuery, setEnumSearchQuery] = useState<string>('');
  const handleSuggestionEditorVisible = (value: boolean) => {
    setSugestionEditorVisible(value);
  };

  const tabs = useMemo(
    () => [
      { value: 'intensity_enum', label: 'INTENSITIES' },
      { value: 'stroke_enum', label: 'STROKES' },
      { value: 'action_enum', label: 'TYPES' },
      { value: 'equipment_enum', label: 'EQUIPMENT' },
      { value: 'course_enum', label: 'COURSES' }
    ],
    []
  );

  const handleTabsChange = (_1: React.ChangeEvent<{}>, value: string) => {
    setCurrentTab(value);
    handleSuggestionEditorVisible(false);
  };

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Box display="flex">
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
                endAdornment: enumSearchQuery && (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="clear"
                      className={classes.clearIcon}
                      onClick={() => setEnumSearchQuery('')}
                      size="large">
                      <ClearIcon width="18" height="18" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                setEnumSearchQuery(event.target.value)
              }
              value={enumSearchQuery}
              placeholder={'Search Enums'}
              variant="outlined"
              size="small"
            />
            <Box display="flex" justifyContent="flex-end" ml={'auto'}>
              <Box>
                <TooltipComponent title="Add">
                  <IconButton
                    className={classes.iconsBtn}
                    color="secondary"
                    onClick={() => {
                      handleSuggestionEditorVisible(true);
                    }}
                    size="large">
                    <PostAddIcon color="secondary" className={classes.iconSize} />
                  </IconButton>
                </TooltipComponent>
              </Box>
              <Box>
                <TooltipComponent title="Close">
                  <IconButton
                    className={classes.iconsBtn}
                    onClick={() => handleSugestionSettings(false)}
                    size="large">
                    <CancelIcon className={commonClasses.cancelColor} fontSize="large" />
                  </IconButton>
                </TooltipComponent>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box display={mobile ? 'block' : 'flex'}>
        <Tabs
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={currentTab}
          variant="scrollable"
          textColor="secondary"
          className={classes.tabs}
        >
          {tabs?.map(tab => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </Box>
      <Divider />
      <Box className={classes.dialogBody}>
        <CommonComponent
          type={currentTab}
          {...{ enumSearchQuery, isSugestionEditorVisible, handleSuggestionEditorVisible }}
        />
      </Box>
    </Card>
  );
};
