import { Slide, Container, Paper, Box, Grid, alpha, Typography, Chip, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import config from 'src/config';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Avatar from 'src/components/Avatar';
import Page from 'src/components/Page';
import { getMember } from 'src/store/management/members';
import { TeamHeirarchyDocument } from 'src/store/management/team';
import Label from 'src/components/Label';
import { SubscriptionStatus, Status, AccountType } from 'src/constants';
import Coach from 'src/components/Coach';
import Swimmer from 'src/components/Swimmer';
import LoadingScreen from 'src/components/LoadingScreen';
import CameraIcon from '@mui/icons-material/CameraAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import clsx from 'clsx';
import { adminSignInUser } from 'src/store/goswim/account';
import ResetPassword from 'src/components/ResetPassword';

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
    cursor: 'pointer',
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 11px 20px -8px rgba(0,0,0,0.50)',
    borderColor: '#cccccc',
    borderWidth: '2px',
    borderStyle: 'solid',
    [theme.breakpoints.down('md')]: {
      width: 100,
      height: 100
    },
    background: theme.palette.background.default
  },
  paper: {
    // minHeight: '550px',
    background: alpha(theme.palette.primary.main, 0.05)
  },
  gridTop: {
    display: 'flex'
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
    fontSize: '1.5rem'
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
    // width: '70%',
    display: 'flex',
    justifyContent: 'right',
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(3)
    // alignItems: 'center'
  },
  userActions: {
    marginTop: theme.spacing(2),
    '& button:nth-last-child(2)': {
      marginRight: theme.spacing(1.5)
    }
  }
}));

