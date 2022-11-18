import { TypeBackground, Theme } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  export interface TypeBackground {
    dark: string;
    light: string;
  }
}

declare module '@mui/material/styles/createMuiTheme' {
  export interface ApplicationThemes {
    heatWave: {
      lite: 'heatWaveLite';
      dark: 'heatWaveDark';
    };
    vividSkyBlue: {
      lite: 'vividSkyBlueLite';
      dark: 'vividSkyBlueDark';
    };
    sunglow: {
      lite: 'sunglowLite';
      dark: 'sunglowDark';
    };
    bleuDeFrance: {
      lite: 'bleuDeFranceLite';
      dark: 'bleuDeFranceDark';
    };
    paoloVeronese: {
      lite: 'paoloVeroneseLite';
      dark: 'paoloVeroneseDark';
    };
    turquoise: {
      lite: 'turquoiseLite';
      dark: 'turquoiseDark';
    };
    paradisePink: {
      lite: 'paradisePinkLite';
      dark: 'paradisePinkDark';
    };
    cyanProcess: {
      lite: 'cyanProcessLite';
      dark: 'cyanProcessDark';
    };
    sapphireBlue: {
      lite: 'sapphireBlueLite';
      dark: 'sapphireBlueDark';
    };
    maxBluePurple: {
      lite: 'maxBluePurpleLite';
      dark: 'maxBluePurpleDark';
    };
    fandango: {
      lite: 'fandangoLite';
      dark: 'fandangoDark';
    };
    amethyst: {
      lite: 'amethystLite';
      dark: 'amethystDark';
    };
    blue: {
      lite: 'blueLite';
      dark: 'blueDark';
    };
  }

  export interface Theme {
    name:
      | ApplicationThemes['heatWave']['lite']
      | ApplicationThemes['heatWave']['dark']
      | ApplicationThemes['vividSkyBlue']['lite']
      | ApplicationThemes['vividSkyBlue']['dark']
      | ApplicationThemes['sunglow']['lite']
      | ApplicationThemes['sunglow']['dark']
      | ApplicationThemes['bleuDeFrance']['lite']
      | ApplicationThemes['bleuDeFrance']['dark']
      | ApplicationThemes['paoloVeronese']['lite']
      | ApplicationThemes['paoloVeronese']['dark']
      | ApplicationThemes['turquoise']['lite']
      | ApplicationThemes['turquoise']['dark']
      | ApplicationThemes['paradisePink']['lite']
      | ApplicationThemes['paradisePink']['dark']
      | ApplicationThemes['cyanProcess']['lite']
      | ApplicationThemes['cyanProcess']['dark']
      | ApplicationThemes['sapphireBlue']['lite']
      | ApplicationThemes['sapphireBlue']['dark']
      | ApplicationThemes['maxBluePurple']['lite']
      | ApplicationThemes['maxBluePurple']['dark']
      | ApplicationThemes['fandango']['lite']
      | ApplicationThemes['fandango']['dark']
      | ApplicationThemes['amethyst']['lite']
      | ApplicationThemes['amethyst']['dark']
      | ApplicationThemes['blue']['lite']
      | ApplicationThemes['blue']['dark'];
  }

  export interface DeprecatedThemeOptions {
    name?: Theme['name'];
    PaperBackground?: { backgroundColor: string };
  }
}
