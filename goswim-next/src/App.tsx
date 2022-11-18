import React from 'react';
import { Router } from 'react-router-dom';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { SnackbarProvider, ProviderContext } from 'notistack';
import { ThemeProvider, Theme } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import jssPreset from '@mui/styles/jssPreset';
import makeStyles from '@mui/styles/makeStyles';
import StylesProvider from '@mui/styles/StylesProvider';
import { X as ClearIcon } from 'react-feather';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useSelector } from 'react-redux';
import Auth from 'src/components/Auth';
import ScrollReset from 'src/components/ScrollReset';
import { createTheme } from 'src/theme';
import Routes from 'src/Routes';
import { SnackbarUtilsConfigurator } from 'src/helpers/snackbar';
import IconButton from '@mui/material/IconButton';
import MomentUtils from '@date-io/moment';
import { createBrowserHistory } from 'history';
import usePageTracking from './components/ReactGa';
declare module '@mui/styles/' {
  interface DefaultTheme extends Theme {}
}

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const history = createBrowserHistory();
const useStyles = makeStyles(theme =>
  createStyles({
    '@global': {
      '*::-webkit-scrollbar': {
        width: 6,
        height: 6
      },

      '*::-webkit-scrollbar-track': {
        backgroundColor: '#f0f0f0'
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.3)',
        borderRadius: '10px'
      },

      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%'
      },
      body: {
        fontFamily: 'Roboto,sans-serif',
        height: '100%',
        width: '100%',
        scrollBehavior: 'smooth'
      },
      '#root': {
        height: '100%',
        width: '100%'
      },
      ul: {
        '&.CodeMirror-hints': {
          maxHeight: '200px',
          border: '#f5f5f5',
          overflow: 'auto'
        },
        '& .suggestion-par': {
          backgroundColor: 'transparent !important',
          paddingTop: 5,
          paddingBottom: 5,
          cursor: 'pointer'
        },
        '& li': {
          '&.CodeMirror-hint-active': {
            backgroundColor: 'rgba(0, 0, 0, 0.08) !important',
            color: '#000 !important'
          }
        },
        '& .CodeMirror-hint': {
          color: '#333 !important',
          fontFamily: 'Roboto',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04) !important',
            color: '#000 !important'
          }
        },
        '& .swimmer-suggestion': {
          '& *': {
            cursor: 'pointer'
          }
        },
        '& .sug-head': {
          padding: '5px 4px',
          '& img': {
            float: 'right',
            position: 'relative',
            top: '-5px',
            cursor: 'pointer'
          }
        }
      }
    },
  })
);

export const App = () => {
  const classes = useStyles();
  const settings = useSelector(state => state.settings);
  const notistackRef = React.useRef<SnackbarProvider | null>(null);
  const onClickDismiss = (key: string | number) => () => {
    if (notistackRef.current) {
      notistackRef.current.closeSnackbar(key);
    }
  };

  // React Ga
  usePageTracking();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(settings)}>
        <StylesProvider jss={jss}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <SnackbarProvider
              preventDuplicate
              maxSnack={1}
              ref={notistackRef}
              action={key => (
                <IconButton onClick={onClickDismiss(key)} size="large">
                  <ClearIcon size="20" color="white" />
                </IconButton>
              )}
              transitionDuration={{appear: 500}}
            >
              <SnackbarUtilsConfigurator />
              <Router history={history}>
                <Auth>
                  <ScrollReset />
                  <Routes />
                </Auth>
              </Router>
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </StylesProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
