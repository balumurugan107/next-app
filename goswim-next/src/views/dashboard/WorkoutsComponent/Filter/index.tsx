import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, MenuItem, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { WorkoutFilter } from 'src/store/dashboard';
import { updateFilterValues } from 'src/store/dashboard/actions';
import { ITEM_HEIGHT, ITEM_PADDING_TOP } from 'src/constants';

const useStyles = makeStyles(theme => ({
  periodParent: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginTop: theme.spacing(1.25)
  }
}));

const Filter = () => {
  const classes = useStyles();

  const activeTeamList = useSelector(state => state.dashboard.workouts.availableTeams);
  const activeRosterList = useSelector(state => state.dashboard.workouts.activeRosterList);
  const activeSwimmerList = useSelector(state => state.dashboard.workouts.activeSwimmerList);
  const activeTeam = useSelector(state => state.dashboard.workouts.activeTeam);
  const activeRoster = useSelector(state => state.dashboard.workouts.activeRoster);
  const activeSwimmer = useSelector(state => state.dashboard.workouts.activeSwimmer);

  const dispatch = useDispatch();

  const renderDropDown = (
    label: string,
    name: string,
    menuList: WorkoutFilter[],
    activeItem: WorkoutFilter | null
  ) => {
    return (
      <TextField
        label={label}
        name={name}
        size="small"
        select
        fullWidth
        variant="outlined"
        SelectProps={{
          MenuProps: {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transitionDuration: 750,
            getContentAnchorEl: null,
            PaperProps: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
              }
            }
          }
        }}
        onChange={event => {
          dispatch(updateFilterValues({ filterType: name, id: event.target.value }));
        }}
        value={activeItem?.id}
      >
        {menuList?.map((it: WorkoutFilter) => (
          <MenuItem value={it.id} key={it.name}>
            {it.name}
          </MenuItem>
        ))}
      </TextField>
    );
  };
  return (
    <Grid container spacing={2} className={classes.periodParent}>
      { !!activeTeamList?.length && <Grid item xs={12} sm={6} lg={4} xl={4}>
        {renderDropDown(
          'Team',
          'Team',
          [...activeTeamList].sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          ) || [],
          activeTeam
        )}
      </Grid>
      }
      { !!activeRosterList?.length && <Grid item xs={12} sm={6} lg={4} xl={4}>
        {renderDropDown(
          'Roster',
          'Roster',
          [...activeRosterList].sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          ) || [],
          activeRoster
        )}
      </Grid>
      }
      { !!activeSwimmerList?.length && <Grid item xs={12} sm={6} lg={4} xl={4}>
        {renderDropDown(
          'Swimmer',
          'Swimmer',
          [...activeSwimmerList].sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          ) || [],
          activeSwimmer
        )}
      </Grid>
      }
    </Grid>
  );
};

export default memo(Filter);
