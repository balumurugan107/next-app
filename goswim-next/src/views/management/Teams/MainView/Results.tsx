import React, { useState, useEffect, useRef } from 'react';
// import { Link as RouterLink } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Card,
  Checkbox,
  InputAdornment,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Chip,
  Paper,
  TableContainer,
  LinearProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  Search as SearchIcon,
  Eye as ViewIcon,
  X as ClearIcon
} from 'react-feather';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import config from 'src/config';
import { ComponentProps } from 'src/types/components';
import {
  setSelectedTeams,
  setTeamsDetailsViewOptions,
  deleteTeam,
  exitFromTeam,
  TeamHeirarchyDocument,
  getTeamsList,
  getMemberGroups
} from 'src/store/management/team';
import Dialog from 'src/components/Dialog';
import { AccountType, brandThemeOptions } from 'src/constants';
import { CustomThumbnail } from 'src/constants/common';
import Circle from 'src/components/Circle';
import Avatar from 'src/components/Avatar';
import { getBrandColorPalette } from 'src/helpers/getBrandColor';
import {
  setMembersDropDownSelectedTeamCalendar,
  setMembersDropDownSelectedTeams,
  setSelectedTeam
} from 'src/store/management/members';
import { TeamDialogBoxConfimrationText } from 'src/constants/team';
import TooltipComponent from 'src/components/Tooltip';
import { useCommonStyles } from 'src/styles/common';
import RenewSubscription from './RenewSubscription';
import clsx from 'clsx';
import AddGroupDialog from '../CreateEditView/GroupModal';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '50vh',
    width: '100%',
    cursor: 'default',
    [theme.breakpoints.only('md')]: { fontSize: '0.75rem' }
  },
  colorThemeCellAllign: {
    paddingLeft: 15
  },
  queryField: {
    width: 250,
    [theme.breakpoints.down('sm')]: { width: '260px' },
    [theme.breakpoints.between(360, 420)]: { width: '230px' }
  },
  avatar: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '50%'
  },
  clearIcon: {
    marginRight: '-1.25rem'
  },
  childFour: {
    cursor: 'pointer',
    backgroundColor: theme.palette.background.dark,
    minWidth: 55
  },
  swimmerInfo: {
    backgroundColor: theme.palette.background.dark,
    minWidth: 55
  },
  actionTableCell: {
    textAlign: 'center',
    minWidth: 120
  },
  titleh1: {
    fontSize: '18px',
    color: theme.palette.primary.main
  },
  tableCell: {
    minWidth: 170,
    wordBreak: 'break-all'
  },
  tableCellDesc: {
    minWidth: 170,
    wordBreak: 'break-word'
  },
  addButton: {
    float: 'right',
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  deleteButton: {
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white
  },
  exitGroup: {
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white
  },
  me2: {
    marginRight: theme.spacing(2)
  },
  responsiveTable: {
    overflow: 'auto',
    padding: ` ${theme.spacing(2)}`,
    paddingTop: 0
  },
  tableRowStyle: {
    '& .MuiTableCell-root': {
      padding: theme.spacing(1)
    }
  },
  tableRowHead: {
    '& .MuiTableCell-root': {
      padding: '8px'
    },
    '& th': {
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:nth-child(2)': {
        minWidth: 200
      }
    }
  },
  checkBox: {
    '& .MuiTableCell-root': {
      paddingLeft: theme.spacing(1)
    },
    '& .MuiCheckbox-root': {
      color: theme.palette.common.white
    }
  },
  rowStyling: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.info.main
    },
    '&:hover': {
      backgroundColor: `${theme.palette.info.main} !important`
    }
  },
  selectedTeamCount: {
    marginRight: theme.spacing(2)
  },
  noData: {
    margin: '56px auto',
    maxWidth: '50%',
    textAlign: 'center'
  },
  noDataPic: {
    display: 'block',
    margin: 'auto',
    height: '100px'
  },
  noDataMessage: {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    margin: '10px',
    marginTop: theme.spacing(3)
  },
  helperMessage: {
    color: theme.palette.text.secondary,
    fontWeight: 400,
    fontSize: '0.875rem'
  }
}));

