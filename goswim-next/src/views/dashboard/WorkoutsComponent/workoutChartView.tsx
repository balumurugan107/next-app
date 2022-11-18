import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Box, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ChartView from 'src/views/dashboard/WorkoutsComponent/ChartView';
import TooltipComponent from 'src/components/Tooltip';
import { ChartData } from 'src/views/dashboard/WorkoutsComponent';

interface Options {
  id: string;
  name: string;
  defaultIcon: string;
  inactiveIcon: string;
  activeIcon: string;
  key: string;
  enableClick: boolean;
}

interface HudData {
  id: number;
  name: string;
  value: number;
}

interface WorkoutData {
  newData: HudData[];
  chartData: ChartData[];
}

const useStyles = makeStyles(theme => ({
  sunBurstHud: {
    '& svg': {
      [theme.breakpoints.down('sm')]: { transform: 'scale(0.8)' }
    }
  },
  dateText: {
    fontSize: '1.25rem',
  },
  dashboardInfoText: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  swimmerCategoryRoot: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '7px 0 10px 0',
    '& div': {
      margin: '6px 6px 0 6px',
      cursor: 'pointer',
      '& img': {
        width: '38px'
      },
      '& img:hover': {
        transform: 'scale(1.3)'
      }
    },
    '& div[data-click-enabled=false]': {
      pointerEvents: 'none'
    }
  }
}));

