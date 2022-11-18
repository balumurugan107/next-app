import React from 'react';
import { TableRow, TableCell, Table, TableHead, TableBody, TableContainer } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { EditRowComponent } from 'src/views/management/Services/MainView/Set/SuggestionComponent/EditRowComponent';
import AddNewRowComponent from 'src/views/management/Services/MainView/Set/SuggestionComponent/AddNewRowComponent';

const useStyles = makeStyles(() => ({
  table: {
    maxHeight: 300,
    marginTop: 20
  },
  tableCell: {
    maxWidth: 100,
    minWidth: 100
  },
  actionTableCell: {
    width: 150
  }
}));
interface CommonComponentProps {
  type: string;
  isSugestionEditorVisible: boolean;
  enumSearchQuery: string;
  handleSuggestionEditorVisible(state: boolean): void;
}
const CommonComponent: React.FC<CommonComponentProps> = ({
  type,
  isSugestionEditorVisible,
  enumSearchQuery,
  handleSuggestionEditorVisible
}) => {
  const classes = useStyles();

  return (
    <>
      <TableContainer className={classes.table}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>Name</TableCell>
              <TableCell className={classes.tableCell}>Abbrevation</TableCell>
              <TableCell className={classes.actionTableCell} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isSugestionEditorVisible && (
              <AddNewRowComponent {...{ type, handleSuggestionEditorVisible }} />
            )}
            {<EditRowComponent {...{ type, enumSearchQuery }} />}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CommonComponent;
