import React, { useEffect, useState } from 'react';
import { Checkbox, Grid, ListItemText, MenuItem } from '@mui/material';
import { Field, useFormikContext } from 'formik';
// import { TextField } from 'formik-material-ui';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';


import ServiceCardComponent from 'src/components/ServiceCardComponent';

import { ComponentProps } from 'src/types';
import DropDownSpinning from 'src/components/DropDownSpinning';
import { model, InitialValues } from 'src/views/management/Services/MainView/LiveLessons/FormModel';
import { CommonKeywords } from 'src/constants';
import { sortTeam } from 'src/utils/sortTeam';
import { setTeamValue, TeamRosterValueKeys } from 'src/store/common';

const LessonAssign: React.FC<ComponentProps> = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const [rosterGroup, setRosterGroup] = useState<string[]>([]);
  const { teams, isLoading, settings, persistTeam } = useSelector(
    state => ({
      teams: sortTeam(state.team.heirarchyTeams)?.filter(team => team.rosterGroup.length) || [],
      isLoading: state.team.isLoading,
      settings: state.account.settings,
      persistTeam: state.common.persist.teamValues
    }),
    _.isEqual
  );
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext<InitialValues>();
  const {
    formField: { team, roster }
  } = model;
  const { team: selectedTeam } = values;

  useEffect(() => {
    if (!isLoading && selectedTeam === '' && teams.length) {
      setFieldValue(
        team.name,
        persistTeam[TeamRosterValueKeys.SERVICES_LIVE_LESSONS] || teams[0]._id
      );
    }
  }, [isLoading, selectedTeam]); // eslint-disable-line

  useEffect(() => {
    const rosterGroup = teams.find(team => team._id === selectedTeam)?.rosterGroup || [];
    setRosterGroup(rosterGroup);
  }, [selectedTeam]); // eslint-disable-line

  return (
    <>
      <Grid item xs={12} sm={6} md={4} xl={3}>
        <Field
          component={TextField}
          label={team.label}
          name={team.name}
          value={isLoading ? 'Loading' : values.team}
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
            },
            onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
              setFieldValue(team.name, event.target.value);
              dispatch(
                setTeamValue({
                  [TeamRosterValueKeys.SERVICES_LIVE_LESSONS]: event.target.value
                })
              );
              setFieldValue(roster.name, []);
            }
          }}
        >
          {isLoading ? (
            <MenuItem key="Loading" value="Loading">
              <DropDownSpinning />
            </MenuItem>
          ) : (
            teams?.map((team, index) => (
              <MenuItem key={index} value={team._id}>
                {team.name}
              </MenuItem>
            ))
          )}
        </Field>
      </Grid>
      <Grid item xs={12} sm={6} md={4} xl={3}>
        <Field
          autoFocus
          component={TextField}
          select
          name={roster.name}
          label={roster.label}
          SelectProps={{
            MenuProps: {
              autoFocus: false,
              transitionDuration: 750,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left'
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left'
              },
              getContentAnchorEl: null,
              PaperProps: {
                style: {
                  maxHeight: 224,
                  width: 250
                }
              }
            },
            onChange: (
              event: React.ChangeEvent<{
                name?: string;
                value: string[];
              }>
            ) => {
              if (event.target.value.includes(CommonKeywords.ALL)) {
                rosterGroup.length === values.roster.length
                  ? setFieldValue(roster.name, [])
                  : setFieldValue(roster.name, rosterGroup);
              } else {
                setFieldValue(roster.name, event.target.value);
              }
            },
            multiple: true,
            renderValue: (selected: string[]) => {
              return selected.join(',');
            }
          }}
          variant="outlined"
          size="small"
          fullWidth
        >
          {[
            <MenuItem key={CommonKeywords.ALL} value={CommonKeywords.ALL}>
              <Checkbox checked={values.roster.length === rosterGroup.length} />
              <ListItemText primary={CommonKeywords.ALL.toUpperCase()} />
            </MenuItem>,
            [...rosterGroup]
              ?.sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
              ?.map((roster, index) => (
                <MenuItem key={index} value={roster}>
                  <Checkbox checked={values.roster.indexOf(roster) > -1} />
                  <ListItemText primary={roster} />
                </MenuItem>
              ))
          ]}
        </Field>
      </Grid>

      {/* assign card component rendered here */}
      <Grid item xs={12} xl={12}>
       

       <ServiceCardComponent
        liveSchedule={values.liveSchedule}
        isEditor
        description={values.description}
        schedule={values.schedule}
        title={values.name}
        startDate={values.lessonDate.format(settings.dateFormat)}
        isPreview={true}
        // slotsData={values.slots}
        team={teams.find(team => team._id === values.team)?.name}
        roster={values.roster}
        // price={values.cost}
        />
      </Grid>
    </>
  );
};

export default LessonAssign;
