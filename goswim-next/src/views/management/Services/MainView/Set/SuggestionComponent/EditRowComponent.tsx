import React, { useMemo, useState, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ComponentProps } from 'src/types';
import { TableRow, TableCell, TextField, Box, IconButton, SvgIcon, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import _ from 'lodash';
import {
  createOrUpdateEnum,
  EnumResponseDocument,
  EnumResponse,
  deleteEnum,
  StrokesAndTypesProps
} from 'src/store/enum';
import {
  Edit as EditIcon,
  Trash2 as DeleteIcon,
  Check as CheckIcon,
  X as CloseIcon
} from 'react-feather';
import TooltipComponent from 'src/components/Tooltip';
import { useCommonStyles } from 'src/styles/common';

const useStyles = makeStyles(() => ({
  tableCell: {
    maxWidth: 100,
    minWidth: 100
  },
  actionTableCell: {
    width: 150
  }
}));
const dataQuery = (data: EnumResponseDocument, type: string) => {
  switch (type) {
    case 'intensity_enum':
      return data.intensity_enum;
    case 'stroke_enum':
      return data.stroke_enum;
    case 'action_enum':
      return data.action_enum;
    case 'equipment_enum':
      return data.equipment_enum;
    case 'course_enum':
      return data.course_enum;
    default:
      return null;
  }
};
interface EditComponentProps {
  type: string;
  enumSearchQuery: string;
}
export const EditRowComponent: FC<ComponentProps & EditComponentProps> = ({
  enumSearchQuery,
  className,
  ...rest
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const dispatch = useDispatch();
  const { type } = rest;
  const { enums } = useSelector(
    state => ({
      enums: state.enum.data
    }),
    _.isEqual
  );
  const data: EnumResponse[] = useMemo(() => enums && dataQuery(enums, type), [enums, type]) || [];
  const filteredData = (enumSearchQuery &&
    data?.filter(
      datum =>
        datum.full_name.toLowerCase().startsWith(enumSearchQuery) ||
        datum.short_name.toLowerCase().startsWith(enumSearchQuery)
    )) || [...data];

  const EnumData: FC<{ details: EnumResponse }> = ({ details }) => {
    const [isEdit, setEdit] = useState<boolean>(false);
    const [isDelete, setDelete] = useState<boolean>(false);
    const [editCommonData, setEditCommonData] = useState<StrokesAndTypesProps>(details);

    return isEdit ? (
      <TableRow hover key={details._id}>
        <TableCell className={classes.tableCell}>
          <TextField
            id="name"
            label="Name"
            multiline
            autoFocus
            value={editCommonData.full_name || ''}
            onChange={event => {
              setEditCommonData({ ...editCommonData, full_name: event.target.value });
            }}
          />
        </TableCell>
        <TableCell className={classes.tableCell}>
          <TextField
            id="abbrevation"
            label="Abbrevation"
            value={editCommonData.short_name || ''}
            onChange={event => {
              setEditCommonData({ ...editCommonData, short_name: event.target.value });
            }}
          />
        </TableCell>
        <TableCell className={classes.tableCell} align="center">
          <Box ml={1.5}>
            <TooltipComponent title="Add">
              <IconButton
                className={commonClasses.colorSuccess}
                onClick={() => {
                  setEdit(false);
                  setEditCommonData({ ...editCommonData });
                  const dispatchData = {
                    ...editCommonData,
                    status: 'success',
                    enum_type: details.enum_type,
                    _id: details._id
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
                  setEdit(false);
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
    ) : (
      <>
        {isDelete ? (
          <TableRow hover selected>
            <TableCell colSpan={2} className={classes.tableCell}>
              Are you sure you want to delete this item?
            </TableCell>
            <TableCell className={classes.actionTableCell} align="center">
              <Box ml={1.5}>
                <TooltipComponent title="Accept">
                  <IconButton
                    className={commonClasses.colorSuccess}
                    onClick={() => {
                      setEdit(false);
                      setDelete(false);
                      details && details._id && dispatch(deleteEnum(details._id));
                    }}
                    size="large">
                    <SvgIcon fontSize="small">
                      <CheckIcon />
                    </SvgIcon>
                  </IconButton>
                </TooltipComponent>
                <TooltipComponent title="Delete">
                  <IconButton
                    className={commonClasses.colorError}
                    onClick={() => {
                      setEdit(false);
                      setDelete(false);
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
        ) : (
          <TableRow hover>
            <TableCell className={classes.tableCell}>{details.full_name}</TableCell>
            <TableCell className={classes.tableCell}>{details.short_name}</TableCell>
            <TableCell className={classes.actionTableCell} align="center">
              <Box ml={1.5} display="flex" justifyContent="center">
                <TooltipComponent title="Edit">
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      setEdit(true);
                    }}
                    size="large">
                    <SvgIcon fontSize="small">
                      <EditIcon />
                    </SvgIcon>
                  </IconButton>
                </TooltipComponent>
                <TooltipComponent title="Delete">
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      setDelete(true);
                    }}
                    size="large">
                    <SvgIcon fontSize="small">
                      <DeleteIcon />
                    </SvgIcon>
                  </IconButton>
                </TooltipComponent>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </>
    );
  };

  return (
    <>
      {filteredData.length ? (
        filteredData.map(details => {
          return <EnumData key={details._id} details={details} />;
        })
      ) : (
        <TableRow hover>
          <TableCell colSpan={3} align="center">
            <Typography component="span">No Data Found</Typography>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
