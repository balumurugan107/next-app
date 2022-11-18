import React, { useRef, useState, useEffect } from 'react';
import { Grid, MenuItem, FormHelperText, FormControl, InputLabel, Select } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useFormikContext, ErrorMessage } from 'formik';
import ServiceCardComponent from 'src/components/ServiceCardComponent';
import { model, EditorData } from 'src/views/management/Services/MainView/VideoReviews/FormModel';
import { AccountType } from 'src/constants';
import { TeamHeirarchyDocument } from 'src/store/management/team/types';
import { SelectOption, ComponentProps } from 'src/types';
import { sortTeam } from 'src/utils/sortTeam';
import { TeamRosterValueKeys } from 'src/store/common';
import moment from 'moment';
import config from 'src/config';
import { setMembersDropDownSelectedTeams } from 'src/store/management/members';

const ReviewAssign: React.FC<ComponentProps> = () => {
  const {
    team: { isLoading, heirarchyTeams },
    persistTeam
  } = useSelector(state => ({ team: state.team, persistTeam: state.common.persist.teamValues }));

  const [team, setTeam] = useState<SelectOption[]>([]);
  const dispatch = useDispatch();

  const previousTeamDropdownRef = useRef<TeamHeirarchyDocument[]>();

  const settings = useSelector(state => state.account.settings);

  const { values, setFieldValue, initialValues } = useFormikContext<EditorData>();

  const {
    formField: { vrTeam }
  } = model;
  useEffect(() => {
    const sortedTeams = sortTeam(heirarchyTeams);
    if (!isLoading && sortedTeams.length && !_.isEqual(previousTeamDropdownRef, sortedTeams)) {
      let tempTeams: typeof team = [];
      for (let i = 0; i < sortedTeams.length; i++) {
        tempTeams = [...tempTeams, { title: sortedTeams[i].name, value: sortedTeams[i]._id }];
      }
      setTeam(tempTeams);
      setFieldValue(
        vrTeam.name,
        persistTeam[TeamRosterValueKeys.SERVICES_VIDEO_REVIEWS] ||
        initialValues.vrTeam ||
        sortedTeams[0]._id
      );
      previousTeamDropdownRef.current = sortedTeams;
    }
  }, [isLoading, heirarchyTeams]); // eslint-disable-line


  const startDate = moment(new Date());
  var endDate = moment(startDate).add(25, 'years');
  values.startDate = startDate
  values.endDate = endDate

  const slotsAvailable = 99999;

  const selectedTeam = useSelector(state => state.members.currentSelectedTeam);

  const teamData = useSelector(state => state.team.heirarchyTeams) || [];
  
  // const selectedTeam = useSelector(state => state.members.currentSelectedTeam);
  const goswimGroupId = config.goswimGroupAPI.groupId;
  const filteredTeamData = teamData && teamData?.filter(team => team._id !== goswimGroupId);


  const handleChangeTeam = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // try {
      const value = event.target.value;
      dispatch(
        setMembersDropDownSelectedTeams({ arrayOfSelectedTeams: [value], selectedTeam: value })
      );
    //   if (value === 'ALL') {
    //     dispatch(
    //       setMembersDropDownSelectedTeams({
    //         arrayOfSelectedTeams: filteredTeamData.map(team => team._id),
    //         selectedTeam: value
    //       })
    //     );
    //   } else {
    //     dispatch(
    //       setMembersDropDownSelectedTeams({ arrayOfSelectedTeams: [value], selectedTeam: value })
    //     );
    //   }
    // } catch (ex) {
    //   console.error(ex);
    // }
  };

  const useStyles = makeStyles(({
    groupSelection:{
      minWidth: '200px'
    }
  }));

  const classes = useStyles();

  const userType = useSelector(state => state?.account?.user?.role);

  const filteredTeam = teamData.find(datum => datum._id === selectedTeam) || null;

  return (
    <>
      <Grid item xs={12} sm={6} md={4} xl={3}>
        {/* <Dropdown
          label={vrTeam.label}
          name={vrTeam.name}
          menuList={team}
          value={selectedTeam}
          onChange={event => {
            setFieldValue(vrTeam.name, event.target.value);
            setFieldValue(vrRoster.name, []);
            dispatch(
              setTeamValue({
                [TeamRosterValueKeys.SERVICES_VIDEO_REVIEWS]: event.target.value
              })
            );
          }}
          {...{ isLoading }}
        /> */}
        {
          (userType === AccountType.COACH) &&
          <FormControl variant="outlined"  size="small">
          <InputLabel id="group">Group</InputLabel>
          <Select
            labelId="group"
            className={classes.groupSelection}
            id="selectGroup"
            value={selectedTeam}
            onChange={(e: any) => handleChangeTeam(e)}
            label="Group"
          >
            {/* <MenuItem value="ALL">All</MenuItem> */}
            {filteredTeamData?.map(teamData => (
              <MenuItem value={teamData._id} key={teamData._id}>
                {teamData.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        }
        <ErrorMessage
          name={vrTeam.name}
          render={msg => <FormHelperText error>{msg}</FormHelperText>}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} xl={3}>
        {/* roster group hidden */}
        {/* <Field
          component={FormikTextField}
          select
          name={vrRoster.name}
          label={vrRoster.label}
          disabled={!roster[values.vrTeam]?.length}
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
              let value: string[] = [];
              if (event.target.value.includes(CommonKeywords.ALL)) {
                value =
                  roster[values.vrTeam]?.length === values.vrRoster.length
                    ? []
                    : roster[values.vrTeam];
              } else {
                value = [...event.target.value];
              }
              setFieldValue(vrRoster.name, value);
              dispatch(
                setRosterValues({
                  [TeamRosterValueKeys.SERVICES_VIDEO_REVIEWS]: value
                })
              );
            },
            multiple: true,
            renderValue: (selected: string[]) => {
              return selected.join(', ');
            }
          }}
          variant="outlined"
          size="small"
          fullWidth
        >
          <MenuItem key={CommonKeywords.ALL} value={CommonKeywords.ALL}>
            <Checkbox checked={values.vrRoster.length === roster[values.vrTeam]?.length} />
            <ListItemText primary={CommonKeywords.ALL.toUpperCase()} />
          </MenuItem>
          {roster[values.vrTeam] &&
            [...roster[values.vrTeam]]
              .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
              .map((datum, index) => (
                <MenuItem key={index} value={datum}>
                  <Checkbox checked={values.vrRoster.indexOf(datum) > -1} />
                  <ListItemText primary={datum} />
                </MenuItem>
              ))}
        </Field> */}
      </Grid>

      <ServiceCardComponent
        schedule=" "
        liveSchedule={[]}
        isEditor
        title={values.vrName}
        description={values.vrDescription}
        startDate={values.startDate.format(settings.dateFormat)}
        endDate={values.endDate.format(settings.dateFormat)}
        slots={slotsAvailable}
        // team={team.find(datum => datum.value === values.vrTeam)?.title || ''} //for goswim stage
        // team={teamData.find(datum => datum._id === selectedTeam)?.name || ''} // for selected team
        team={filteredTeam?.name ? filteredTeam.name : ''}
        // roster={rosterTitle}
        price={values.cost}
      />
    </>
  );
};

export default ReviewAssign;
