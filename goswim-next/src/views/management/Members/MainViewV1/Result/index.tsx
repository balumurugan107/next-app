import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Checkbox,
  alpha,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Dialog from 'src/components/Dialog';
import config from 'src/config';
import { AccountType } from 'src/constants';
import {
  deleteMember,
  removeMember,
  setLimit,
  setPage,
  setQuery,
  setSelectedMembers
} from 'src/store/management/members';
import { ComponentProps } from 'src/types';
import clsx from 'clsx';
import _ from 'lodash';
import List from 'src/views/management/Members/MainViewV1/Result/List';
import Pagination from 'src/views/management/Members/MainViewV1/Result/Pagination';
import { GetMemberProps } from 'src/views/management/Members/MainViewV1/types';
import RenewSubscription from 'src/views/management/Teams/MainView/RenewSubscription';

const useStyles = makeStyles(theme => ({
  childOne: {
    width: '20%'
  },
  perfectScroll: {
    width: '100% !important'
  },
  table: {
    minWidth: '100%',
    [theme.breakpoints.down('md')]: { width: 1200 }
  },
  statusTableCell: {
    wordBreak: 'break-all'
  },
  actionTableCell: {
    textAlign: 'center',
    width: '20%'
  },
  titleh1: {
    fontSize: '18px',
    color: theme.palette.primary.main
  },
  deleteButton: {
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white
  },
  progressBox: {
    [theme.breakpoints.down('sm')]: { marginTop: 8 }
  },
  me2: {
    marginRight: theme.spacing(2),
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white
  },
  alertSection: {
    backgroundColor: alpha('#ff0000', 0.2)
  },
  tableRowStyle: {
    '& .MuiTableCell-root': {
      padding: theme.spacing(1)
    }
  },
  responsiveTable: {
    overflow: 'auto',
    padding: ` ${theme.spacing(2)}`,
    paddingTop: 0,
    width: '100%'
  },
  tableRowHead: {
    '& .MuiTableCell-root': {
      padding: '16px 8px'
    },
    '& th': {
      background: theme.palette.primary.main,
      color: theme.palette.common.white
    },
    '& .MuiCheckbox-root': {
      color: theme.palette.common.white
    }
  },
  checkBox: {
    '& .MuiTableCell-root': {
      paddingLeft: theme.spacing(1)
    },
    '& .MuiCheckbox-root': {
      color: theme.palette.common.white,
      padding: '0 0 0 8px'
    }
  },
  tableInfo: {
    marginBottom: theme.spacing(1),
    textTransform: 'capitalize',
    padding: theme.spacing(1.25),
    borderRadius: theme.spacing(0.5),
    background: theme.palette.info.main,
    color: theme.palette.text.primary
  },
  selectedTeamCount: {
    marginRight: theme.spacing(2)
  }
}));

interface ResultProps {
  dispatchGetMembers: (args: GetMemberProps) => void;
}

