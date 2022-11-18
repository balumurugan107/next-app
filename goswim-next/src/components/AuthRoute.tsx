import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

interface AuthRouteProps {
  component: React.ReactType;
  render: React.FC;
}

const AuthRoute: React.StatelessComponent<AuthRouteProps> = ({
  component: Component,
  render,
  ...rest
}) => {
  const account = useSelector(state => state.account);

  if (!account.isAuthenticated) {
    return <Redirect to="/users/sign_in" />;
  }

  return render ? render({ ...rest }) : <Component {...rest} />;
};

export default AuthRoute;
