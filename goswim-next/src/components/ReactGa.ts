import { useState, useEffect } from 'react';
import ReactGA from 'react-ga';

function initialiseAnalytics() {
  const TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  TRACKING_ID && ReactGA.initialize(TRACKING_ID);
}

function usePageTracking() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initialiseAnalytics();
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, [initialized, window.location]);
}

export default usePageTracking;
