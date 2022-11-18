/**
 * @todo local forage code commented for future use
 * @author Pavithran R
 * @since 06/06/2020
 */

import React, { Component, ErrorInfo } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Page from 'src/components/Page';
import { persistor, store } from 'src/store';
import { ThemeVariant } from 'src/constants';

class ErrorBoundary extends Component {
  public state = {
    hasError: false
  };

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public async componentDidCatch(error: Error, info: ErrorInfo) {
    await persistor.flush();
    await persistor.purge();
    console.error('ErrorBoundary caught an error', error, info);
  }

  public render() {
    const { variant } = store.getState().settings;
    const isLite = variant === ThemeVariant.LITE;
    const themeColor = isLite ? '#F5F5F5' : '#1c2025';
    const themeFontColor = isLite ? '#333333' : '#e6e5e8';
    if (this.state.hasError) {
      return (
        <Page
          style={{
            position: 'absolute',
            width: '100%',
            height: ' 100%',
            bottom: 0,
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: `${themeColor}`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '150px center'
          }}
          title="Error"
        >
          <Container maxWidth="lg">
            <Typography
              align="center"
              color="textPrimary"
              style={{ fontSize: '30px', color: themeFontColor }}
            >
              Oops! Something went wrong
            </Typography>
            <Box mt={6} display="flex" justifyContent="center">
              <img alt="Under development" src="/static/images/error.svg" width="70" />
            </Box>
            <Box mt={6} display="flex" justifyContent="center">
              <Button color="secondary" href="/" variant="contained" size="large">
                Back to home
              </Button>
            </Box>
          </Container>
        </Page>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
