import React, { useState, useRef, useMemo, useEffect } from 'react';
import { ComponentProps } from 'src/types';
import { useSelector, useDispatch } from 'react-redux';
import { CSVLink } from 'react-csv';
import { useRouter } from 'next/router';
import _ from 'lodash';
import {
  Button,
  SvgIcon,
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  MenuItem,
  IconButton,
  Typography,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Dialog from 'src/components/Dialog';
import {
  Search as SearchIcon,
  X as ClearIcon,
  UserPlus as UserPlusIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Send as SendIcon
} from 'react-feather';
import RedeemIcon from '@mui/icons-material/Redeem';
import { setMembersDropDownSelectedTeams, setQuery } from 'src/store/management/members';
import { inviteMember, importMember } from 'src/store/management/members';
import { UserProfile } from 'src/store/account';
import { GetMemberProps } from 'src/views/management/Members/MainViewV1/types';
import DropDownSpinning from 'src/components/DropDownSpinning';
import TooltipComponent from 'src/components/Tooltip';
import { AccountType } from 'src/constants';
import { sortTeam } from 'src/utils/sortTeam';
import RenewSubscription from '../../Teams/MainView/RenewSubscription';
import config from 'src/config';

const useStyles = makeStyles(theme => ({
  queryField: {
    width: 250,
    '@media only screen  and (min-device-width: 375px)  and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape)': {
      width: 220
    },
    [theme.breakpoints.down('sm')]: { width: 363 }
  },
  clearIcon: {
    marginRight: '-1.25rem'
  },
  titleh1: {
    fontSize: '18px',
    color: theme.palette.primary.main
  },
  importExportContain: {
    float: 'right',
    [theme.breakpoints.down('sm')]: {
      marginTop: 10
    },
    '& .MuiBox-root-121': {
      marginTop: 0
    }
  },
  action: {
    '& + &': {
      marginLeft: theme.spacing(1)
    },
    marginRight: 5
  },
  actionButtonIcon: {
    marginLeft: 10
  },
  exportClass: {
    marginRight: 5,
    textDecorationLine: 'none'
  },
  addButton: {
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  userIcon: {
    marginLeft: 5
  },
  teams: {
    width: 250,
    // marginTop: 24,
    '@media only screen  and (min-device-width: 375px)  and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape)': {
      width: 220
    },
    [theme.breakpoints.down('sm')]: { width: 250, marginTop: 14 }, //old: width - 363
    [theme.breakpoints.between(360, 420)]: { width: '100%' }
  },
  inviteButton: {
    '& + &': {
      marginLeft: theme.spacing(1)
    },
    [theme.breakpoints.down('sm')]: {
      // width: 100,
      marginTop: 8
    }
  },
  actionIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.common.white,
    [theme.breakpoints.between(360, 420)]: { marginRight: 4 }
  },
  searchContain: {
    [theme.breakpoints.down('sm')]: { flexWrap: 'wrap' }
  },
  iconFont: {
    fontWeight: 500,
    color: theme.palette.common.white,
    [theme.breakpoints.between(360, 420)]: { fontSize: 12 }
  },
  svgIconScale: {
    height: '30px',
    width: '30px'
  },
  searchWrapper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));

interface InvitationAndTrialButtonComponentProps {
  classes: Record<any, string>;
  dispatchGetMembers: (args: GetMemberProps) => Promise<void>;
  user: UserProfile | null;
  teamValue: string;
}

interface ImportButtonComponentProps {
  classes: Record<any, string>;
  teamValue: string;
  dispatchGetMembers: (args: GetMemberProps) => Promise<void>;
  disableAddImportButton: boolean;
}

interface SearchBarFieldComponentProps {
  classes: Record<any, string>;
  dispatchGetMembers: (args: GetMemberProps) => Promise<void>;
}

interface FilterHeaderComponentProps {
  dispatchGetMembers: (args: GetMemberProps) => Promise<void>;
}

const InvitationAndTrialButtonComponent: React.FC<ComponentProps &
  InvitationAndTrialButtonComponentProps> = ({ className, ...rest }) => {
    const { classes, dispatchGetMembers, user, teamValue } = rest;
    const dispatch = useDispatch();
    const isSendInvitationLoading = useSelector(state => state.members.isSendInvitationLoading);
    const currentSelectedTeams = useSelector(state => state.members.currentSelectedTeams, _.isEqual);
    const page = useSelector(state => state.members.page);
    const limit = useSelector(state => state.members.limit);
    const members = useSelector(state => state.members.data, _.isEqual);
    const selectedMembers = useSelector(state => state.members.selectedMembers, _.isEqual);
    const [dialogOpen, setDialogOpen] = useState(false);

    const inviteMembers = async () => {
      try {
        // const inviteMembers = members.filter(datum => selectedMembers.includes(datum._id));
        const userName = user?.full_name;
        if (userName && typeof userName === 'string') {
          await dispatch(inviteMember(selectedMembers, teamValue, userName));
          await dispatchGetMembers({ page: page + 1, teams: currentSelectedTeams, limit });
        }
      } catch (ex) {
        console.error(ex);
      }
    };
    const handleCloseDialog = () => {
      setDialogOpen(false);
    };

    const handleOpenDialog = () => {
      setDialogOpen(true);
    };

    return (
      <Box mt={0.25}>
        <Button
          color="secondary"
          variant="contained"
          disabled={!(selectedMembers.length > 0) || isSendInvitationLoading}
          className={classes.inviteButton}
          onClick={handleOpenDialog}
        >
          <SvgIcon fontSize="small" className={classes.actionIcon}>
            <SendIcon />
          </SvgIcon>
          <Typography component="span" className={classes.iconFont}>
            Send Invitation
          </Typography>
          {isSendInvitationLoading ? (
            <CircularProgress size={20} className={classes.actionButtonIcon} />
          ) : (
            ''
          )}
        </Button>
        <Dialog
          handleCloseDialog={handleCloseDialog}
          isDialogOpen={dialogOpen}
          tilte={<div className={classes.titleh1}>Send Invitation</div>}
          content={<>Are you sure to send e-mail invitation to selected members?</>}
          handleYes={() => {
            inviteMembers();
            handleCloseDialog();
          }}
          handleNo={handleCloseDialog}
        />
        {false && (
          <Button
            color="secondary"
            variant="contained"
            disabled={
              !(
                selectedMembers?.length > 0 &&
                selectedMembers.filter(
                  smember =>
                    members.find(member => member._id === smember)?.status.toString() === 'active'
                ).length === 0
              )
            }
            className={classes.inviteButton}
            href="/members/checkout"
          >
            <SvgIcon fontSize="small" className={classes.actionIcon}>
              <RedeemIcon />
            </SvgIcon>
            <Typography component="span" className={classes.iconFont}>
              Send Trial
            </Typography>
          </Button>
        )}
      </Box>
    );
  };

const ImportButtonComponent: React.FC<ComponentProps & ImportButtonComponentProps> = ({
  className,
  ...rest
}) => {
  const teamData = useSelector(state => state.team.heirarchyTeams, _.isEqual) || [];
  const filteredTeamData =
    teamData && teamData.filter(team => team._id !== config.goswimGroupAPI.groupId);
  const { classes, teamValue, dispatchGetMembers, disableAddImportButton } = rest;
  const dispatch = useDispatch();
  const isImportLoading = useSelector(state => state.members.isImportLoading);
  const page = useSelector(state => state.members.page);
  const limit = useSelector(state => state.members.limit);
  const [warningDialogOpen, setWarningDialogOpen] = useState(false);
  const handleCloseWarningDialog = () => {
    setWarningDialogOpen(false);
  };
  const handleOpenWarningDialog = () => {
    setWarningDialogOpen(true);
  };
  const fileInput = useRef<HTMLInputElement>(null);
  const importfileHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event?.target?.files) {
        await dispatch(importMember(event.target.files[0], teamValue));
        if (fileInput && fileInput.current) {
          fileInput.current.value = '';
        }
      }
      await dispatchGetMembers({ teams: [teamValue], page: page + 1, limit });
    } catch (error:any) {
      console.info(error);
    }
  };
  return (
    <>
      <Dialog
        handleCloseDialog={handleCloseWarningDialog}
        isDialogOpen={warningDialogOpen}
        tilte={<div className={classes.titleh1}>Import</div>}
        content={<>Please select a Team to Import the members</>}
        handleYes={handleCloseWarningDialog}
        yesContent={<>Ok</>}
      />
      <TooltipComponent title="Import">
        <IconButton
          component="label"
          className={classes.action}
          disabled={isImportLoading || disableAddImportButton}
          color="secondary"
          onClick={
            teamValue === 'ALL' && filteredTeamData && filteredTeamData.length > 1
              ? handleOpenWarningDialog
              : handleCloseWarningDialog
          }
          size="large"
        >
          {!warningDialogOpen && (
            <input
              accept=".csv,.pdf"
              style={{ display: 'none' }}
              id="icon-button-file"
              type="file"
              onChange={importfileHandler}
              ref={fileInput}
            />
          )}
          <DownloadIcon />
          {isImportLoading ? (
            <CircularProgress size={20} className={classes.actionButtonIcon} />
          ) : (
            ''
          )}
        </IconButton>
      </TooltipComponent>
    </>
  );
};

