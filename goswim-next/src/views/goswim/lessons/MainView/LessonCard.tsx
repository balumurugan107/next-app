import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { LessonServiceDocument } from 'src/store/management/goswim/lessons';
import { useSelector } from 'react-redux';
import { AccountType } from 'src/constants/common';
import { markDownForList } from 'src/utils/functionUtil';
import LockIcon from '@mui/icons-material/Lock';
import { CustomThumbnail } from 'src/constants/common';
import { Tooltip } from '@mui/material';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: `${theme.palette.background.paper} !important`,
      margin: 0,
      padding: '14px',
      boxShadow: '0 4px 6px 0 rgb(34 41 47 / 10%) !important',
      borderRadius: '8px !important',
      minHeight: '100%'
    },
    cardMedia: {
      aspectRatio: '16/9',
      borderRadius: 4,
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
      maxWidth: '100%',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      wordBreak: 'break-word'
    },
    title: {
      maxWidth: '100%',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: '10px 0 0 0',
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 500,
      height: 25,
      textTransform: 'capitalize',
      marginBottom: theme.spacing(0.5)
    },
    cardImg: {
      width: '100%'
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
      backgroundColor: theme.palette.common.white,
      fontSize: '16px',
      textTransform: 'uppercase'
    }
  })
);

const LessonCard = (props: { lesson: LessonServiceDocument }) => {
  const classes = useStyles();
  const userRole = useSelector(state => state.account.user?.role || AccountType.SWIMMER);
  const isSubscribed = useSelector(state => state.account.isSubscribed);
  const onMediaFallback = (event: any) => (event.target.src = CustomThumbnail);

  return (
    <Card className={classes.root}>
      <CardActionArea
        className={classes.noSpace}
        href={`/lessons/${props.lesson._id}`}
      >
        <div className={classes.divRelative}>
          <CardMedia
            className={classes.cardMedia}
            component="img"
            alt={props.lesson.name}
            image={props.lesson.thumbnailUrl ?? CustomThumbnail}
            title={props.lesson.name}
            onError={onMediaFallback}
          />
          {props.lesson.watched && <div className={classes.font}>Watched</div>}
          {(userRole === AccountType.SWIMMER || userRole === AccountType.COACH) &&
            !isSubscribed &&
            !props.lesson.tutorial && (
              <div className={classes.divAbsolute}>
                {<LockIcon className={classes.divAbsolute} fontSize="small" />}
              </div>
            )}
        </div>
        <CardContent className={classes.noSpace}>
          <Tooltip title={props?.lesson?.name}>
          <Typography gutterBottom variant="h3" component="h2" className={classes.title}>
            {props.lesson.name}
          </Typography>
          </Tooltip>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.desc}>
            {markDownForList(props.lesson.description)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LessonCard;
