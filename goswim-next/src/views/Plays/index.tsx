import React, { useEffect, useState } from 'react';
import { Box, Container, Slide, Card, Typography, Button, LinearProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from 'src/components/Page';
import { store } from 'src/store';
import config from 'src/config';

const useStyles = makeStyles(theme => ({
  root: {
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      },
      '.MuiTableCell-root': { borderBottom: 'none' }
    }
  },
  fullHeightCard: {
    height: '100%',
    boxShadow: 'none',
    background: theme.palette.background.paper,
    padding: 16,
    marginBottom: theme.spacing(3),
    minHeight: 'calc(100vh - 404px)'
  },
  PageTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1.25rem',
    color: theme.palette.text.primary,
    fontWeight: 500
  },
  cardContent: {
    margin: theme.spacing(4),
    display: 'flex',
    justifyContent: 'left'
  },
  downloadPlays: {
    margin: theme.spacing(4),
    display: 'flex',
    justifyContent: 'left',
    color: theme.palette.secondary.main
  }
}));

const Plays: React.FC = () => {
  const classes = useStyles();

  const [downloadURL, setDownloadURL] = useState<string>();



  useEffect(() => {
  
    fetch(`${config.api.default.url}/api/v1/goswim/downloadPlays`, {
      headers: { Authorization: `Bearer ${store?.getState()?.account?.token}` }
    })
      .then(res => {
        return res.blob();
      })
      .then(blob => {
        const csvURL = window.URL.createObjectURL(blob);
        setDownloadURL(csvURL);
        // Use `filename` here e.g. with file-saver:
        // saveAs(blob, filename);
      });
  }, []);

  const onDownload = () => {
    if(downloadURL){
    const link = document.createElement('a');
    link.download = `plays.csv`;
    link.href = downloadURL;
    link.click();
    }
  };

  return (
    <>
      <Slide direction="right" in mountOnEnter unmountOnExit>
        <Container>
          <Box mt={1}>
            <Typography variant="h1" className={classes.PageTitle}>
              PLAYS
            </Typography>
          </Box>

          <Box>
            <Card className={classes.fullHeightCard}>
              <Typography component="h6" variant="h4" className={classes.cardContent}>
                Download a list of video plays to track your progress.
              </Typography>

              {downloadURL && downloadURL !== '' && 
                <Button
                  variant="outlined"
                  className={classes.downloadPlays}
                  onClick={() => onDownload()}
                  size="small"
                >
                  Download Plays
                </Button>
               }
               { !downloadURL && 
                <LinearProgress />
               }
            </Card>
          </Box>
        </Container>
      </Slide>
    </>
  );
};

export default Plays;
