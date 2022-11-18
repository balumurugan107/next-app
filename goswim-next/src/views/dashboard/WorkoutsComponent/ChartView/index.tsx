import React, { useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Menu as MenuIcon } from 'react-feather';
import Chart, { Props as ReactApexChartsProps } from 'react-apexcharts';
import moment from 'moment';
import { ChartData } from 'src/views/dashboard/WorkoutsComponent';
import { DateFormat } from 'src/constants';

interface ChartProps {
  data: ChartData[];
  dateFormat?: DateFormat;
}
const useStyles = makeStyles(theme => ({
  workoutChartRoot: {
    '& .apexcharts-legend-series .apexcharts-legend-text': {
      color: theme.palette.mode === 'dark' ? '#e6e5e8 !important' : '#999999 !important'
    },
    marginTop: '3rem',
    '& .apexcharts-zoom-icon': {
      display: 'none'
    },
    '& .apexcharts-reset-icon': { transform: 'unset', marginRight: '15px' },
    '& .apexcharts-tooltip': {
      color: theme.palette.text.secondary
    },
    '& .apexcharts-menu-item.exportSVG': {
      display: 'none'
    },
    '& .apexcharts-toolbar': {
      top: '10px !important'
    },
    '& .apexcharts-xcrosshairs.apexcharts-active': {
      opacity: 0
    },
    '& .apexcharts-legend.apexcharts-align-center.position-bottom': {
      position: 'fixed !important'
    },
    '& svg .apexcharts-inner.apexcharts-graphical': {
      transform: 'translate(35px, 8px)'
    },
    '& svg .apexcharts-yaxis': {
      transform: 'translate(10px, -18px)'
    },
    '& svg .apexcharts-legend.apexcharts-align-center.position-bottom': {
      inset: 'auto 0px 31px !important'
    },
    ...(theme.palette.mode === 'dark' && {
      '& .apexcharts-menu': {
        background: '#333',
        border: '1px solid #666'
      },
      '& .apexcharts-theme-light .apexcharts-menu-item:hover': {
        background: '#666'
      },
      '& .apexcharts-theme-light .apexcharts-menu-icon:hover svg': {
        fill: '#fff'
      },
      '& .apexcharts-theme-light .apexcharts-menu-icon svg': {
        fill: '#ccc'
      }
    })
  }
}));

const ChartView: React.FC<ChartProps> = ({ data, dateFormat }) => {
  const classes = useStyles();
  const theme = useTheme();

  /** Adding a ref because area chart does not give correct timestamp in formatter */
  const currentTimeValueRef = useRef<string>('');

  const axisLabels = {
    labels: { style: { colors: theme.palette.mode === 'light' ? '#000000' : '#ffffff' } }
  };

  const charts = {
    options: {
      chart: {
        toolbar: {
          show: true,
          tools: {
            download: MenuIcon,
            selection: false,
            zoom: true,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: '<img src="/static/images/refresh.svg" width="14">'
          },
          export: {
            csv: {
              filename: 'DistanceForStroke',
              columnDelimiter: ',',
              headerCategory: 'Date',
              headerValue: 'value',
              dateFormatter(timestamp: number) {
                return moment(timestamp).format(dateFormat);
              }
            },
            png: {
              filename: 'DistanceForStroke'
            }
          }
        },
        zoom: {
          enabled: true,
          type: 'x',
          autoScaleYaxis: false,
          zoomedArea: {
            fill: {
              color: '#90CAF9',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
              opacity: 0.4,
              width: 1
            }
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        formatter: (value: string) => value.toUpperCase()
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      markers: {
        size: 5,
        strokeWidth: 3
      },
      xaxis: {
        type: 'category',
        categories: [],
        labels: {
          ...axisLabels.labels,
          formatter: (value: string) => {
            /* updating currentTimestamp */
            currentTimeValueRef.current = value;
            return moment(+value)
              .clone()
              .format('DD MMM');
          },
          showDuplicates: true
        },
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        ...axisLabels
      },
      grid: {
        show: false,
        padding: {
          bottom: 25
        }
      },
      tooltip: {
        theme: theme.palette.mode,
        x: {
          formatter: () =>
            moment(+currentTimeValueRef.current)
              .clone()
              .format('DD/MM/YYYY')
        }
      }
    }
  };

  return (
    <>
      <Box className={classes.workoutChartRoot}>
        {(['bar', 'area'] as ReactApexChartsProps['type'][])?.map(type => (
          <Chart key={type} options={charts.options} series={data} height={350} {...{ type }} />
        ))}
      </Box>
    </>
  );
};

export default ChartView;
