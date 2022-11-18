import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import ListItem from 'src/views/management/Members/MainViewV1/Result/ListItem';
import { ComponentProps } from 'src/types';
import { ListProps } from 'src/views/management/Members/MainViewV1/Result/types';
import { TableCell, TableRow} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  noData:{
    margin: '56px auto',
    maxWidth: '50%',
    textAlign: 'center'
  },
  noDataPic:{
    display: 'block',
    margin:'auto',
    height: '125px'
  },
  noDataMessage: {
    color:theme.palette.text.secondary,
    margin: '10px',
    marginTop: theme.spacing(3),
    fontSize: '1rem'
  },
  helperMessage:{
    color: theme.palette.text.secondary,
    fontWeight: 400,
    fontSize: '0.875rem'
  }
}))
const List: React.FC<ComponentProps & ListProps> = ({ currentSelectedTeams }) => {
  // Listen for member Data.
  const classes = useStyles();
  const members = useSelector(state => state.members.data, _.isEqual);
  const isLoading = useSelector(state => state.members.isLoading);

  const selectedMembers = useSelector(state => state.members.selectedMembers, _.isEqual);
  const settings = useSelector(state => state.settings);
  const jsx = members.length
    ? members?.map((member, index) => (
      <ListItem
        {...{
          member,
          currentSelectedTeams,
          isMemberSelected: selectedMembers.includes(member._id),
          selectedMembers
        }}
        key={index}
      />
    ))
    : !isLoading && (
      <TableRow>
        <TableCell colSpan={12} align="center">
          {/* <Typography>No Members found</Typography> */}
          <div className={classes.noData}>
            <img src={settings.variant === 'dark' ? "/static/images/noresults/member-dark.svg" : "/static/images/noresults/member-light.svg"}
              alt="no lessons found" className={classes.noDataPic} />
            <h2 className={classes.noDataMessage}>No members found</h2>
          </div>
        </TableCell>
      </TableRow>
    );
  return <>{jsx}</>;
};

export default List;
