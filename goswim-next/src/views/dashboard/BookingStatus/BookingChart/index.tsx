import React, { memo, useMemo } from 'react';
import { Box, LinearProgress, Typography, Card, CardContent } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import moment from 'moment';

interface ChartData {
  name: string;
  data: Array<number[]>;
}

const useStyles = makeStyles(theme => ({
  title2: {
    fontSize: theme.spacing(1.5),
    fontWeight: 500
  },
  paper: {
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 2px 2px -2px rgba(0,0,0,0.50)'
  },
  chartRoot: {
    '& .apexcharts-tooltip': {
      color: theme.palette.text.secondary
    }
  },
  linearprogress: {
    marginTop: 16
  }
}));

const BookingChart = () => {
  const classes = useStyles();

  const isFetching = useSelector(state => state?.dashboard?.bookingHistory?.isFetching);

  const data = useSelector(state => state?.dashboard?.bookingHistory?.data) || [];

  const chartData: any = useMemo(() => {
    const formattedData: ChartData[] = [];
    let uniqueDates: string[] = [];
    data?.forEach(it => {
      uniqueDates = uniqueDates.concat(it.history?.map(h => h.booking_date));
    });
    uniqueDates = uniqueDates?.filter((it, index) => uniqueDates.indexOf(it) === index);
    data?.forEach(it => {
      let obj: ChartData = {
        name: it.service_name,
        data: []
      };
      uniqueDates.forEach(d => {
        const historyObj = it.history.find(his => his.booking_date === d);
        const arr = [moment(d).valueOf(), 0];
        if (historyObj) {
          arr[1] += historyObj.booked_count;
        }
        obj.data.push(arr);
      });
      formattedData.push(obj);
    });
    return formattedData;
  }, [data]);

  const renderChart = () => {
    const chartOptions = {
      chart: {
        height: 200,
        type: 'line',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      markers: {
        size: 5,
        strokeWidth: 1
      },
      xaxis: {
        type: 'datetime',
        labels: {
          show: false
        },
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        show: false
      },
      legend: {
        show: false
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: false,
        x: {
          formatter: (value: number) => moment(value).format('DD/MM/YYYY')
        },
        y: {
          formatter: (value: number) => Math.round(value)
        }
      }
    };
    return <Chart options={chartOptions} series={chartData} type="line" height={200} />;
  };

  return (
    <Card className={classes.paper}>
      <CardContent>
        <Box>
          <Box>
            <Typography component="span" color="textSecondary" className={classes.title2}>
              BOOKED
            </Typography>
          </Box>
          {isFetching ? (
            <LinearProgress className={classes.linearprogress} />
          ) : data?.length > 0 ? (
            <Box className={classes.chartRoot}>{renderChart()}</Box>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography>No Services booked</Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default memo(BookingChart);