const WorkoutChart: React.FC = () => {
  const classes = useStyles();

  const isFetching = useSelector(state => state?.dashboard?.workouts.isSetsDataLoading);
  const data = useSelector(state => state?.dashboard?.workouts.setsData);
  const activeTeam = useSelector(state => state.dashboard.workouts.activeTeam);
  const activeRoster = useSelector(state => state.dashboard.workouts.activeRoster);
  const activeSwimmer = useSelector(state => state.dashboard.workouts.activeSwimmer);
  const hudDate = useSelector(state => state.dashboard.workouts.hudDate);
  const settings = useSelector(state => state.account.settings);

  const [hudOptionProp, setHudOptionProp] = useState({
    name: 'Stroke',
    mode: 'distance'
  });

  const options: Options[] = [
    {
      id: 'stroke',
      name: 'Stroke',
      defaultIcon: 'swimmer.svg',
      activeIcon: 'swimmer-active.svg',
      inactiveIcon: 'swimmer-disabled.svg',
      key: 'stroke_name',
      enableClick: false
    },
    {
      id: 'type',
      name: 'Type',
      defaultIcon: 'workouts.svg',
      activeIcon: 'workouts-active.svg',
      inactiveIcon: 'workouts-disabled.svg',
      key: 'action_name',
      enableClick: false
    },
    {
      id: 'equipment',
      name: 'Equipment',
      defaultIcon: 'equipments.svg',
      activeIcon: 'equipments-active.svg',
      inactiveIcon: 'equipments-disabled.svg',
      key: 'equipment_name',
      enableClick: false
    },
    {
      id: 'intensity',
      name: 'Intensity',
      defaultIcon: 'intensity.svg',
      activeIcon: 'intensity-active.svg',
      inactiveIcon: 'intensity-disabled.svg',
      key: 'intensity_name',
      enableClick: false
    }
  ];

  const validOptions = useMemo(() => {
    const newOptions: Options[] = [];
    let uniqueKeys: string[] = [];
    let filteredData = data?.filter(
      it => it.scheduled_datetime >= hudDate.from && it.scheduled_datetime <= hudDate.to
    );

    if (filteredData && filteredData?.length > 0) {
      uniqueKeys = Object.keys(
        filteredData?.reduce((result, obj) => {
          return Object.assign(result, obj);
        }, {})
      );
    }
    options.forEach(it => {
      if (uniqueKeys.find(k => k === it.key) && !validOptions?.find(no => no.id === it.id)) {
        it.enableClick = true;
      }
      newOptions.push(it);
    });
    return newOptions;
  }, [data, options, hudDate]);

  const hudData: WorkoutData = useMemo(() => {
    let filteredData = data
      ?.filter(it => it.sets_team_id === activeTeam?.id)
      ?.filter(it => it.roster_group.indexOf(activeRoster?.id || '') > -1)
      ?.filter(it => it.swimmer_id === activeSwimmer?.id)
      ?.filter(it => it.scheduled_datetime >= hudDate.from && it.scheduled_datetime <= hudDate.to);
    let newData: HudData[] = [];
    let chartData: ChartData[] = [];
    const generateRange = (
      start: number,
      end: number,
      step: number,
      uniqueDate: number[] = []
    ): number[] => {
      if (start > end) {
        return uniqueDate;
      } else {
        uniqueDate.push(start);
        return generateRange(start + step, end, step, uniqueDate);
      }
    };
    const dates = generateRange(hudDate.from, hudDate.to, 86400000);
    filteredData?.forEach((it, index) => {
      let name =
        hudOptionProp.name === 'Stroke'
          ? it.stroke_name
          : hudOptionProp.name === 'Type'
          ? it.action_name
          : hudOptionProp.name === 'Equipment'
          ? it.equipment_name
          : it.intensity_name;
      if (name) {
        let value = hudOptionProp.mode === 'distance' ? it.set_distance_yard : it.set_time_seconds;
        let presentObj = newData.find(n => n.name === name);
        if (presentObj) {
          presentObj.value += value;
        } else {
          let obj: HudData = {
            id: index + 1,
            name: name,
            value: hudOptionProp.mode === 'distance' ? it.set_distance_yard : it.set_time_seconds
          };
          newData.push(obj);
        }
        let cPresent = chartData.find(n => n.name === name);
        if (cPresent) {
          let seriesData = cPresent.data.find(
            d =>
              moment(+d.x)
                .clone()
                .startOf('day')
                .valueOf() ===
              moment(it.scheduled_datetime)
                .clone()
                .startOf('day')
                .valueOf()
          );
          if (seriesData) {
            seriesData.y += value;
          }
        } else {
          const newSeriesObj = {
            name: name,
            data: dates?.map(d => ({ x: d.toString(), y: 0 }))
          };
          let seriesData = newSeriesObj.data.find(
            d =>
              moment(+d.x)
                .clone()
                .startOf('day')
                .format('DD/MM/YYYY') ===
              moment(it.scheduled_datetime)
                .clone()
                .startOf('day')
                .format('DD/MM/YYYY')
          );
          if (seriesData) {
            seriesData.y = value;
          }
          chartData.push(newSeriesObj);
        }
      }
    });

    return { newData, chartData };
  }, [
    hudOptionProp.name,
    hudOptionProp.mode,
    data,
    activeTeam,
    activeRoster,
    activeSwimmer,
    hudDate
  ]);

  return (
    <>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="space-around">
          <Typography component="span" color="textSecondary" className={classes.dateText}>
            {`${moment(hudDate.from).format(settings.dateFormat)} - ${moment(hudDate.to).format(
              settings.dateFormat
            )}`}
          </Typography>
        </Box>
      </Grid>
      {(!!hudData.newData.length && (
        <>
          <Grid>
            <div className={classes.swimmerCategoryRoot}>
              {validOptions?.map(option => (
                <TooltipComponent key={option.name} title={option.name}>
                  <div
                    data-click-enabled={option.enableClick}
                    onClick={() => {
                      setHudOptionProp(prevState => ({ ...prevState, name: option.name }));
                    }}
                  >
                    <img
                      src={`/static/images/hudImages/${
                        hudOptionProp.name === option.name
                          ? option.activeIcon
                          : option.enableClick
                          ? option.defaultIcon
                          : option.inactiveIcon
                      }`}
                      alt={option.name}
                    />
                  </div>
                </TooltipComponent>
              ))}
            </div>
            <hr />
          </Grid>
          <Grid item xs={12}>
            <ChartView data={hudData.chartData} dateFormat={settings?.dateFormat} />
          </Grid>
        </>
      )) ||
        (!isFetching && (
          <Box className={classes.dashboardInfoText}>
            <Typography component="span" color="textSecondary">
              No Workouts found
            </Typography>
          </Box>
        ))}
    </>
  );
};

export default WorkoutChart;
