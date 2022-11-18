/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 * @file Team view information page
 * @author Pragadeeshwaran Jayapal
 * @since 02-06-2020
 */
import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  SvgIcon,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Circle from 'src/components/Circle';
import { ComponentProps } from 'src/types/components';
import { TeamDocument } from 'src/store/management/team';
import Avatar from 'src/components/Avatar';
import { brandThemeOptions } from 'src/constants';
import { getBrandColorPalette } from 'src/helpers/getBrandColor';

interface InfoViewProps {
  team: TeamDocument;
}

const useStyles = makeStyles(theme => ({
  colorThemeCellAllign: {
    paddingLeft: 15
  },
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium,
    width: '10rem'
  },
  tableCell: {
    paddingLeft: '5rem'
  },
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 100,
    width: 100,
    backgroundColor: 'transparent'
  },
  tableScroll: {
    overflowX: 'auto'
  }
}));

const InfoView: React.FC<ComponentProps & InfoViewProps> = ({ team, className, ...rest }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader title="Team Details" titleTypographyProps={{ variant: 'h4' }} />
      <Divider />
      <CardContent>
        <Grid container spacing={3} {...rest}>
          <Grid item xl={3} lg={4} md={4} xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" flexDirection="column" textAlign="center">
                  <label htmlFor="contained-button-file">
                    <Avatar
                      type="team"
                      variant="rectangle"
                      className={classes.avatar}
                      srcSet={(team?.brand_logo_url && team?.brand_logo_url) || ''}
                    />
                  </label>
                  <Typography
                    className={classes.name}
                    gutterBottom
                    variant="h3"
                    color="textPrimary"
                  >
                    {team.name}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={7} lg={8} md={8} xs={12}>
            <Card className={classes.tableScroll}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>Description</TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography variant="body2" color="textSecondary">
                        {team.description}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>Brand Theme</TableCell>
                    <TableCell className={classes.tableCell}>
                      <Box display="flex" alignItems="center">
                        <SvgIcon>
                          <Circle
                            color={getBrandColorPalette(
                              (team.brand_theme && team.brand_theme) || null
                            )}
                          />
                        </SvgIcon>
                        <Box>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            className={classes.colorThemeCellAllign}
                          >
                            {brandThemeOptions.find(datum => datum.value === team.brand_theme)
                              ?.title || brandThemeOptions[0].title}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>City</TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography variant="body2" color="textSecondary">
                        {team.city}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>State/Region</TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography variant="body2" color="textSecondary">
                        {team.state}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>Country</TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography variant="body2" color="textSecondary">
                        {team.country}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>Zipcode</TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography variant="body2" color="textSecondary">
                        {team.zipcode}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InfoView;
