import { Box, Checkbox, IconButton, SvgIcon, TableCell, TableRow, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import _ from 'lodash';
import Link from 'src/components/Link';
import React, { useEffect, useState } from 'react';
import { Edit as EditIcon, Eye as ViewIcon } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'src/components/Avatar';
import Coach from 'src/components/Coach';
import ConditionalWrapper from 'src/components/ConditionalWrapper';
import Swimmer from 'src/components/Swimmer';
import TooltipComponent from 'src/components/Tooltip';
import config from 'src/config';
import { AccountType } from 'src/constants';
import getStatusLabel from 'src/helpers/getStatusLabel';
import { MemberData, setSelectedMembers } from 'src/store/management/members';
import { ComponentProps } from 'src/types';
import { ListProps } from 'src/views/management/Members/MainViewV1/Result/types';

interface ListItemProps extends ListProps {
  member: MemberData;
  isMemberSelected: boolean;
  selectedMembers: string[];
}
const useStyles = makeStyles(theme => ({
  avatar: {
    height: 50,
    width: 50
  },
  image: {
    height: 50,
    width: 50
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
  actionTableCell: {
    textAlign: 'center',
    width: '20%'
  },
  childOne: {
    width: '40%'
  },
  childTwo: {
    width: '10%'
  },
  checkBox: {
    padding: '8px',
    width: '5%'
  },
  statusTableCell: {
    wordBreak: 'break-all'
  },
  rowStyling: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.info.main
    },
    '&:hover': {
      backgroundColor: `${theme.palette.info.main} !important`
    }
  },
  fullName: {
    fontWeight: 500
  }
}));

const ListItem: React.FC<ComponentProps & ListItemProps> = ({
  member,
  isMemberSelected,
  selectedMembers
}) => {
  // Accept every jsx dependency as prop
  const { profile_picture_url, full_name, email, role, status, _id } = member;
  const goswimGroupId = config.goswimGroupAPI.groupId;
  const { user } = useSelector(state => state.account);

  const dispatch = useDispatch();
  const classes = useStyles();
  const { isLoading, currentSelectedTeam } = useSelector(
    state => ({
      userTeam: state.account.user?.teams,
      canManageCurrentTeam: state.account.user?.can_manage_current_teams,
      currentSelectedTeam: state.members.currentSelectedTeam,
      heirarchyTeams: state.team.heirarchyTeams,
      isLoading: state.team.isLoading
    }),
    _.isEqual
  );
  const { teamsList } = useSelector(state => state.team);
  const ownersTeamsList = teamsList.filter(
    team => team._id !== goswimGroupId && team.member_id === user?._id
  );
  const userType = useSelector(state => state.account.user?.role);
  let isDisableEditDelete: boolean = false;
  const expiresDate = useSelector(state => state.subscription.data?.renews_on);
  const todayDate = Date.now();
  const [isSubsExpired, setIsSubsExpired] = useState(false);

  const handleSelect = (_: React.ChangeEvent<HTMLInputElement>, memberId: string) => {
    if (!selectedMembers.includes(memberId)) {
      dispatch(setSelectedMembers([...selectedMembers, memberId]));
    } else {
      dispatch(setSelectedMembers(selectedMembers?.filter(_id => _id !== memberId)));
    }
  };

  const getRole = () => {
    if (role) {
      const isSwimmer = [
        AccountType.SWIMMER,
        AccountType.SWIMMER_OR_PARENT,
        AccountType.PARENT
      ].some(x => x === (role as AccountType));

      const isCoach = [AccountType.COACH_OR_SWIMMING_EXPERT, AccountType.COACH].some(
        x => x === (role as AccountType)
      );

      return isSwimmer ? AccountType.ATHLETE : isCoach ? AccountType.COACH : role;
    } else {
      return AccountType.ATHLETE;
    }
  };

  const isAdmin = userType === AccountType.ADMIN;

  const isCoach = userType === AccountType.COACH;

  useEffect(() => {
    if (expiresDate && expiresDate > todayDate) {
      setIsSubsExpired(false);
    } else {
      setIsSubsExpired(true);
    }
  }, [expiresDate]);

  return (
    <TableRow hover selected={isMemberSelected} className={classes.rowStyling}>
      {(currentSelectedTeam !== 'ALL' || ownersTeamsList.length === 1) && (
        <TableCell className={classes.checkBox}>
          <Checkbox
            checked={isMemberSelected}
            onChange={event => handleSelect(event, _id)}
            value={isMemberSelected}
            disabled={isAdmin ? false : (isCoach && isSubsExpired) || isDisableEditDelete}
          />
        </TableCell>
      )}
      <TableCell className={classes.childOne}>
        <Box display="flex" alignItems="center">
          <Box p={1} pl={0}>
            {profile_picture_url ? (
              <Avatar className={classes.image} srcSet={profile_picture_url} />
            ) : (
              <Avatar className={classes.avatar} srcSet="" />
            )}
          </Box>
          <Box>
            <Typography variant="body1" color="textPrimary" className={classes.fullName}>
              {full_name}
              {member.role === AccountType.COACH && (
                <Coach
                  tooltip={AccountType.COACH_OR_SWIMMING_EXPERT}
                  className={classes.roleIcon}
                  fontSize="small"
                  viewBox="0 0 38 42"
                />
              )}
              {member.role === AccountType.SWIMMER && (
                <Swimmer
                  tooltip={AccountType.SWIMMER_OR_PARENT}
                  className={classes.swimmerRoleIcon}
                  fontSize="small"
                  viewBox="0 0 53 41"
                />
              )}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {email}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell className={classes.childTwo}>{getRole()}</TableCell>
      <TableCell className={classes.statusTableCell}>{getStatusLabel(status)}</TableCell>
      <TableCell className={classes.actionTableCell}>
        {isAdmin && (
          <ConditionalWrapper
            condition={!isDisableEditDelete}
            wrapper={children => <TooltipComponent title="Edit">{children}</TooltipComponent>}
          >
            <IconButton
              {...(!isDisableEditDelete && {
                href: `/members/edit/${_id}`,
              })}
              disabled={isDisableEditDelete}
              size="large"
            >
              <SvgIcon fontSize="small">
                <EditIcon />
              </SvgIcon>
            </IconButton>
          </ConditionalWrapper>
        )}
        <TooltipComponent title="View">
          <Link href={`/members/view/${_id}`} prefetch={false}>
            <IconButton
              disabled={isLoading}
              size="large"
            >
              <SvgIcon fontSize="small">
                <ViewIcon />
              </SvgIcon>
            </IconButton>
          </Link>
        </TooltipComponent>
      </TableCell>
    </TableRow>
  );
};

export default ListItem;
