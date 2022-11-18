/** @todo certain functions has been removed so it may not work as expected please refer the previous commits to check the changes if needed
 *  @author Karthik Prakash S
 * @Date 13/08/2020
 */

import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import moment from 'moment';
import { ComponentProps } from 'src/types/components';
import getStatusLabel from 'src/helpers/getStatusLabel';
import { Status } from 'src/constants';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '-1.5rem',
    overflowX: 'auto'
  },
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium,
    width: '10rem'
  },
  tableCell: {
    paddingLeft: '5rem'
  }
}));

const InfoView: React.FC<ComponentProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { member } = useSelector(state => {
    return {
      member: state.members?.member
    };
  });

  const teams = member?.team || ``;

  /** @todo removed construct teams as it was not used anywhere except here please refer the previous commits to check the changes if needed
   *  @author Karthik Prakash S
   * @Date 13/08/2020
   */

  const retrieveLabel = (status?: string) => {
    switch (status) {
      case Status.ACTIVE.toLowerCase():
        return <span style={{ color: 'vividSkyBlue' }}>{Status.ACTIVE}</span>;

      case Status.TRAILING.toLocaleLowerCase():
        return <span style={{ color: 'heatWave' }}>{Status.TRAILING}</span>;

      default:
        return <span style={{ color: 'red' }}>{Status.INACTIVE}</span>;
    }
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader titleTypographyProps={{ variant: 'h4' }} title="Member Details" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Name</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {member?.full_name}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Account Name</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {member?.account_name}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Team</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {teams}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Roster Group</TableCell>
            <TableCell className={classes.tableCell}>
              {(member?.roster_group.map &&
                member?.roster_group.length > 0 &&
                member?.roster_group.map((roster, id) => {
                  return (
                    <Typography variant="body2" color="textSecondary" key={id}>
                      {roster}
                      <br />
                    </Typography>
                  );
                })) ||
                ''}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Role</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {member?.role || ``}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Can add Team</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {member?.can_add_team ? `Yes` : `No`}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Can Manage Current Teams</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {member?.can_manage_current_teams ? `Yes` : `No`}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Email</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {member?.email}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Phone</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {member?.phone}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Address 1</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {member?.address_line1}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Address 2</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {member?.address_line2}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>City</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {member?.city}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>State/Region</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {member?.state}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Country</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {member?.country}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Zipcode</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {member?.zipcode}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Sponsored</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {member?.sponsor_status
                  ? member?.trail_period
                    ? `${member.sponsor_status}, ${member.trail_period} Trial`
                    : member.sponsor_status
                  : 'No'}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Status</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {member?.status ? getStatusLabel(member.status) : ''}
                {member?.last_status_updated_timestamp
                  ? ` @ ${moment(member?.last_status_updated_timestamp).format(
                      'MMMM D[th], YYYY HH:MM:ss'
                    )}`
                  : ''}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Subscription Status</TableCell>
            <TableCell className={classes.tableCell}>
              <Typography variant="body2" color="textSecondary">
                {retrieveLabel(member?.subscription_status)}
                {member?.subscription_product
                  ? member?.subscription_product.includes('Yearly')
                    ? ' | Yearly Subscription'
                    : ' | Monthly Subscription'
                  : ''}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default InfoView;
