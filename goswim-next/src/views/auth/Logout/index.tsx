import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { logout, updateCurrentTab } from 'src/store/account';
import { useEffect } from 'react';

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const handleClose = () => {
    dispatch(updateCurrentTab('general'));
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      history.push('/users/sign_in');
    } catch (error:any) {
      handleClose();
      enqueueSnackbar('Unable to logout', {
        variant: 'error'
      });
    }
  };
  useEffect(() => {
    handleLogout();
  }, []); //eslint-disable-line
  return null;
};

export default Logout;