const Result: React.FC<ComponentProps & ResultProps> = ({ dispatchGetMembers }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const page = useSelector(state => state.members.page);
  const limit = useSelector(state => state.members.limit);
  const query = useSelector(state => state.members.query, _.isEqual);
  const members = useSelector(state => state.members.data);
  const { _id, role }: any = useSelector(state => state.account.user);
  const { user } = useSelector(state => state.account);
  const { heirarchyTeams }: any = useSelector(state => state.team, _.isEqual) || [];
  const { teamsList } = useSelector(state => state.team);
  const ownersTeamsList = teamsList.filter(
    team => team._id !== goswimGroupId && team.member_id === user?._id
  );
  const selectedMembers = useSelector(state => state.members.selectedMembers);
  const { currentSelectedTeams, currentSelectedTeam } = useSelector(
    state => state.members,
    _.isEqual
  );
  const isSelected = useSelector(state => state.members.isSelected);
  const expiresDate = useSelector(state => state.subscription.data?.renews_on);
  const memberIsLoading = useSelector(state => state.members.isLoading);
  const teamIsLoading = useSelector(state => state.team.isLoading);
  const [isSubsExpired, setIsSubsExpired] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const todayDate = Date.now();
  const isAdmin = role === AccountType.ADMIN;
  const isCoach = role === AccountType.COACH;
  const goswimGroupId = config.goswimGroupAPI.groupId;
  const selectedSomeMembers = selectedMembers.length > 0 && selectedMembers.length < members.length;
  const selectedAllProducts = selectedMembers.length ? true : false;
  const selectedTeamDetail = heirarchyTeams.find(
    (team: { _id: string }) => team._id === currentSelectedTeam
  );
  const selectedMembersDetails = members?.filter(member => selectedMembers.includes(member._id));
  const isCreated = heirarchyTeams
    ?.filter((heirarchyTeam: any) => heirarchyTeam._id === currentSelectedTeam)
    ?.map((team: any) => team.member_id);

  const handleDeleteDialogClose = () => setIsDeleteConfirmationOpen(false);

  const getQueryMembers = useCallback(() => {
    dispatchGetMembers({ page: page + 1, limit, teams: currentSelectedTeams, query });
  }, [page, limit, currentSelectedTeams, dispatchGetMembers, query]);

  const dispatchMembers = useCallback(() => {
    dispatchGetMembers({ page: page + 1, limit, teams: currentSelectedTeams });
  }, [page, limit, currentSelectedTeams, dispatchGetMembers]);

  const handlePageChange = (_: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    dispatch(setPage(page));
  };
  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setLimit(+event.target.value));
  };

  const handleSelectAllProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedMembers = event.target.checked ? members?.map(member => member._id) : [];
    dispatch(setSelectedMembers(selectedMembers));
  };

  const SubExpiredModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (expiresDate && expiresDate > todayDate) {
      setIsSubsExpired(false);
    } else {
      setIsSubsExpired(true);
    }
  }, [expiresDate, setIsSubsExpired, todayDate]);

  useEffect(() => {
    if (query.length > 3) {
      getQueryMembers();
    } else {
      dispatchMembers();
    }
    return () => {
      if (!router.asPath.includes('members')) {
        dispatch(setQuery(''));
      }
    };
  }, [
    dispatch,
    query,
    page,
    limit,
    router,
    currentSelectedTeams,
    dispatchMembers,
    getQueryMembers
  ]);

  return (
    <>
      {memberIsLoading || teamIsLoading ? (
        <Box width="100%" className={classes.progressBox} height={10}>
          <LinearProgress />
        </Box>
      ) : (
        <Box className={classes.responsiveTable}>
          {currentSelectedTeam === 'ALL' && (
            <Typography variant="h5" className={classes.tableInfo}>
              *Please select individual group to invite or remove user
            </Typography>
          )}

          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead className={classes.tableRowHead}>
                <TableRow>
                  {selectedMembers.length === 0 ? (
                    <>
                      {(currentSelectedTeam !== 'ALL' || ownersTeamsList.length === 1) && (
                        <TableCell padding="checkbox" className={classes.checkBox}>
                          <Checkbox
                            checked={selectedAllProducts}
                            indeterminate={selectedSomeMembers}
                            onChange={handleSelectAllProducts}
                            disabled={
                              isAdmin
                                ? false
                                : (role === AccountType.COACH && isSubsExpired) || isSelected
                            }
                          />
                        </TableCell>
                      )}
                      <TableCell className={classes.childOne}>Member Name</TableCell>
                      <TableCell className={classes.childOne}>Role</TableCell>
                      <TableCell className={classes.statusTableCell}>Status</TableCell>
                      <TableCell className={classes.actionTableCell}>Actions</TableCell>
                    </>
                  ) : (
                    <>
                      {(isAdmin && currentSelectedTeam !== 'ALL') ||
                      (currentSelectedTeam !== 'ALL' &&
                        selectedTeamDetail?.member_id === user?._id &&
                        isCoach) ? (
                        <>
                          <TableCell padding="checkbox" className={classes.checkBox}>
                            <Checkbox
                              checked={selectedAllProducts}
                              indeterminate={selectedSomeMembers}
                              onChange={handleSelectAllProducts}
                            />
                          </TableCell>
                          <TableCell colSpan={5}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                              <div>
                                {role === AccountType.COACH && (
                                  <>
                                    <Button
                                      className={clsx(classes.me2, classes.deleteButton)}
                                      variant="outlined"
                                      size="small"
                                      onClick={() => {
                                        setIsDelete(false);
                                        setIsDeleteConfirmationOpen(true);
                                      }}
                                      disabled={
                                        isCreated.every((isCreated: any) => isCreated !== _id) &&
                                        role === AccountType.COACH
                                      }
                                    >
                                      Remove User
                                    </Button>
                                  </>
                                )}
                                {role === AccountType.ADMIN && (
                                  <>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      onClick={() => {
                                        setIsDelete(false);
                                        setIsDeleteConfirmationOpen(true);
                                      }}
                                      disabled={
                                        selectedMembersDetails &&
                                        !!(
                                          selectedMembersDetails.some(
                                            (memberDetail: any) =>
                                              memberDetail.role === AccountType.ADMIN
                                          ) ||
                                          isCreated.every((isCreated: any) => isCreated !== _id)
                                        )
                                      }
                                      className={clsx(classes.me2, classes.deleteButton)}
                                    >
                                      Remove User
                                    </Button>
                                    {false && (
                                      <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                          setIsDelete(true);
                                          setIsDeleteConfirmationOpen(true);
                                        }}
                                        className={clsx(classes.me2, classes.deleteButton)}
                                        disabled={
                                          (selectedMembersDetails &&
                                            selectedMembersDetails.some(
                                              (memberDetail: any) =>
                                                memberDetail.role === AccountType.ADMIN
                                            )) ||
                                          isCreated.every((isCreated: any) => isCreated !== _id)
                                        }
                                      >
                                        Delete User
                                      </Button>
                                    )}
                                  </>
                                )}
                              </div>
                              <div className={classes.selectedTeamCount}>
                                {selectedMembers.length === 1 ? (
                                  <Typography>
                                    Selected ( {selectedMembers.length} ) member
                                  </Typography>
                                ) : (
                                  <Typography>
                                    Selected ( {selectedMembers.length} ) members
                                  </Typography>
                                )}
                              </div>
                            </Box>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedAllProducts}
                              indeterminate={selectedSomeMembers}
                              onChange={handleSelectAllProducts}
                            />
                          </TableCell>
                          <TableCell colSpan={5}>
                            {currentSelectedTeam !== 'ALL' &&
                            selectedTeamDetail?.member_id !== user?._id &&
                            isCoach
                              ? "You didn't have access to edit this group"
                              : 'Select individual group to remove user'}
                          </TableCell>
                        </>
                      )}
                    </>
                  )}
                </TableRow>
              </TableHead>
              {currentSelectedTeam !== goswimGroupId ? (
                <TableBody className={classes.tableRowStyle}>
                  <List currentSelectedTeams={currentSelectedTeams} />
                </TableBody>
              ) : (
                <div>No Result Available</div>
              )}
            </Table>
          </TableContainer>
          <Pagination {...{ page, limit, handlePageChange, handleLimitChange }} />
        </Box>
      )}

      <Dialog
        isDialogOpen={isDeleteConfirmationOpen}
        handleCloseDialog={handleDeleteDialogClose}
        tilte={<div className={classes.titleh1}>{isDelete ? 'Delete Member' : 'Remove Member'}</div>}
        content={<>{`Are you sure to ${isDelete ? 'delete' : 'remove'} the selected Members?`}</>}
        handleNo={handleDeleteDialogClose}
        handleYes={async () => {
          if (isDelete) await dispatch(deleteMember({ ids: selectedMembers }));
          else await dispatch(removeMember(currentSelectedTeam, { memberIds: selectedMembers }));

          await handleDeleteDialogClose();
          await dispatchGetMembers({ page: page + 1, limit, teams: currentSelectedTeams, query });
        }}
      />
      <RenewSubscription open={isModalOpen} setOpen={SubExpiredModalClose} />
    </>
  );
};
export default Result;
