import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Slide,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from 'src/components/Page';
import { setSelectedTeams } from 'src/store/management/team';

//import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
//import Header from 'src/views/management/Teams/MainView/Header';
//import Results from 'src/views/management/Teams/MainView/Results';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100%',
    paddingBottom: 100
  },
  title: {
    color: '#546E7A',
    fontSize: '24px',
    paddingLeft: '-3px'
  },
  cardtitle: {
    color: '#546E7A',
    fontSize: '24px',
    marginLeft: '30px'
  },
  cardsubtitle: {
    fontSize: '14px',
    paddingLeft: '47px',
    marginTop: '-12px',
    color: '#546E7A'
  },
  secondtitle: {
    paddingTop: '20px',
    fontSize: '14px'
  },
  cardthumbnail: {
    marginTop: '15px',
    marginLeft: '50px',
    width: '600px'
  },
  smallcardthumbnail: {
    height: 100,
    width: 150
  },
  schedulebutton: {
    backgroundColor: '#E57A17',
    color: 'white',
    marginTop: '20px',
    marginRight: '50px'
  },
  cardtitletwo: {
    paddingLeft: '47px',
    color: '#546E7A',
    marginTop: '10px'
  },
  cardsubtitletwo: {
    fontSize: '14px',
    paddingLeft: '47px',
    color: '#546E7A',
    marginTop: '10px'
  },
  paragraph: {
    paddingLeft: '47px',
    marginTop: '10px'
  },
  morevideos: {
    marginTop: '27px',
    marginRight: '15px',
    color: '#E57A17'
  },
  comment: {
    paddingLeft: '47px',
    marginTop: '10px',
    color: '#546E7A'
  }
}));

const Singleteam: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(setSelectedTeams([]));
  });

  return (
    <Slide direction="right" in mountOnEnter unmountOnExit>
      <Page className={classes.root} title="Teams">
        <Container>
          {/* <Header /> */}
          <Typography className={classes.title}>GO SWIM</Typography>
          <Box mt={3}>
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <Card>
                <Grid container spacing={0}>
                  <Grid item xs={8}>
                    <CardHeader
                      title={
                        <Typography className={classes.cardtitle}>
                          YOUR FREE LESSON FOR TODAY
                        </Typography>
                      }
                      action={
                        <Button variant="contained" className={classes.schedulebutton}>
                          schedule
                        </Button>
                      }
                    />
                    {/* <Typography variant="h3" className={classes.cardsubtitle}>MONDAY, JANUARY 10</Typography> */}
                    <Typography variant="h3" className={classes.cardsubtitle}>
                      {moment().format('LLLL')}
                    </Typography>
                    {/* <img src={"public/static/images/Breaststroke.jpg"}></img> */}

                    <CardMedia
                      component="img"
                      height="430"
                      width="200px"
                      image="/static/images/Breaststroke.jpg"
                      alt="green iguana"
                      className={classes.cardthumbnail}
                    />
                    <Typography variant="h3" className={classes.cardtitletwo}>
                      LOREM IPSUM
                    </Typography>
                    <Typography variant="h3" className={classes.cardsubtitletwo}>
                      {moment().format('LLLL')}
                    </Typography>
                    <p className={classes.paragraph}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ultricies mi quis hendrerit dolor
                      magna eget est lorem ipsum. Adipiscing elit ut aliquam purus sit amet luctus.
                      Sem fringilla ut morbi tincidunt. Aliquet risus feugiat in ante metus dictum
                    </p>
                    <Typography variant="h3" className={classes.cardtitletwo}>
                      4 Comments
                    </Typography>
                    <Container>
                      <Typography className={classes.comment}>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua
                        </p>
                      </Typography>
                      {/* <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Lizard
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                                    species, ranging across all continents except Antarctica
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small">Learn More</Button>
                                            </CardActions> */}
                    </Container>
                  </Grid>
                  <Grid item xs={4}>
                    <CardHeader
                      title={
                        <Typography variant="h3" className={classes.secondtitle}>
                          RELATED VIDEOS
                        </Typography>
                      }
                      action={<Button className={classes.morevideos} size='small'>MORE VIDEOS</Button>}
                    />
                    <Grid container spacing={4}>
                      <Grid item xs={6} md={8}>
                        <CardMedia
                          component="img"
                          height="430"
                          width="200px"
                          image="/static/images/Breaststroke.jpg"
                          alt="green iguana"
                          className={classes.smallcardthumbnail}
                        />
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Typography>LOREM IPSUM</Typography>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <CardMedia
                          component="img"
                          height="430"
                          width="200px"
                          image="/static/images/Breaststroke.jpg"
                          alt="green iguana"
                          className={classes.smallcardthumbnail}
                        />
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Typography>LOREM IPSUM</Typography>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <CardMedia
                          component="img"
                          height="430"
                          width="200px"
                          image="/static/images/Breaststroke.jpg"
                          alt="green iguana"
                          className={classes.smallcardthumbnail}
                        />
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Typography>LOREM IPSUM</Typography>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <CardMedia
                          component="img"
                          height="430"
                          width="200px"
                          image="/static/images/Breaststroke.jpg"
                          alt="green iguana"
                          className={classes.smallcardthumbnail}
                        />
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Typography>LOREM IPSUM</Typography>
                      </Grid>

                      {/* <Grid item xs={6} md={8}>
                                                <CardMedia
                                                    component="img"
                                                    height="430"
                                                    width="200px"
                                                    image="/static/images/Breaststroke.jpg"
                                                    alt="green iguana"

                                                    className={classes.smallcardthumbnail}
                                                />
                                            </Grid > */}
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Box>
        </Container>
      </Page>
    </Slide>
  );
};

export default Singleteam;
