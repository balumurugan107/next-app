import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from 'src/store/account';
import { getTeamsList } from 'src/store/management/team';
import { ComponentProps } from 'src/types/components';
import AccountView from 'src/views/pages/AccountView/General/AccountView';

const General: React.FC<ComponentProps> = () => {

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getProfile()); 
    dispatch(getTeamsList()); 
  },[])

  const { userData, error, message, isSubmitting, lastUpdatedPictureTimestamp } = useSelector(
    state => ({
      userData: state.account.user,
      error: state.account.error,
      message: state.account.message,
      isSubmitting: state.account.isSubmitting,
      lastUpdatedPictureTimestamp: state.account.lastUpdatedPictureTimestamp
    })
  );

  return (
    <AccountView
      user={userData}
      lastUpdatedPictureTimestamp={lastUpdatedPictureTimestamp}
      error={error}
      message={message}
      isSubmitting={isSubmitting}
    />
  );
};

export default General;
