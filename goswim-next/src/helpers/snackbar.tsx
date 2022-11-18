import React from 'react';
import { useSnackbar, WithSnackbarProps, OptionsObject } from 'notistack';

interface IProps {
  setUseSnackbarRef: (showSnackbar: WithSnackbarProps) => void;
}

const InnerSnackbarUtilsConfigurator: React.FC<IProps> = (props: IProps) => {
  props.setUseSnackbarRef(useSnackbar());
  return null;
};

let useSnackbarRef: WithSnackbarProps;

const setSnackbarRef = (useSnackbarRefProp: WithSnackbarProps) => {
  useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator: React.FC = () => (
  <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setSnackbarRef} />
);

export default {
  default(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: 'default' });
  },
  success(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: 'success' });
  },
  warning(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: 'warning' });
  },
  info(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: 'info' });
  },
  error(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: 'error' });
  },
  toast(msg: string, options: OptionsObject = {}) {
    useSnackbarRef?.enqueueSnackbar(msg, options);
  },
  close() {
    useSnackbarRef?.closeSnackbar();
  }
};
