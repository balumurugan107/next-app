import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const useStyles = makeStyles(theme => ({
  containerWrapper: {
    marginBottom: theme.spacing(3)
    // padding: theme.spacing(3)
  },
  title: {
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.main,
    fontSize: '1.25rem'
  },
  description: {
    marginTop: theme.spacing(2),
    '& p': {
      fontSize: '0.875rem',
      fontWeight: 'normal',
      lineHeight: '1.4',
      marginBottom: '25px',
      color: theme.palette.text.secondary
    },
    '& a': {
      fontSize: '0.875rem',
      fontWeight: 'normal',
      lineHeight: '1.4',
      marginBottom: '25px',
      textDecoration: 'none',
      color: theme.palette.primary.main
    },
    '& ul': {
      marginLeft: theme.spacing(2),
      fontSize: '0.875rem',
      fontWeight: 'normal',
      lineHeight: '1.4',
      marginBottom: '25px',
      color: theme.palette.text.secondary
    },
    '& ol': {
      marginLeft: theme.spacing(2),
      fontSize: '0.875rem',
      fontWeight: 'normal',
      lineHeight: '1.4',
      marginBottom: '25px',
      color: theme.palette.text.secondary
    },
    '& h2': {
      fontSize: '1.125rem',
      fontWeight: 'normal',
      lineHeight: '1.5',
      textTransform: 'uppercase',
      margin: '0 0 0.75em',
      color: theme.palette.primary.main
    },

    '& h3': {
      fontSize: '1.125rem',
      fontWeight: 'normal',
      lineHeight: '1.3',
      textTransform: 'none',
      margin: '0 0 0.75em',
      color: theme.palette.text.secondary
    },

    '& h4': {
      fontSize: '1.125rem',
      fontWeight: 'normal',
      lineHeight: '1.4',
      textTransform: 'uppercase',
      margin: '0 0 0.75em',
      color: theme.palette.text.secondary
    },

    '& h6': {
      fontSize: '1.125rem',
      fontWeight: 'normal',
      lineHeight: '1.5',
      textTransform: 'uppercase',
      margin: '0 0 0.75em',
      color: theme.palette.text.secondary
    }
  },
  featuresWrapper: {
    padding: theme.spacing(3),
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
    '& p': {
      margin: '16px 0',
      color: theme.palette.text.secondary
    }
  }
}));

const MarkDownComponent = (props: { markDown: string; title: string }) => {
  const classes = useStyles();

  return (
    <Container className={classes.containerWrapper}>
      <Paper className={classes.featuresWrapper}>
        <Typography variant="h1" className={classes.title}>
          {props.title}
        </Typography>
        <ReactMarkdown
          children={props.markDown}
          className={classes.description}
          remarkPlugins={[remarkGfm]}
        />
      </Paper>
    </Container>
  );
};

export default MarkDownComponent;
