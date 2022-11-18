import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';

const SubGuard: React.FC = () => {
  const { isLoading, isSubscribed } = useSelector(state => ({
    subscriptions: state.subscription.data,
    isLoading: state.subscription.isLoading,
    isSubscribed : state.account.isSubscribed
  }));

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isSubscribed) {
    return <Redirect to="/app/account" />;
  }

  return <Redirect to="/app/calendar" />;
};

export default SubGuard;
