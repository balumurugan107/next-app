import React from 'react';
import { alpha } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CourseServiceDocument } from 'src/store/management/courses/types';
import { useRouter } from 'next/router';
import { markDownForList } from 'src/utils/functionUtil';
import { useSelector } from 'react-redux';
import { AccountType } from 'src/constants/common';
import LockIcon from '@mui/icons-material/Lock';

// import moment from 'moment';
import { CustomThumbnail } from 'src/constants/common';
import { Tooltip } from '@mui/material';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      margin: 0,
      // padding: '16px',
      // boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)'
      boxShadow: '0 4px 6px 0 #3f3f4426',
      '&:hover .MuiCardMedia-root': {
        // filter: 'blur(2px)',
        transform: 'scale(0.94)'
        // opacity: 0.5
      },
      '&:hover $font': {
        zIndex: 0
      }
    },

    cardMedia: {
      aspectRatio: '16/9',
      maxHeight: '170px',
      backgroundImage:`url(${CustomThumbnail})` 
    },

    divRelative: {
      position: 'relative'
    },

    divAbsolute: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: '30px !important',
      height: '30px !important',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.default,
      borderRadius: '5px 0 0 0',
      padding: '4px'
    },

    noSpace: {
      margin: 0,
      padding: 0
    },
    desc: {
      fontSize: '14px',
      // lineHeight: '1.2',
      minHeight: '3em',
      maxWidth: '100%',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: ' 0 14px',
      margin: '10px 0',
      wordBreak: 'break-word'
    },
    subHead: {
      padding: ' 0 14px'
    },
    title: {
      maxWidth: '100%',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: ' 0 14px',
      margin: '10px 0',
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 500,
      height: 25
    },
    chip: {
      maxHeight: '20px',
      background: alpha(theme.palette.primary.main, 0.08)
    },
    font: {
      position: 'absolute',
      top: '10%',
      left: '5%',
      padding: '5px 10px',
      borderRadius: '5px',
      background: '#0000006a !important',
      color: '#ffffff',
      textAlign: 'center',
      fontSize: '16px',
      textTransform: 'uppercase',
      zIndex: -1
    },
    lessonCount: {
      fontWeight: 800
    }
  })
);

// const dateFormat = (date: any) => {
//   if (date) {
//     //2017-08-24T23:15:03Z
//     var readableTime = moment(`${date}`, `YYYY-MM-DD'T'HH:mm:ss'Z'`).format("YYYY-MMM-DD HH:mm");
//     return readableTime
//   }
//   else return ""
// }

const CourseCard = (props: { course: CourseServiceDocument }) => {
  const classes = useStyles();
  const onMediaFallback = (event: any) => (event.target.src = CustomThumbnail); //change
  const userRole = useSelector(state => state.account.user?.role || AccountType.SWIMMER);
  const isSubscribed = useSelector(state => state.account.isSubscribed);
  return (
    <CardActionArea
      className={classes.noSpace}
      // component={RouterLink}
      href={`/courses/${props?.course?._id}`}
    >
      <Card className={classes.root}>
        <div className={classes.divRelative}>
          <CardMedia
            className={classes.cardMedia}
            component="img"
            alt={props.course.name}
            image={props.course.thumbnailUrl ?? CustomThumbnail}
            title={props.course.name}
            onError={onMediaFallback}
          />
          <div className={classes.font}>
            <span className={classes.lessonCount}>{props.course.lessons_count}</span> LESSONS
          </div>
          {(userRole === AccountType.SWIMMER || userRole === AccountType.COACH) &&
            !isSubscribed && (
              <div className={classes.divAbsolute}>
                {<LockIcon className={classes.divAbsolute} fontSize="small" />}
              </div>
            )}
        </div>
        <CardContent className={classes.noSpace}>
          <Tooltip title={props?.course?.name}>
            <Typography gutterBottom variant="h3" component="h2" className={classes.title}>
              {props.course.name}
            </Typography>
          </Tooltip>
          <Typography variant="body1" color="textSecondary" component="p" className={classes.desc}>
            {markDownForList(props.course.description)}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default CourseCard;
