/* eslint-disable no-unused-expressions */
import React from 'react';
// import Link from 'next/link';

import { Button, Card } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import { ComponentProps } from 'src/types/components';
import Link from 'src/components/Link';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  Topcard: {
    height: 55,
    display: 'inline-flex',
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
    width: '100%',
    overflowX: 'auto',
    '& a': {
      fontSize: '0.875rem',
      padding: '0 10px',
      minWidth: 'initial',
      color: `${theme.palette.text.primary} !important`,
      textDecoration: 'none',
    },
    [theme.breakpoints.down('md')]: {
      '& a:nth-child(1)': {
        minWidth: '155px'
      }
    },
    [theme.breakpoints.up('sm')]: {
      '& a:nth-child(1)': {
        minWidth: '155px'
      }
    }
  },
  childOne: {
    width: '80%'
  },
  PageTitle: {
    margin: '20px',
    fontSize: '1.25rem',
    color: '#546E7A'
  },
  fullHeightCard: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    margin: 20,
    padding: 16
  },
  headerButton: {
    color: theme.palette.text.primary
  },
  button: {
    color: theme.palette.text.primary,
    '&.active': {
      color: `${theme.palette.secondary.main}`
    },
    height: '-webkit-fill-available'
  }
}));

const PanelHeader: React.FC<ComponentProps> = () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Card className={classes.Topcard}>
      <Link href="/app/admin/weeklythemes" prefetch={false}>
        <Button
          className={classes.button}
        >
          Weekly Themes
        </Button>
      </Link>
      <Link href="/app/admin/videos" prefetch={false}>
        <Button
          className={classes.button}
        >
          Videos
        </Button>
      </Link>
      <Link href="/app/admin/lessons" prefetch={false}>
        <Button
          className={classes.button}
        >
          Lessons
        </Button>
      </Link>
      <Link href="/app/admin/courses" prefetch={false}>
        <Button
          className={classes.button}
        >
          Courses
        </Button>
      </Link>
      <Link href="/app/admin/all-members" prefetch={false}>
        <Button
          className={classes.button}
        >
          Users
        </Button>
      </Link>
      <Link href="/app/admin/statistics" prefetch={false}>
        <Button
          className={classes.button}
        >
          Statistics
        </Button>
      </Link>
      {false && (
        <Link href="/app/admin/specialgroups" prefetch={false}>
          <Button
            className={classes.button}
          >
            Special Groups
          </Button>
        </Link>
      )}
    </Card>
  );
};

export default PanelHeader;