const teamDeleteConfirmation = (isDelete: boolean) => {
  return {
    title: isDelete
      ? TeamDialogBoxConfimrationText.DELETE_CONFIRMATION
      : TeamDialogBoxConfimrationText.EXIT_CONFIRMATION,
    isDeleteTeam: true,
    yesContent: 'YES'
  };
};

export type FormType = 'create' | 'edit' | 'view';

const Results: React.FC<ComponentProps> = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddGroupDialog, setShowAddGroupDialog] = useState(false);
  const history = useRouter();

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const deleteConfirmationRef = useRef({
    title: '',
    isDeleteTeam: false,
    yesContent: 'YES'
  });
  const goswimGroupId = config.goswimGroupAPI.groupId;
  const [args, setArgs] = useState({ page: 1, limit: 20, search: '' });
  const [teamToEdit, setTeamToEdit] = useState<TeamHeirarchyDocument | undefined>();
  const [teamType, setTeamType] = useState<FormType>('create');

  const [isSubsExpired, setIsSubsExpired] = useState(false);
  const expiresDate = useSelector(state => state.subscription.data?.renews_on);

  const todayDate = Date.now();
  const {
    selectedTeams,
    teamDVO,
    userRole,
    totalCount,
    isLoading,
    teamsWithoutDefGroup,
    currentSelectedTeam
  } = useSelector(state => ({
    selectedTeams: state.team.selectedTeams || [],
    teamDVO: state.team.teamsDetailsViewOption,
    isLoading: state.team.isLoading,
    teamsHeirarchy: state.team.heirarchyTeams || [],
    teamsWithoutDefGroup: state.team.memberGroups || [],
    userRole: state.account.user?.role || AccountType.SWIMMER,
    totalCount: state.team.totalCount,
    currentSelectedTeam: state.members.currentSelectedTeam
  }));

  const settings = useSelector(state => state.settings);

  const handleQueryChange = (searchParam: string) => {
    setArgs(prev => ({ ...prev, search: searchParam }));
  };

  const handleCloseQueryChange = () => {
    setArgs(prev => ({ ...prev, search: '' }));
    dispatch(setTeamsDetailsViewOptions({ ...teamDVO, query: '' }));
  };

  useEffect(() => {
    if (!args.search) {
      dispatch(setTeamsDetailsViewOptions({ ...teamDVO, query: '' }));
    }
  }, [args.search]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getMemberGroups(args));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [args]);

  useEffect(() => {
    if (expiresDate && expiresDate > todayDate) {
      setIsSubsExpired(false);
    } else {
      setIsSubsExpired(true);
    }
  }, [expiresDate]);

  const enableBulkOperations = selectedTeams?.length > 0;

  const selectedAllProducts =
    selectedTeams?.length > 0 && selectedTeams?.length === teamsWithoutDefGroup?.length;

  const selectedSomeMembers =
    selectedTeams?.length > 0 &&
    selectedTeams?.length !== teamsWithoutDefGroup?.length &&
    selectedTeams?.length < teamsWithoutDefGroup?.length;

  const findCreateGroup = teamsWithoutDefGroup
    ?.filter(filterTeam => selectedTeams.includes(filterTeam._id))
    ?.map(mapTeam => mapTeam.member_id);

  const _id = useSelector(state => state.account.user?._id);

  const handleSelectAllProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedTeams = event.target.checked
      ? teamsWithoutDefGroup.filter(team => team._id != goswimGroupId)
      : [];
    const filteredSelectedTeams = checkedTeams?.map(team => team._id);
    dispatch(setSelectedTeams(filteredSelectedTeams));
  };

  const handleSelectOneProduct = (_: React.ChangeEvent<HTMLInputElement>, teamId: string) => {
    if (!selectedTeams.includes(teamId)) {
      dispatch(setSelectedTeams([...selectedTeams, teamId]));
    } else {
      dispatch(setSelectedTeams(selectedTeams?.filter(_id => _id !== teamId)));
    }
  };

  const handleChangePage = (_: any, newPage: number) => {
    dispatch(setSelectedTeams([]));
    setArgs(prev => ({ ...prev, page: newPage + 1 }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setArgs(prev => ({ ...prev, limit: parseInt(event.target.value, 10) }));
    setArgs(prev => ({ ...prev, page: 1 }));
  };

  const handleDeleteDialogClose = () => setIsDeleteConfirmationOpen(false);

  function truncate(input: string) {
    if (input.length > 18) {
      return input.substring(0, 18) + '...';
    }
    return input;
  }

  const handleDelete = async (selectedTeams: string[]) => {
    try {
      if (isDelete) {
        await dispatch(deleteTeam({ ids: selectedTeams }));
        if (selectedTeams.includes(currentSelectedTeam)) {
          await dispatch(setSelectedTeam('ALL'));
          await dispatch(
            setMembersDropDownSelectedTeamCalendar({
              arrayOfSelectedTeams: [],
              selectedTeam: 'ALL'
            })
          );
        }
      } else {
        await dispatch(exitFromTeam({ teamIds: selectedTeams }));
      }

      dispatch(getMemberGroups());
      dispatch(getTeamsList());
    } catch (ex) {
      console.error(ex);
    }
  };

  const handleSubscriptionActions = (actionType: string, team?: TeamHeirarchyDocument) => {
    if (team && actionType === 'editGroup') {
      setTeamType('edit');
      setTeamToEdit(team);
    } else if (team && actionType === 'viewGroup') {
      setTeamToEdit(team);
      setTeamType('view');
    } else {
      setTeamType('create');
      setTeamToEdit(undefined);
    }
    switch (actionType) {
      case 'addGroup':
        setShowAddGroupDialog(true);
        break;
      case 'editGroup':
        setShowAddGroupDialog(true);
        break;
      case 'viewGroup':
        setShowAddGroupDialog(true);
        break;
    }
  };

  const SubExpiredModalClose = () => {
    setIsModalOpen(false);
  };

  const readMore = (string: string, maxWords: number) => {
    var array = string.split(' ');
    var wordCount = array?.length;
    var string = array.splice(0, maxWords).join(' ');

    if (wordCount > maxWords) {
      string += '...';
    }
    return string;
  };

  return (
    <>
      {isLoading && <LinearProgress />}
      <Card className={classes.root}>
        <Box p={2} display="flex" alignItems="center" justifyContent="space-between">
          <Box>
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
                endAdornment: args.search && args.search !== '' && (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={handleCloseQueryChange}
                      aria-label="clear"
                      className={classes.clearIcon}
                    >
                      <ClearIcon width="18" height="18" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onChange={e => handleQueryChange(e.target.value)}
              placeholder="Search Groups" //old:Teams
              value={args.search}
              onKeyPress={(ev: any) => {
                if (ev.key === 'Enter') {
                  ev.target.blur();
                }
              }}
              variant="outlined"
              size="small"
            />
          </Box>

          {(userRole === AccountType.ADMIN || userRole === AccountType.COACH) && (
            <Box>
              <TooltipComponent title="Add New Group">
                <IconButton
                  color="secondary"
                  className={classes.addButton}
                  onClick={e => handleSubscriptionActions('addGroup')}
                >
                  <GroupAddIcon className={commonClasses.svgIconScale} />
                </IconButton>
              </TooltipComponent>
            </Box>
          )}
        </Box>
        <Box className={classes.responsiveTable}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className={classes.tableRowHead}>
                  {!enableBulkOperations ? (
                    <>
                      {(userRole === AccountType.COACH || userRole === AccountType.ADMIN) && (
                        <TableCell className={classes.checkBox}>
                          <Checkbox
                            color="primary"
                            checked={selectedAllProducts}
                            indeterminate={selectedSomeMembers}
                            onChange={handleSelectAllProducts}
                            disabled={userRole === AccountType.COACH && isSubsExpired}
                          />
                        </TableCell>
                      )}
                      <TableCell className={classes.tableCell}>Group Name</TableCell>
                      {true && <TableCell className={classes.tableCell}>Description</TableCell>}
                      <TableCell className={classes.tableCell}>Members</TableCell>
                      {false && <TableCell className={classes.tableCell}>Color Theme</TableCell>}
                      <TableCell className={classes.tableCell}>Created By</TableCell>
                      {(userRole === AccountType.COACH || userRole === AccountType.ADMIN) && (
                        <TableCell className={classes.actionTableCell} style={{ paddingLeft: 0 }}>
                          Actions
                        </TableCell>
                      )}
                    </>
                  ) : (
                    <>
                      {(userRole === AccountType.COACH || userRole === AccountType.ADMIN) && (
                        <>
                          <TableCell padding="checkbox" className={classes.checkBox}>
                            <Checkbox
                              checked={selectedAllProducts}
                              indeterminate={selectedSomeMembers}
                              onChange={handleSelectAllProducts}
                              disabled={userRole === AccountType.COACH && isSubsExpired}
                            />
                          </TableCell>
                          <TableCell colSpan={5} className={classes.deleteButton}>
                            {userRole === AccountType.COACH || userRole === AccountType.ADMIN ? (
                              <>
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <div>
                                    <Button
                                      className={clsx(classes.me2, classes.deleteButton)}
                                      size="small"
                                      variant="outlined"
                                      onClick={() => {
                                        deleteConfirmationRef.current = teamDeleteConfirmation(
                                          true
                                        );
                                        setIsDelete(true);
                                        setIsDeleteConfirmationOpen(true);
                                      }}
                                      disabled={
                                        !!findCreateGroup.filter(group => group !== _id).length
                                      }
                                    >
                                      Delete
                                    </Button>
                                    <Button
                                      size="small"
                                      variant="outlined"
                                      onClick={() => {
                                        deleteConfirmationRef.current = teamDeleteConfirmation(
                                          false
                                        );
                                        setIsDelete(false);
                                        setIsDeleteConfirmationOpen(true);
                                      }}
                                      disabled={
                                        !!findCreateGroup.filter(group => group === _id).length
                                      }
                                      className={classes.exitGroup}
                                      style={{
                                        display:
                                          userRole === AccountType.ADMIN ? 'none' : 'inline-block'
                                      }}
                                    >
                                      Exit Group
                                    </Button>
                                  </div>
                                  <div className={classes.selectedTeamCount}>
                                    {selectedTeams.length === 1 ? (
                                      <Typography>
                                        Selected ( {selectedTeams.length} ) group
                                      </Typography>
                                    ) : (
                                      <Typography>
                                        Selected ( {selectedTeams.length} ) groups
                                      </Typography>
                                    )}
                                  </div>
                                </Box>
                              </>
                            ) : (
                              <>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => {
                                    deleteConfirmationRef.current = teamDeleteConfirmation(false);
                                    setIsDeleteConfirmationOpen(true);
                                  }}
                                  disabled={
                                    !!findCreateGroup?.filter(group => group !== _id)?.length
                                  }
                                >
                                  Exit Group
                                </Button>
                              </>
                            )}
                          </TableCell>
                        </>
                      )}
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableRowStyle}>
                {teamsWithoutDefGroup?.length
                  ? teamsWithoutDefGroup.map(teamData => {
                      const isTeamSelected = selectedTeams.includes(teamData._id);
                      return (
                        <TableRow
                          hover
                          key={teamData._id}
                          selected={isTeamSelected}
                          className={classes.rowStyling}
                        >
                          {(userRole === AccountType.COACH || userRole === AccountType.ADMIN) && (
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isTeamSelected}
                                disabled={userRole === AccountType.COACH && isSubsExpired}
                                onChange={event => handleSelectOneProduct(event, teamData._id)}
                                value={isTeamSelected}
                              />
                            </TableCell>
                          )}
                          <TableCell className={classes.tableCell}>
                            <Box display="flex" alignItems="center">
                              <Box p={1} display="flex" justifyContent="center" alignItems="center">
                                {teamData.brand_logo_url ? (
                                  <img
                                    alt=""
                                    className={classes.avatar}
                                    src={`${teamData.brand_logo_url}`}
                                    onError={({ currentTarget }) => {
                                      currentTarget.onerror = null;
                                      currentTarget.src = CustomThumbnail;
                                    }}
                                  />
                                ) : (
                                  <Avatar type="team" className={classes.avatar} src="" />
                                )}
                              </Box>
                              <Typography variant="body1" color="textPrimary">
                                {truncate(teamData.name)}
                              </Typography>
                            </Box>
                          </TableCell>
                          {true && (
                            <TableCell className={classes.tableCellDesc}>
                              <Box width="100%">
                                {teamData.description ? readMore(teamData.description, 12) : ''}
                              </Box>
                            </TableCell>
                          )}
                          <TableCell className={classes.tableCell}>
                            <Box>
                              {userRole === AccountType.SWIMMER ? (
                                <Chip
                                  variant="outlined"
                                  label={teamData?.membersCount}
                                  className={classes.swimmerInfo}
                                />
                              ) : (
                                <Chip
                                  variant="outlined"
                                  label={
                                    teamData?.membersCount > 0
                                      ? teamData?.membersCount - 1
                                      : teamData?.membersCount
                                  }
                                  className={classes.childFour}
                                  onClick={() => {
                                    history.push('/members')
                                    dispatch(
                                      setMembersDropDownSelectedTeams({
                                        arrayOfSelectedTeams: [teamData._id],
                                        selectedTeam: teamData._id
                                      })
                                    );
                                  }}
                                />
                              )}
                            </Box>
                          </TableCell>
                          {false && (
                            <TableCell className={classes.tableCell}>
                              <Box display="flex" alignItems="center">
                                <SvgIcon>
                                  <Circle
                                    color={getBrandColorPalette(
                                      (teamData.brand_theme && teamData.brand_theme) || null
                                    )}
                                  />
                                </SvgIcon>
                                <Typography
                                  variant="body1"
                                  color="textPrimary"
                                  className={classes.colorThemeCellAllign}
                                >
                                  {brandThemeOptions.find(
                                    datum => datum.value === teamData.brand_theme
                                  )?.title || brandThemeOptions[0].title}
                                </Typography>
                              </Box>
                            </TableCell>
                          )}
                          <TableCell className={classes.tableCell}>
                            <Typography variant="body1" color="textPrimary">
                              {teamData.createdBy}
                            </Typography>
                          </TableCell>
                          {(userRole === AccountType.COACH || userRole === AccountType.ADMIN) && (
                            <TableCell className={classes.actionTableCell}>
                              <TooltipComponent title="Edit">
                                <IconButton
                                  onClick={() => handleSubscriptionActions('editGroup', teamData)}
                                >
                                  <SvgIcon fontSize="small">
                                    <EditIcon />
                                  </SvgIcon>
                                </IconButton>
                              </TooltipComponent>
                              <TooltipComponent title="View">
                                <IconButton
                                  href={`/train/view/${teamData._id}`}
                                >
                                  <SvgIcon fontSize="small">
                                    <ViewIcon />
                                  </SvgIcon>
                                </IconButton>
                              </TooltipComponent>
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })
                  : !isLoading && (
                      <TableRow>
                        <TableCell colSpan={12} align="center">
                          <div className={classes.noData}>
                            <img
                              src={
                                settings.variant === 'dark'
                                  ? '/static/images/noresults/groups-dark.svg'
                                  : '/static/images/noresults/groups-light.svg'
                              }
                              alt="no groups found"
                              className={classes.noDataPic}
                            />
                            <h2 className={classes.noDataMessage}>No groups found</h2>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
              </TableBody>
            </Table>
            {teamsWithoutDefGroup?.length ? (
              <TablePagination
                component="div"
                count={totalCount}
                className={commonClasses.pagination}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                page={args.page - 1}
                rowsPerPage={args.limit}
                rowsPerPageOptions={[20, 50, 100]}
              />
            ) : (
              ''
            )}
          </TableContainer>
        </Box>
        <Dialog
          isDialogOpen={isDeleteConfirmationOpen}
          handleCloseDialog={handleDeleteDialogClose}
          tilte={<div className={classes.titleh1}>Confirmation</div>}
          content={<>{deleteConfirmationRef.current.title}</>}
          handleNo={
            deleteConfirmationRef.current.isDeleteTeam ? handleDeleteDialogClose : undefined
          }
          handleYes={() => {
            handleDeleteDialogClose();
            deleteConfirmationRef.current.isDeleteTeam && handleDelete(selectedTeams);
          }}
        />
        <RenewSubscription open={isModalOpen} setOpen={SubExpiredModalClose} />
      </Card>
      <AddGroupDialog
        type={teamType}
        team={teamToEdit}
        openDialog={showAddGroupDialog}
        closeDialog={(boolean: Boolean) => {
          setShowAddGroupDialog(false);
          if (boolean) dispatch(getMemberGroups(args));
        }}
      />
    </>
  );
};
export default Results;
