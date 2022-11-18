import React, { memo, useState, useMemo } from 'react';
import { Box, TableRow, TableCell, Typography, Divider, TablePagination } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import moment from 'moment';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { LiveLessons, VideoReview } from 'src/store/dashboard';
import TableComponentFactory from 'src/components/Table';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      },
      '.MuiTableCell-root': { borderBottom: 'none' }
    }
  },

  tableCell: {
    minWidth: 200,
    wordBreak: 'break-all'
  },
  downArrow: {
    fontSize: theme.spacing(2.75)
  }
}));

interface ReviewProps {
  data: VideoReview[] | LiveLessons[] | null;
  status: string;
}

interface Header {
  name: string;
  showSortIcon: boolean;
}

interface Pagination {
  page: number;
  limit: number;
}

interface TableData {
  service: string;
  startDate: number;
  totalSlots: number;
  availableSlots: number;
  cost: number;
  serviceId: string;
}

const ReviewResult = ({ data, status }: ReviewProps) => {
  const classes = useStyles();
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    limit: 10
  });
  const settings = useSelector(state => state.account.settings);
  const headers: Header[] = useMemo(() => {
    return status === 'videoReview'
      ? [
        { name: 'Video Reviews', showSortIcon: false },
        { name: 'Date', showSortIcon: false },
        { name: 'Booked', showSortIcon: false },
        { name: `Revenue(${settings.currency})`, showSortIcon: false }
      ]
      : [
        { name: 'Live Lessons', showSortIcon: false },
        { name: 'Date', showSortIcon: false },
        { name: 'Booked', showSortIcon: false },
        { name: `Revenue(${settings.currency})`, showSortIcon: false }
      ];
  }, [status, settings]);

  const paginatedList = useMemo(() => {
    let newList;
    if (status === 'videoReview') {
      const pageList = data?.slice(
        pagination.page * pagination.limit,
        pagination.page * pagination.limit + pagination.limit
      ) as VideoReview[];
      newList = pageList?.map((it: VideoReview) => ({
        serviceId: it.serviceId,
        service: it.service,
        startDate: it.startDate,
        totalSlots: it.slots,
        availableSlots: it.availableSlots,
        cost: it.cost
      }));
    } else {
      const pageList = data?.slice(
        pagination.page * pagination.limit,
        pagination.page * pagination.limit + pagination.limit
      ) as LiveLessons[];
      newList = pageList?.map((it: LiveLessons) => ({
        serviceId: it.serviceId,
        service: it.name,
        startDate: it.lessonDate,
        totalSlots: it.slots.length,
        availableSlots: it.slots.length
          ? it.slots?.filter(slot => !slot.booked).length
          : it.slots.length,
        cost: it.cost
      }));
    }
    return newList;
  }, [pagination.limit, pagination.page, data, status]);

  const TableComponent = TableComponentFactory<Header, TableData>();

  const Rows = ({ videoReview }: { videoReview: TableData }) => {
    return (
      <TableRow hover>
        <TableCell className={classes.tableCell}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              {videoReview.service}
            </Typography>
          </Box>
        </TableCell>
        <TableCell className={classes.tableCell}>
          <Box>{moment(new Date(videoReview.startDate)).format(settings.dateFormat)}</Box>
        </TableCell>
        <TableCell className={classes.tableCell}>
          <Box>
            <Typography variant="body1" color="textPrimary">
              {isNaN(videoReview.totalSlots - videoReview.availableSlots)
                ? ''
                : videoReview.totalSlots - videoReview.availableSlots}
            </Typography>
          </Box>
        </TableCell>
        <TableCell className={classes.tableCell}>
          <Box>
            <Typography variant="body1" color="textPrimary">
              {Math.round(videoReview.cost)}
            </Typography>
          </Box>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Box className={classes.root}>
      <Box height={340} overflow="auto">
        <TableComponent
          renderHead={headers => {
            return (
              <TableRow>
                {headers?.map((it: Header) =>
                  it.showSortIcon ? (
                    <TableCell className={classes.tableCell} key={`header${it.name}`}>
                      <Box component="span" display="flex">
                        <ArrowDownwardIcon className={classes.downArrow} />
                        {it.name}
                      </Box>
                    </TableCell>
                  ) : (
                    <TableCell key={`header${it.name}`} className={classes.tableCell}>
                      {it.name}
                    </TableCell>
                  )
                )}
              </TableRow>
            );
          }}
          renderBody={body => {
            return body?.map((it, index) => (
              <Rows key={`row${it.serviceId}${index}`} videoReview={it} />
            ));
          }}
          headers={headers}
          body={paginatedList || []}
          stickyHeader={true}
        />
      </Box>
      <Divider />
      <Box>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data?.length || 0}
          rowsPerPage={pagination.limit}
          page={pagination.page}
          onPageChange={(_: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
            setPagination(prevState => ({ ...prevState, page: page }));
          }}
          onRowsPerPageChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setPagination(prevState => ({ ...prevState, limit: +Number(event.target.value) }));
          }}
        />
      </Box>
    </Box>
  );
};

export default memo(ReviewResult);
