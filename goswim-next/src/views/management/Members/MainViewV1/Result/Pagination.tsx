import React from 'react';
import { ComponentProps } from 'src/types';
import { TablePagination } from '@mui/material';
import { useSelector } from 'react-redux';
import { useCommonStyles } from 'src/styles/common';

interface PaginationProps {
  handlePageChange: (_: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  handleLimitChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  page: number;
  limit: number;
}

const Pagination: React.FC<ComponentProps & PaginationProps> = ({
  handlePageChange,
  handleLimitChange,
  page,
  limit
}) => {
  const length = useSelector(state => state.members.length);
  const isDisabled = useSelector(state => state.members.onlyPrev);
  const commonClasses = useCommonStyles();
  return (
    <TablePagination
      component="div"
      count={length}
      className={commonClasses.pagination}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleLimitChange}
      page={page}
      rowsPerPage={limit}
      rowsPerPageOptions={[20, 50, 100]}
      SelectProps={{ inputProps: { native: 'true', disabled: isDisabled } }}
    />
  );
};

export default Pagination;
