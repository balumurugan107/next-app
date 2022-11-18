/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Card, Slide, Button, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { getMembers } from 'src/store/management/members';
import { getTeamHeirarchy } from 'src/store/management/team';
import FilterHeader from 'src/views/management/Members/MainViewV1/FilterHeader';
import Results from 'src/views/management/Members/MainViewV1/Result';
import { GetMemberProps } from 'src/views/management/Members/MainViewV1/types';
import { PlusSquare } from 'react-feather';
import _ from 'lodash';
import AddGroupDialog from '../../Teams/CreateEditView/GroupModal';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  addGrpBtnDiv: {
    padding: '16px 0',
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  addGrpBtn: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white
  },
  plusIcon: {
    paddingRight: theme.spacing(1)
  },
  PageTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1.25rem',
    color: theme.palette.text.primary,
    fontWeight: 500
  },
  cardText: {
    color: theme.palette.text.secondary
  }
}));

const MembersView: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.team);
  const teamData = useSelector(state => state.team.heirarchyTeams, _.isEqual) || [];
  const [showAddGroupDialog, setShowAddGroupDialog] = useState(false);

  useEffect(() => {
    dispatch(getTeamHeirarchy());
  }, []); // eslint-disable-line

  const dispatchGetMembers = async (args: GetMemberProps) => {
    try {
      const filter = {
        ...args,
        sort: '-_id'
      };
      dispatch(getMembers<typeof filter>(filter));
    } catch (ex) {
      throw ex;
    }
  };

  return (
    <Slide direction="right" in mountOnEnter unmountOnExit>
      <div className={classes.root} title="Members">
        {teamData.length > 1 ? (
          <Container>
            <Box>
              <Typography variant="h1" className={classes.PageTitle}>
                Members
              </Typography>
              <Typography className={classes.cardText} variant="h6" gutterBottom>
                See which members of your Training Group are active, who still needs to accept their
                invitation, and add new members quickly.
              </Typography>
            </Box>
            <Box>
              <Card>
                <FilterHeader {...{ dispatchGetMembers }} />
                <Results {...{ dispatchGetMembers }} />
              </Card>
            </Box>
          </Container>
        ) : (
          !isLoading && (
            <div className={classes.addGrpBtnDiv}>
              <Button
                variant="contained"
                className={classes.addGrpBtn}
                onClick={() => setShowAddGroupDialog(true)}
              >
                <PlusSquare className={classes.plusIcon} />
                Add New Group
              </Button>
            </div>
          )
        )}
        {showAddGroupDialog && (
          <AddGroupDialog
            type="create"
            openDialog={showAddGroupDialog}
            closeDialog={() => setShowAddGroupDialog(false)}
          />
        )}
      </div>
    </Slide>
  );
};
export default MembersView;