const SearchBarFieldComponent: React.FC<ComponentProps & SearchBarFieldComponentProps> = ({
  className,
  ...rest
}) => {
  const { classes } = rest;
  const dispatch = useDispatch();
  const [memberSearchQuery, setMemberSearchQuery] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(setQuery(memberSearchQuery));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [memberSearchQuery]);

  const handleCloseQueryChange = () => {
    setMemberSearchQuery('');
    dispatch(setQuery(''));
  };

  return (
    <TextField
      className={classes.queryField}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SvgIcon fontSize="small" color="action">
              <SearchIcon />
            </SvgIcon>
          </InputAdornment>
        ),
        endAdornment: memberSearchQuery && memberSearchQuery !== '' && (
          <InputAdornment position="start">
            <IconButton
              onClick={handleCloseQueryChange}
              aria-label="clear"
              className={classes.clearIcon}
              size="large"
            >
              <ClearIcon width="18" height="18" />
            </IconButton>
          </InputAdornment>
        )
      }}
      onChange={event => setMemberSearchQuery(event.target.value)}
      onKeyPress={(ev: any) => {
        if (ev.key === 'Enter') {
          ev.target.blur();
        }
      }}
      placeholder="Search Members"
      value={memberSearchQuery}
      variant="outlined"
      size="small"
    />
  );
};

