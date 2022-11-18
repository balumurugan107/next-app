import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { description } from 'src/utils/functionUtil';
import { PreviousWeeklyThemes } from 'src/store/goswim/admin/weeklyThemes';

import {CustomThumbnail} from 'src/constants/common';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: `${theme.palette.background.paper} !important`,
      margin: 0,
      padding: '14px',
      boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%) !important',
      borderRadius: "8px !important",
      minHeight: '230px'
    },
    cardMedia: {
      aspectRatio: '16/9',
      borderRadius: 4
    },
    divRelative: {
      position: 'relative'
    },
    divAbsolute: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: '30px',
      height: '26px',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.default,
      borderRadius: '5px 0 0 0'
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
      textOverflow: 'ellipsis'
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
      marginBottom: theme.spacing(1)
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



const WeeklyThemeCard = (props: { theme: PreviousWeeklyThemes }) => {
  const classes = useStyles();

  const onMediaFallback = (event: any) => (event.target.src = CustomThumbnail);

  return (
    <Card className={classes.root}>
      <CardActionArea
        className={classes.noSpace}
        href={`/lessons/${props.theme._id}`}
      >
        <div className={classes.divRelative}>
          <CardMedia
            className={classes.cardMedia}
            component="img"
            alt={props.theme.name}
            image={props.theme.thumbnailUrl ?? CustomThumbnail}
            title={props.theme.name}
            onError={onMediaFallback}
          />
        </div>
        <CardContent className={classes.noSpace}>
          <Typography gutterBottom variant="h3" component="h2" className={classes.title}>
            {props.theme.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.desc}>
            {description(props.theme.description)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default WeeklyThemeCard;
