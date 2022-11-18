import React from 'react';
import TopBar from 'src/layouts/LandingLayout/TopBar';

const AuthLayout = ({ children }: any) => {
  return (
    <>
      <div className="auth-wrapper">
        <TopBar />
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
