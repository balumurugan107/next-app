import makeStyles from '@mui/styles/makeStyles';

export const useCommonStyles = makeStyles(theme => ({
  bounceIn: {
    animation: '$bounceIn .5s'
  },

  '@keyframes bounceIn': {
    '0%': {
      transform: 'scale(0.8)',
      opacity: 0
    },

    '100%': {
      transform: 'scale(1)',
      opacity: 1
    }
  },

  sunburstTooltip: {
    position: 'absolute',
    padding: '5px',
    background: 'white',
    border: '0px',
    borderRadius: '4px',
    pointerEvents: 'none'
  },

  cursorDisabled: {
    cursor: 'no-drop !important',
    opacity: 0.5
  },

  datePicker: {
    '& .DateRangePicker__Month': {
      margin: 0,
      color: theme.palette.secondary.main
    },
    '& .DateRangePicker__MonthHeaderLabel': {
      color: theme.palette.secondary.main
    },
    '& .DateRangePicker__MonthHeader': {
      fontFamily: 'Roboto',
      fontSize: 16,
      fondWeight: 'normal'
    },
    '& .DateRangePicker__Weekdays': {
      border: '1px solid red',
      fontFamily: 'Roboto',
      fontSize: 11,
      opacity: 0.38
    },
    '& .DateRangePicker': {
      marginBottom: '0px'
    }
  },

  datePickerText: {
    '.MuiPickersDay-day': {
      color: 'black'
    }
  },

  pointer: {
    cursor: 'pointer'
  },
  gridIcon1: {
    height: 38,
    width: 54,
    display: 'inline-flex !important',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridIcon2: {
    height: 38,
    width: 38,
    display: 'inline-flex !important',
    alignItems: 'center',
    justifyContent: 'center'
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 10,
    cursor: 'pointer',
    display: 'inline-block',
    marginRight: 12
  },
  completed: {
    backgroundColor: '#999999',
    borderRadius: 10,
    cursor: 'pointer',
    display: 'inline-block',
    marginRight: 12
  },
  cost: {
    fontSize: 18,
    width: 100,
    [theme.breakpoints.down('sm')]: { width: 'unset' },
    float: 'right',
    fontWeight: 800,
    '& .MuiInputAdornment-positionStart': {
      marginRight: 0
    }
  },
  inputResize: {
    fontSize: '1.25rem',
    fontWeight: 800,
    paddingRight: 4
  },
  mark: {
    width: 10,
    height: 10,
    border: '2px solid white',
    borderRadius: 10
  },
  titleh1: {
    fontSize: theme.spacing(3),
    color: theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
      fontSize: 18
    }
  },
  separator: {
    borderRight: '2px solid',
    height: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 4,
    borderRightColor: theme.palette.secondary.main
  },
  subHeader: {
    fontWeight: 800
  },
  serviceBox: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: { flexWrap: 'wrap' }
  },
  desc: {
    lineBreak: 'anywhere'
  },
  resize: {
    resize: 'vertical',
    paddingLeft: 4,
    paddingTop: 4,
    paddingRight: 50,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: 'unset'
    },
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.dark,
    border: '1px solid rgba(224, 224, 224, 1)',
    fontFamily: 'Roboto',
    '&:focus': {
      outline: 'none',
      border: '1px solid rgba(0,0,0,0.5)'
    }
  },
  pagination: {
    [theme.breakpoints.down('sm')]: { overflow: 'unset !important' }
  },
  modalBodyScroll: {
    '@media only screen  and (min-device-width: 414px)  and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape)': {
      overflowY: 'auto'
    },
    [theme.breakpoints.down('sm')]: {
      overflowY: 'auto'
    },
    '@media only screen  and (min-device-width: 375px)  and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape)': {
      //iphone X landscape
      maxHeight: '30rem',
      overflowY: 'auto'
    },
    '@media only screen  and (min-device-width: 375px)  and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape)': {
      maxHeight: '30rem',
      overflowY: 'auto'
    }
  },
  colorSuccess: {
    color: theme.palette.success.main
  },
  colorError: {
    color: theme.palette.error.main
  },
  notesIcons: {
    padding: '0.25rem',
    '& svg': {
      fontSize: '1.2rem'
    }
  },
  currency: {
    padding: '0.25rem',
    color: theme.palette.secondary.main,
    fontSize: '2rem',
    fontWeight: 500
  },
  cancelColor: {
    color: theme.palette.text.primary
  },
  svgIconScale: {
    height: '1.25em',
    width: '1.25em'
  }
}));
