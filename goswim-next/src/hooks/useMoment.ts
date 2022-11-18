import { useEffect } from 'react';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';

const useMoment = () => {
  const initialTimeZone = useSelector(state => state.account.settings.timeZone);
  const timeZone = initialTimeZone === '' ? moment.tz.guess() : initialTimeZone;
  useEffect(() => {
    moment.tz.setDefault(timeZone);
  }, [timeZone]);
  return moment;
};

export default useMoment;
