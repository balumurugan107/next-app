import React from 'react';
import { Grid, Box, Typography, colors, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import moment from 'moment';
import 'moment-duration-format';
import DistanceIcon from 'src/components/DistanceIcon';
import TimeIcon from 'src/components/TimeIcon';
import StrokeIcon from 'src/components/StrokeIcon';
import TypeIcon from 'src/components/TypeIcon';
import IntensityIcon from 'src/components/IntensityIcon';
import EquipmentIcon from 'src/components/EquipmentIcon';
import SetSummarySub from 'src/views/management/Services/MainView/Set/Summary/SetSummarySub';
import { SetPropsEnumProperty } from 'src/views/management/Services/MainView/Set/SetWriterEditor/types';
import { ComponentProps, SetSummaryProps } from 'src/types';

interface SwimMetricsProps {
  name: SetPropsEnumProperty | string;
  value: number;
  interval: number;
  className?: string;
}

const useStyles = makeStyles(theme => ({
  textDistance: {
    color: '#C6AF43',
    textAlign: 'right',
    fontWeight: 500
  },
  textTime: {
    color: '#ADC743',
    textAlign: 'right',
    fontWeight: 500
  },
  summaryHead: {
    fontWeight: 900
  },
  setSummaryHead: {
    paddingTop: 24,
    paddingBottom: 24
  },
  headerIcons: {
    fontSize: 35,
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 11px 20px -8px rgba(0,0,0,0.50)',
    borderRadius: '50%',
    color: colors.common.white
  },
  free: { color: '#BB739B', fontWeight: 600, textTransform: 'capitalize' },

  type: { color: '#EC7969', fontWeight: 600, textTransform: 'capitalize' },

  intensity: { color: '#3C9CEA', fontWeight: 600, textTransform: 'capitalize' },

  equipment: { color: '#A03CEA', fontWeight: 600, textTransform: 'capitalize' },
  rowBox: {
    display: 'flex',
    flexWrap: 'nowrap',
    '& div,span': {
      fontWeight: 600
    }
  },
  lastChild: {
    flexWrap: 'wrap',
    borderBottom: 'none !important'
  },
  rowType: {
    width: 300,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.only('md')]: { width: 180 }
  }
}));

const SwimMetrics: React.FC<SwimMetricsProps> = ({ name, value, className, interval }) => (
  <Box textAlign="left" py={1.25}>
    <Typography component="div" {...{ className }}>
      {name}
    </Typography>
    <SetSummarySub
      {...{
        value,
        interval
      }}
    />
  </Box>
);

const SetSummary: React.FC<ComponentProps & SetSummaryProps> = ({ summary }) => {
  const classes = useStyles();
  const { distance, time, stroke, type, intensity, equipment } = summary || {};

  return (
    <Grid item xs={12} sm={2} md={5} lg={3} xl={3}>
      {distance && time ? (
        <Box textAlign="center" px={2.25} py={0}>
          <Box pl={6} pr={6}>
            <Typography
              component="div"
              className={clsx(classes.summaryHead, classes.setSummaryHead)}
            >
              SET SUMMARY
            </Typography>
            <Divider />
          </Box>
          <Box className={classes.rowBox} justifyContent="center">
            <Box display="flex">
              <Box display="flex" alignItems="center" mr={2.25}>
                <DistanceIcon className={classes.headerIcons} />
              </Box>
              <Box textAlign="left" py={1.25}>
                <Typography component="span" className={classes.textDistance}>
                  DISTANCE
                </Typography>
                <Typography component="div">{distance}</Typography>
              </Box>
              <Box display="flex" alignItems="center" mr={2.25} ml={3}>
                <TimeIcon className={classes.headerIcons} />
              </Box>
              <Box textAlign="left" py={1.25}>
                <Typography component="span" className={classes.textTime}>
                  TIME
                </Typography>
                <Typography component="div">
                  {moment.duration((time || 0) * 1000).format('mm:ss')}
                </Typography>
              </Box>
            </Box>
          </Box>
          {stroke?.length ? (
            <>
              <Divider />
              <Box className={classes.rowBox} flexWrap="wrap">
                <Box display="flex" alignItems="center" mr={2.25}>
                  <StrokeIcon className={classes.headerIcons} />
                </Box>
                <Box display="flex" justifyContent="space-between" flexWrap="wrap" width={300}>
                  {stroke?.map((datum, key) => (
                    <SwimMetrics
                      {...{ key, datum }}
                      name={datum?.name}
                      value={datum?.value || 0}
                      interval={(datum?.interval && datum?.interval * 1000) || 0}
                      className={classes.free}
                    />
                  ))}
                </Box>
              </Box>
            </>
          ) : null}
          {type?.length ? (
            <>
              <Divider />
              <Box className={classes.rowBox} flexWrap="wrap">
                <Box display="flex" alignItems="center" mr={2.25} component="span">
                  <TypeIcon className={classes.headerIcons} />
                </Box>
                <Box className={classes.rowType}>
                  {type?.map((datum, index) => (
                    <SwimMetrics
                      key={index}
                      name={datum?.name}
                      value={datum?.value || 0}
                      interval={(datum?.interval && datum?.interval * 1000) || 0}
                      className={classes.type}
                    />
                  ))}
                </Box>
              </Box>
            </>
          ) : null}
          {intensity?.length ? (
            <>
              <Divider />
              <Box className={classes.rowBox} flexWrap="wrap">
                <Box display="flex" alignItems="center" mr={2.25}>
                  <IntensityIcon className={classes.headerIcons} />
                </Box>
                <Box className={classes.rowType}>
                  {intensity?.map((datum, index) => (
                    <SwimMetrics
                      key={index}
                      name={datum?.name}
                      value={datum?.value || 0}
                      interval={(datum?.interval && datum?.interval * 1000) || 0}
                      className={classes.intensity}
                    />
                  ))}
                </Box>
              </Box>
            </>
          ) : null}
          {equipment?.length ? (
            <>
              <Divider />
              <Box className={clsx(classes.rowBox, classes.lastChild)}>
                <Box display="flex" alignItems="center" mr={2.25}>
                  <EquipmentIcon className={classes.headerIcons} />
                </Box>
                <Box className={classes.rowType}>
                  {equipment?.map((datum, index) => (
                    <SwimMetrics
                      key={index}
                      name={datum?.name}
                      value={datum?.value || 0}
                      interval={(datum?.interval && datum?.interval * 1000) || 0}
                      className={classes.equipment}
                    />
                  ))}
                </Box>
              </Box>
            </>
          ) : null}
        </Box>
      ) : null}
    </Grid>
  );
};

export default SetSummary;
