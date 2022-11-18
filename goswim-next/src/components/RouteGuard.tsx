import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AccountType } from 'src/constants';

const RouteGuard: React.FC<{
  path?: string;
}> = ({ children, path }) => {
  const { disabledRoutes,isSubscribed,user } = useSelector(state => state.account);
  if (path && disabledRoutes.includes(path.replace(/:[^$]+$/gm, ''))) {
    return <Redirect to="/404" />;
  }
  if(!isSubscribed && (user?.role === AccountType.SWIMMER || user?.role === AccountType.COACH)){
    return <Redirect to="/" />;
  }

  return <>{children}</>;
};

export default RouteGuard;
