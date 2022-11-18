import React from 'react'
import { Card, CardActionArea, CardContent, Typography,  } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
    root: {
      width:50,
      padding:0,
      margin:0
    },
    textTop: {
        padding:0,
        margin:0
      },
      textCenter: {
        padding:0,
        margin:0
      },
      textBottom: {
        padding:0,
        margin:0
      },
  
  })
const DateItem = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography className={classes.textTop} gutterBottom variant="h6" component="h2">
              Jan
            </Typography>
            <Typography className={classes.textCenter} gutterBottom variant="h4" component="h1">
              12
            </Typography>
            <Typography className={classes.textBottom} gutterBottom variant="h6" component="h2">
              Mon
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
}

export default DateItem