/**
 * Author: Soundhar Natarajan
 * Date: 19-05-2020
 * Reusable Generic Table Component
 */

import React, { ReactElement } from 'react';
import { Table, TableHead, TableBody, TableProps as MUITableProps } from '@mui/material';
import { ComponentProps } from 'src/types';

interface TableProps<H, B> extends MUITableProps {
  renderHead: (tableHead: H[]) => ReactElement;
  renderBody: (tableBody: B[]) => ReactElement[];
  headers: H[];
  body: B[];
  stickyHeader?: boolean;
}

/**
 * GenericTableFactory is a Factory Funtion which will give the flexibility of constructing table on your will.
 * @template H - Header type which will be passed as an array which u give in as headers.
 * @template B - Body type which will be passed as an array which u give in as body.
 */
const GenericTableFactory = <H, B>(): React.FC<TableProps<H, B> & ComponentProps> => ({
  renderBody,
  renderHead,
  className,
  headers,
  body,
  ...props
}) => (
  <Table {...props} className={className}>
    <TableHead>{renderHead(headers)}</TableHead>
    <TableBody>{renderBody(body)}</TableBody>
  </Table>
);

export default GenericTableFactory;
