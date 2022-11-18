import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TableRow, TableCell, TextField, Box, IconButton, SvgIcon } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Check as CheckIcon, X as CloseIcon } from 'react-feather';
import { createOrUpdateEnum, SuggestionEditorProps, StrokesAndTypesProps } from 'src/store/enum';
import { ComponentProps } from 'src/types';
import TooltipComponent from 'src/components/Tooltip';
import { useCommonStyles } from 'src/styles/common';

/**
 * @todo need to remove redunancy
 */
const useStyles = makeStyles(() => ({
  tableCell: {
    maxWidth: 100,
    minWidth: 100
  }
}));

const AddNewRowComponent: React.FC<ComponentProps & SuggestionEditorProps> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const dispatch = useDispatch();
  const { handleSuggestionEditorVisible, type } = rest;
  const [newCommonData, setNewCommonData] = React.useState<StrokesAndTypesProps>({
    full_name: '',
    short_name: ''
  });

  const scrollBarRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    scrollBarRef.current?.focus();
  }, [scrollBarRef]);
  return (
    <TableRow hover>
      <TableCell className={classes.tableCell}>
        <TextField
          inputRef={scrollBarRef}
          id="name"
          label="Name"
          multiline
          value={newCommonData?.full_name || ''}
          onChange={event => {
            setNewCommonData({ ...newCommonData, full_name: event.target.value });
          }}
        />
      </TableCell>
      <TableCell className={classes.tableCell}>
        <TextField
          id="abbrevation"
          label="Abbrevation"
          value={newCommonData.short_name || ''}
          onChange={event => {
            setNewCommonData({ ...newCommonData, short_name: event.target.value });
          }}
        />
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        <Box ml={1.5}>
          <TooltipComponent title="Add">
            <IconButton
              className={commonClasses.colorSuccess}
              onClick={() => {
                handleSuggestionEditorVisible(false);
                const dispatchData = {
                  ...newCommonData,
                  enum_type: type,
                  status: 'success'
                };
                dispatchData && dispatch(createOrUpdateEnum(dispatchData));
              }}
              size="large">
              <SvgIcon fontSize="small">
                <CheckIcon />
              </SvgIcon>
            </IconButton>
          </TooltipComponent>
          <TooltipComponent title="Close">
            <IconButton
              className={commonClasses.colorError}
              onClick={() => {
                handleSuggestionEditorVisible(false);
                setNewCommonData({ full_name: '', short_name: '' });
              }}
              size="large">
              <SvgIcon fontSize="small">
                <CloseIcon />
              </SvgIcon>
            </IconButton>
          </TooltipComponent>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default AddNewRowComponent;