const FilterHeader: React.FC<ComponentProps & FilterHeaderComponentProps> = ({
  className,
  ...rest
}) => {
  const teamData = useSelector(state => state.team.heirarchyTeams, _.isEqual) || [];
  const memberIsLoading = useSelector(state => state.members.isLoading);
  const teamIsLoading = useSelector(state => state.team.isLoading);
  const user = useSelector(state => state.account.user, _.isEqual);
  const teamValue = useSelector(state => state.members.currentSelectedTeam, _.isEqual);
  const { dispatchGetMembers } = rest;
  const classes = useStyles();
  const dispatch = useDispatch();
  const teams = useMemo(() => teamData && sortTeam(teamData), [teamData]);
  const filteredTeamData =
    teamData && teamData.filter(team => team._id !== config.goswimGroupAPI.groupId);
  const [isSubsExpired, setIsSubsExpired] = useState(false);
  const expiresDate = useSelector(state => state.subscription.data?.renews_on);
  const todayDate = Date.now();
  const userRole = useSelector(state => state.account.user?.role);
  const router = useRouter();
  let filterCreatedByuserTeams = [];
  const members = useSelector(state => state.members.data, _.isEqual);
  const exportMembers = members?.map(datum => ({
    ...datum,
    full_address:
      datum.full_address ||
      (datum.address_line1 &&
        datum.address_line2 &&
        `${datum.address_line1},${datum.address_line2}`) ||
      (datum.address_line1 && `${datum.address_line1}`) ||
      (datum.address_line2 && `${datum.address_line2}`) ||
      ''
  }));
  const isDisabled = members.length === 0;
  const csvHeaders = [
    { label: 'E-Mail', key: 'email' },
    { label: 'Team', key: 'team' },
    { label: 'Roster Group', key: 'roster_group' },
    { label: 'Account Name', key: 'account_name' },
    { label: 'Member Name', key: 'full_name' },
    { label: 'Phone #', key: 'phone' },
    { label: 'Status', key: 'status' },
    { label: 'Role', key: 'role' },
    { label: 'Certificate', key: 'certificate' },
    { label: 'isAgeElegible', key: 'isAgeEligible' }
  ];
  if (teamValue === 'ALL') {
    filterCreatedByuserTeams = teams?.filter(data => data.member_id === user?._id);
  } else {
    filterCreatedByuserTeams = teams?.filter(
      data => data._id === teamValue && data.member_id === user?._id
    );
  }
  const disableAddImportButton = !(
    user?.role === AccountType.ADMIN || filterCreatedByuserTeams?.length > 0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const SubExpiredModalOpen = () => {
    setIsModalOpen(true);
  };
  const SubExpiredModalClose = () => {
    setIsModalOpen(false);
  };
  const handleSubscriptionActions = (actionType: string) => {
    if (userRole === AccountType.ADMIN || (userRole === AccountType.COACH && !isSubsExpired)) {
      switch (actionType) {
        case 'createMember':
          router.push('/members/create');
          break;
      }
    } else {
      SubExpiredModalOpen();
    }
  };
  useEffect(() => {
    if (expiresDate && expiresDate > todayDate) {
      setIsSubsExpired(false);
    } else {
      setIsSubsExpired(true);
    }
  }, [expiresDate]);
  useEffect(() => {
    if (teams.length > 1) {
      if (teamValue === 'ALL') {
        dispatch(
          setMembersDropDownSelectedTeams({
            arrayOfSelectedTeams: filteredTeamData?.map(team => team._id),
            selectedTeam: teamValue
          })
        );
      } else {
        dispatch(
          setMembersDropDownSelectedTeams({
            arrayOfSelectedTeams: [teamValue],
            selectedTeam: teamValue
          })
        );
      }
    }
  }, []); // eslint-disable-line

  const fillOptions = () =>
    teamIsLoading || memberIsLoading
      ? [
        <MenuItem key="Loading" value="Loading">
          <DropDownSpinning />
        </MenuItem>
      ]
      : [
        ...(filteredTeamData && filteredTeamData.length > 1
          ? [
            <MenuItem key="ALL" value="ALL">
              {' '}
              All{' '}
            </MenuItem>
          ]
          : []),
        filteredTeamData?.map(option => (
          <MenuItem key={option._id} value={option._id}>
            {option.name}
          </MenuItem>
        ))
      ];
  const handleChangeTeam = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = event.target.value;
      if (value === 'ALL') {
        dispatch(
          setMembersDropDownSelectedTeams({
            arrayOfSelectedTeams: filteredTeamData?.map(filteredTeam => filteredTeam._id),
            selectedTeam: value
          })
        );
      } else {
        dispatch(
          setMembersDropDownSelectedTeams({ arrayOfSelectedTeams: [value], selectedTeam: value })
        );
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" className={classes.searchContain}>
        <SearchBarFieldComponent classes={classes} dispatchGetMembers={dispatchGetMembers} />
        <Box flexGrow={1} />
        <Box display="flex" justifyContent="space-between">
          <InvitationAndTrialButtonComponent
            teamValue={teamValue}
            dispatchGetMembers={dispatchGetMembers}
            classes={classes}
            user={user}
          />
        </Box>
      </Box>
      <Box className={classes.searchWrapper}>
        <Box className={classes.queryField}>
          {filteredTeamData.length > 1 && (
            <FormControl size="small" fullWidth>
              <InputLabel id="group">Group</InputLabel>
              <Select
                labelId="Group"
                id="demo-simple-select"
                value={teamIsLoading || memberIsLoading ? 'Loading' : teamValue}
                label="Group"
                onChange={handleChangeTeam}
              >
                {fillOptions()}
              </Select>
            </FormControl>
          )}
        </Box>

        <Box className={classes.importExportContain}>
          <ImportButtonComponent
            classes={classes}
            teamValue={teamValue}
            dispatchGetMembers={dispatchGetMembers}
            disableAddImportButton={
              (userRole === AccountType.COACH && isSubsExpired) || disableAddImportButton
            }
          />
          <CSVLink
            data={exportMembers}
            headers={csvHeaders}
            filename="member_export.csv"
            separator=","
            onClick={() => {
              if ((userRole === AccountType.COACH && isSubsExpired) || isDisabled) return false;
            }}
            uFEFF={false}
          >
            <TooltipComponent title="Export">
              <span>
                <IconButton
                  className={className}
                  color="secondary"
                  disabled={(userRole === AccountType.COACH && isSubsExpired) || isDisabled}
                  size="large"
                >
                  <UploadIcon />
                </IconButton>
              </span>
            </TooltipComponent>
          </CSVLink>
          <TooltipComponent title="Add New Member">
            <IconButton
              color="secondary"
              className={classes.addButton}
              onClick={() => handleSubscriptionActions('createMember')}
              size="large"
            >
              <UserPlusIcon className={classes.svgIconScale} />
            </IconButton>
          </TooltipComponent>
        </Box>
      </Box>
      <RenewSubscription open={isModalOpen} setOpen={SubExpiredModalClose} />
    </Box>
  );
};

export default FilterHeader;