const ViewMember = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const location: any = router.asPath.split('/');
  const memberDetail = useSelector(state => state.members.member);
  const { isLoading } = useSelector(state => state.members);
  const heirarchyTeams = useSelector(state => state.team.heirarchyTeams);
  const role = useSelector(state => state.account.user?.role);
  const goswimGroupId = config.goswimGroupAPI.groupId;
  const filteredTeam = heirarchyTeams?.filter(heirarchyTeam => heirarchyTeam._id !== goswimGroupId);
  let filteredGroups: TeamHeirarchyDocument[] = [];
  const userId = location.pop();
  const [loginLoader, setLoginLoader] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (userId) dispatch(getMember(userId));
  }, []);

  const getMemberGroups = () => {
    memberDetail?.team?.map(teamId => {
      filteredTeam?.map(team => {
        if (team._id === teamId) {
          filteredGroups.push(team);
        }
      });
    });
    const groupNames = filteredGroups?.map(({ name }) => (
      <Chip label={name} className={classes.chip} />
    ));
    return groupNames;
  };

  const retrieveLabel = (status?: string) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE.toLowerCase():
        return <Label color="success">{Status.ACTIVE}</Label>;

      case SubscriptionStatus.UNSUBSCRIBED.toLowerCase():
        return <Label color="error">{Status.UNSUBSCRIBED}</Label>;

      case SubscriptionStatus.TRAILING.toLocaleLowerCase():
        return <Label color="success">{Status.TRAILING}</Label>;

      case SubscriptionStatus.NOT_INVITED:
        return <Label color="error">{Status.NOT_INVITED}</Label>;

      default:
        return <Label color="error">{Status.INACTIVE}</Label>;
    }
  };

  if (isLoading || loginLoader) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Slide direction="right" in mountOnEnter unmountOnExit>
        <Page className={classes.root} title="Member-Detail">
          <Box className={classes.titleWithBtn}>
            <Button
              color="secondary"
              variant="contained"
              className={classes.inviteButton}
              onClick={() => router.back()}
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
                          memberDetail?.profile_picture_url
                            ? memberDetail?.profile_picture_url
                            : CameraIcon
                        }
                      />
                    </label>
                    <Typography className={classes.avatarText}>
                      {memberDetail?.full_name}
                      {memberDetail?.role === AccountType.COACH && (
                        <Coach
                          tooltip={AccountType.COACH_OR_SWIMMING_EXPERT}
                          className={classes.roleIcon}
                          fontSize="small"
                          viewBox="0 0 38 42"
                        />
                      )}
                      {memberDetail?.role === AccountType.SWIMMER && (
                        <Swimmer
                          tooltip={AccountType.SWIMMER_OR_PARENT}
                          className={classes.swimmerRoleIcon}
                          fontSize="small"
                          viewBox="0 0 53 41"
                        />
                      )}
                    </Typography>
                    <Typography variant="h5">{memberDetail?.role}</Typography>
                    {role === AccountType.ADMIN && (
                      <Box className={classes.userActions}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<LockOutlinedIcon />}
                          onClick={() =>
                            setOpen(true)
                          }
                        >
                          Reset Password
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<AccountCircleOutlinedIcon />}
                          onClick={() => {
                            setLoginLoader(true);
                            dispatch(
                              adminSignInUser(memberDetail ? memberDetail?._id : '', router)
                            );
                          }}
                        >
                          Sign In
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item sm={8} xs={12} className={classes.detailContainer}>
                  <Grid item>
                    <Box>
                      <Typography variant="h1" className={classes.PageTitle}>
                        Member Details
                      </Typography>
                    </Box>
                  </Grid>
                  <Box p={3} className={classes.userDetailWrapper}>
                    <div className={clsx(classes.fieldDiv, classes.colored)}>
                      <p>Name</p>
                      <div>{memberDetail?.full_name}</div>
                    </div>

                    <div className={classes.fieldDiv}>
                      <p>Role</p>
                      <div>{memberDetail?.role}</div>
                    </div>

                    <div className={clsx(classes.fieldDiv, classes.colored)}>
                      <p>Email</p>
                      <div>{memberDetail?.email}</div>
                    </div>

                    <div className={classes.fieldDiv}>
                      <p>Groups</p>
                      <div>{getMemberGroups()}</div>
                    </div>

                    <div className={clsx(classes.fieldDiv, classes.colored)}>
                      <p>Subscription Status</p>
                      <div>{retrieveLabel(memberDetail?.status)}</div>
                    </div>

                    <div className={classes.fieldDiv}>
                      <p>Phone Number</p>
                      <div>
                        {memberDetail?.phone ? (
                          memberDetail?.phone
                        ) : (
                          <Label color="error">{Status.NOT_AVAILABLE}</Label>
                        )}
                      </div>
                    </div>

                    <div className={clsx(classes.fieldDiv, classes.colored)}>
                      <p>Address</p>
                      <div>
                        {memberDetail?.full_address ? (
                          memberDetail?.full_address
                        ) : (
                          <Label color="error">{Status.NOT_AVAILABLE}</Label>
                        )}
                      </div>
                    </div>

                    <div className={classes.fieldDiv}>
                      <p>City</p>
                      <div>
                        {memberDetail?.city ? (
                          memberDetail?.city
                        ) : (
                          <Label color="error">{Status.NOT_AVAILABLE}</Label>
                        )}
                      </div>
                    </div>

                    <div className={clsx(classes.fieldDiv, classes.colored)}>
                      <p>State</p>
                      <div>
                        {memberDetail?.state ? (
                          memberDetail?.state
                        ) : (
                          <Label color="error">{Status.NOT_AVAILABLE}</Label>
                        )}
                      </div>
                    </div>

                    <div className={classes.fieldDiv}>
                      <p>Country</p>
                      <div>
                        {memberDetail?.country ? (
                          memberDetail?.country
                        ) : (
                          <Label color="error">{Status.NOT_AVAILABLE}</Label>
                        )}
                      </div>
                    </div>
                  </Box>
                </Grid>
              </Grid>
              <ResetPassword open={open} handleClose={handleClose} userId={memberDetail?._id}/>
            </Paper>
          </Container>
        </Page>
      </Slide>
    </>
  );
};

export default ViewMember;
