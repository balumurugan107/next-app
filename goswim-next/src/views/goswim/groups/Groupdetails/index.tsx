import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Slide, Container, Paper, Box, Grid, alpha, Typography, Button, Chip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import Avatar from 'src/components/Avatar';
import Page from 'src/components/Page';
import LoadingScreen from 'src/components/LoadingScreen';
import CameraIcon from '@mui/icons-material/CameraAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getTeamsList } from 'src/store/management/team';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3),
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      },
      '.MuiTableCell-root': { borderBottom: 'none' }
    }
  },
  container: {
    marginTop: theme.spacing(1.5)
  },
  avatar: {
    height: 125,
    width: 125,
    cursor: 'default',
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 11px 20px -8px rgba(0,0,0,0.50)',
    borderColor: '#cccccc',
    borderWidth: '2px',
    borderStyle: 'solid',
    // padding: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: {
      width: 100,
      height: 100
    },
    background: theme.palette.background.default
  },
  paper: {
    background: alpha(theme.palette.primary.main, 0.05)
  },
  gridTop: {
    display: 'flex'
  },
  description: {
    display: 'block',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    margin: 0,
    padding: theme.spacing(2),
    '& p': {
      fontWeight: 500
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      padding: '8px',
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
      '& p': {
        marginBottom: theme.spacing(1)
      },
      '& div': {
        wordBreak: 'break-all'
      }
    }
  },
  descriptionStyling: {
    marginTop: theme.spacing(2)
  },
  fieldDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    margin: 0,
    padding: theme.spacing(2),
    '& p': {
      fontWeight: 500
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      padding: '8px',
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
      '& p': {
        marginBottom: theme.spacing(1)
      },
      '& div': {
        wordBreak: 'break-all'
      }
    }
  },
  PageTitle: {
    marginLeft: theme.spacing(3),
    fontSize: '1.25rem',
    color: theme.palette.text.primary,
    fontWeight: 500
  },
  avatarText: {
    padding: theme.spacing(2),
    paddingBottom: 0
  },
  roleIcon: {
    marginBottom: -1,
    marginLeft: 9,
    color: theme.palette.secondary.main,
    fontSize: '1.65rem'
  },
  swimmerRoleIcon: {
    marginBottom: -6,
    marginLeft: 9,
    color: theme.palette.secondary.main,
    fontSize: '2rem'
  },
  detailContainer: {
    marginTop: theme.spacing(3)
  },
  chip: {
    margin: '0 4px 4px 4px',
    background: alpha(theme.palette.primary.main, 0.04)
  },
  userDetailWrapper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5)
    }
  },
  profileSec: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    marginTop: theme.spacing(10),
    '& p': {
      textTransform: 'uppercase',
      fontSize: 24,
      fontWeight: 500
    },
    detailContainer: {
      padding: '20px'
    },
    chip: {
      margin: '0 4px 4px 4px',
      background: alpha(theme.palette.primary.main, 0.04)
    },
    '& h5': {
      color: theme.palette.text.secondary,
      fontWeight: 400
    },
    [theme.breakpoints.down('sm')]: {
      margin: 40
    }
  },
  colored: {
    backgroundColor: theme.palette.info.main
  },
  inviteButton: {
    color: theme.palette.common.white,
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  buttonText: { fontWeight: 500 },
  titleWithBtn: {
    display: 'flex',
    justifyContent: 'right',
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(3)
  },
  groupDetailStyling: {
    fontSize: '18px',
    fontWeight: 400
  },
  swimmerInfo: {
    backgroundColor: theme.palette.background.dark,
    minWidth: 55,
    '& .MuiChip-label': {
      fontSize: theme.spacing(2)
    }
  }
}));

const ViewMember = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamsList());
  }, []);
  const history = useHistory();
  const location: any = useLocation().pathname.split('/');
  const group: any = useSelector(state => state.team.teamsList);
  const groupId = location[5];

  const groupDetail = group?.filter(
    (individualGroup: { _id: any }) => individualGroup._id === groupId
  );

  const { isLoading } = useSelector(state => state.members);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Slide direction="right" in mountOnEnter unmountOnExit>
        <Page className={classes.root} title="Group-Detail">
          <Box className={classes.titleWithBtn}>
            <Button
              color="secondary"
              variant="contained"
              className={classes.inviteButton}
              // component={RouterLink}
              onClick={() => history.goBack()}
              startIcon={<ArrowBackIcon />}
            >
              <Typography component="span" className={classes.buttonText}>
                Back
              </Typography>
            </Button>
          </Box>
          <Container className={classes.container}>
            <Paper>
              <Grid className={classes.gridTop} container>
                <Grid item sm={4} xs={12} className={classes.paper}>
                  <Box className={classes.profileSec}>
                    <label htmlFor="contained-button-file">
                      <Avatar
                        type="camview"
                        variant="circle"
                        canEdit={false}
                        className={classes.avatar}
                        srcSet={
                          // memberDetail?.profile_picture_url
                          //   ? memberDetail?.profile_picture_url
                          //   : CameraIcon
                          // team?.brand_logo_url ? team.brand_logo_url : CameraIcon
                          groupDetail[0]?.brand_logo_url
                            ? groupDetail[0].brand_logo_url
                            : CameraIcon
                        }
                      />
                    </label>
                    <Typography className={classes.avatarText}>{groupDetail[0].name}</Typography>
                  </Box>
                </Grid>
                <Grid item sm={8} xs={12} className={classes.detailContainer}>
                  <Grid item>
                    <Box>
                      <Typography variant="h1" className={classes.PageTitle}>
                        Group Details
                      </Typography>
                    </Box>
                  </Grid>
                  <Box p={3} className={classes.userDetailWrapper}>
                    <div className={clsx(classes.fieldDiv, classes.colored)}>
                      <p>Name</p>
                      <div className={classes.groupDetailStyling}>{groupDetail[0].name}</div>
                    </div>

                    <div className={classes.fieldDiv}>
                      <p>Members present</p>
                      <div className={classes.groupDetailStyling}>
                        <Chip
                          color="primary"
                          variant="outlined"
                          label={groupDetail[0].membersCount - 1}
                          className={classes.swimmerInfo}
                        />
                      </div>
                    </div>

                    <div className={clsx(classes.fieldDiv, classes.colored)}>
                      <p>Created by</p>
                      <div className={classes.groupDetailStyling}>{groupDetail[0].createdBy}</div>
                    </div>

                    <div className={classes.description}>
                      <p>Description</p>
                      <div className={classes.descriptionStyling}>{groupDetail[0].description}</div>
                    </div>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Page>
      </Slide>
    </>
  );
};

export default ViewMember;
