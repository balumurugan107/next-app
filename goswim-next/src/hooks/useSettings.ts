import { useContext } from 'react';
import SettingsContext from 'src/context/SettingsContext';

const useSettings = () => {
  const context = useContext(SettingsContext);

  return context;
};

export default useSettings;
