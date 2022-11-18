import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import 'react-quill/dist/quill.snow.css'; // ES6
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(import('react-quill'), { ssr: false }); // imported dynamically to fix reference error

const useStyles = makeStyles(theme => ({
  root: {
    '& .ql-toolbar': {
      borderLeft: 'none',
      borderTop: 'none',
      borderRight: 'none',
      borderBottom: `1px solid ${theme.palette.divider}`,
      '& .ql-picker-label:hover': {
        color: theme.palette.secondary.main
      },
      '& .ql-picker-label.ql-active': {
        color: theme.palette.secondary.main
      },
      '& .ql-picker-item:hover': {
        color: theme.palette.secondary.main
      },
      '& .ql-picker-item.ql-selected': {
        color: theme.palette.secondary.main
      },
      '& button:hover': {
        color: theme.palette.secondary.main,
        '& .ql-stroke': {
          stroke: theme.palette.secondary.main
        }
      },
      '& button:focus': {
        color: theme.palette.secondary.main,
        '& .ql-stroke': {
          stroke: theme.palette.secondary.main
        }
      },
      '& button.ql-active': {
        '& .ql-stroke': {
          stroke: theme.palette.secondary.main
        }
      },
      '& .ql-stroke': {
        stroke: theme.palette.text.primary
      },
      '& .ql-picker': {
        color: theme.palette.text.primary
      },
      '& .ql-picker-options': {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
        border: 'none',
        boxShadow: theme.shadows[10],
        borderRadius: theme.shape.borderRadius
      }
    },
    '& .ql-container': {
      border: 'none',
      [theme.breakpoints.down('md')]: {
        height: '200px'
      },
      '& .ql-tooltip.ql-editing': {
        left: '10px !important'
      },
      '& .ql-editor': {
        fontFamily: theme.typography.fontFamily,
        fontSize: 16,
        color: theme.palette.text.primary,
        '&.ql-blank::before': {
          color: theme.palette.text.secondary
        }
      },
      '& .ql-tooltip': {
        left: '0 !important'
      }
    }
  },
  stepButton: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

function QuillEditor({ className, ...rest }) {
  const classes = useStyles();
  return <ReactQuill className={clsx(classes.root, className)} {...rest} />;
}

QuillEditor.propTypes = {
  className: PropTypes.string
};

export default QuillEditor;
