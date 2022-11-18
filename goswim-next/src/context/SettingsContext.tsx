import React, { createContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { store } from 'src/store';
import { setSettings, SettingsState } from 'src/store/settings';

const defaultSettings: SettingsState = {
  ...store.getState().settings
};

interface SettingsContext {
  settings: SettingsState;
  saveSettings: (updaetedSettings: Partial<SettingsState>) => void;
}

const SettingsContext = createContext<SettingsContext>({
  settings: defaultSettings,
  saveSettings: () => {}
});

export const SettingsProvider: React.FC = ({ children }) => {
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  const handleSaveSettings = (updatedSettings = {}) => {
    const mergedSettings = { ...settings, ...updatedSettings };

    dispatch(setSettings(mergedSettings));
  };

  useEffect(() => {
    document.dir = settings.direction;
  }, [settings]);

  return (
    <SettingsContext.Provider
      value={{
        settings: { ...settings },
        saveSettings: handleSaveSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
