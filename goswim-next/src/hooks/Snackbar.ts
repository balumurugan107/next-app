/* Working on Custom Hook Snackbar - in progress */

import { useSnackbar, SnackbarMessage, OptionsObject } from 'notistack';

export const EnqueueSnackbar = (message: SnackbarMessage, options?: OptionsObject) => {
  const { enqueueSnackbar } = useSnackbar();
  return enqueueSnackbar(message, options);
};

export const CloseSnackbar = (key?: string | number) => {
  const { closeSnackbar } = useSnackbar();
  return closeSnackbar(key);
};
