import ReactGA from 'react-ga';
import {ANALYTICS_TRACKING_ID} from './analyticsConstants'

export const initializeAnalytics = () => {
  ReactGA.initialize(ANALYTICS_TRACKING_ID);
}

export const sendEngagementsAnalyticsEvent = (action) => {
  ReactGA.event({
    category: 'Engagements',
    action
  });
}