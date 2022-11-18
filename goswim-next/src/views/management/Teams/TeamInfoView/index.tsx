/**
 * @file Team View Information index page
 * @author Pragadeeshwaran Jayapal
 * @since 02-06-2020
 */
import React from 'react';
import { Container, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import Page from 'src/components/Page';
import { ComponentProps } from 'src/types/components';
import useGetTeam from 'src/hooks/useGetTeam';
import InfoView from 'src/views/management/Teams/TeamInfoView/InfoView';
import Header from 'src/views/management/Teams/TeamInfoView/Header';

interface RouteParams {
  teamId: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const Details: React.FC<ComponentProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { teamId } = useRouter().query;
  const team = useGetTeam(teamId || '');

  return (
    <Page className={classes.root} title="Team info">
      <Container>
        <Header />
        <Box {...rest}>{team && <InfoView team={team} />}</Box>
      </Container>
    </Page>
  );
};

export default Details;
