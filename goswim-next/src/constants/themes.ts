// import { ApplicationThemes } from '@mui/material/styles';
import { SelectOption } from 'src/types';
import { Colours } from 'src/constants/common';

export const appThemes: any = {
  heatWave: {
    lite: 'heatWaveLite',
    dark: 'heatWaveDark'
  },
  vividSkyBlue: {
    lite: 'vividSkyBlueLite',
    dark: 'vividSkyBlueDark'
  },
  sunglow: {
    lite: 'sunglowLite',
    dark: 'sunglowDark'
  },
  bleuDeFrance: {
    lite: 'bleuDeFranceLite',
    dark: 'bleuDeFranceDark'
  },
  paoloVeronese: {
    lite: 'paoloVeroneseLite',
    dark: 'paoloVeroneseDark'
  },
  turquoise: {
    lite: 'turquoiseLite',
    dark: 'turquoiseDark'
  },
  paradisePink: {
    lite: 'paradisePinkLite',
    dark: 'paradisePinkDark'
  },
  cyanProcess: {
    lite: 'cyanProcessLite',
    dark: 'cyanProcessDark'
  },
  sapphireBlue: {
    lite: 'sapphireBlueLite',
    dark: 'sapphireBlueDark'
  },
  maxBluePurple: {
    lite: 'maxBluePurpleLite',
    dark: 'maxBluePurpleDark'
  },
  fandango: {
    lite: 'fandangoLite',
    dark: 'fandangoDark'
  },
  amethyst: {
    lite: 'amethystLite',
    dark: 'amethystDark'
  },
  blue: {
    lite: 'blueLite',
    dark: 'blueDark'
  }
};

export enum BrandThemeColors {
  HEAT_WAVE = 'Heat Wave',
  VIVID_SKY_BLUE = 'Vivid Sky Blue',
  SUNGLOW = 'Broom',
  BLEU_DE_FRANCE = 'Light Slate Blue',
  PAOLO_VERONESE = 'Paolo Veronese',
  TURQUOISE = 'Turquoise',
  PARADISE_PINK = 'Paradise Pink',
  CYAN_PROCESS = 'Cyan Process',
  SAPPHIRE_BLUE = 'Sapphire Blue',
  MAX_BLUE_PURPLE = 'Max Blue Purple',
  FANDANGO = 'Fandango',
  AMETHYST = 'Amethyst'
}

export const brandThemeOptions: SelectOption[] = [
  {
    title: BrandThemeColors.HEAT_WAVE,
    value: Colours.HEAT_WAVE
  },
  {
    title: BrandThemeColors.VIVID_SKY_BLUE,
    value: Colours.VIVID_SKY_BLUE
  },
  {
    title: BrandThemeColors.SUNGLOW,
    value: Colours.SUNGLOW
  },
  {
    title: BrandThemeColors.BLEU_DE_FRANCE,
    value: Colours.BLEU_DE_FRANCE
  },
  {
    title: BrandThemeColors.PAOLO_VERONESE,
    value: Colours.PAOLO_VERONESE
  },
  {
    title: BrandThemeColors.TURQUOISE,
    value: Colours.TURQUOISE
  },
  {
    title: BrandThemeColors.PARADISE_PINK,
    value: Colours.PARADISE_PINK
  },
  {
    title: BrandThemeColors.CYAN_PROCESS,
    value: Colours.CYAN_PROCESS
  },
  {
    title: BrandThemeColors.SAPPHIRE_BLUE,
    value: Colours.SAPPHIRE_BLUE
  },
  {
    title: BrandThemeColors.MAX_BLUE_PURPLE,
    value: Colours.MAX_BLUE_PURPLE
  },
  {
    title: BrandThemeColors.FANDANGO,
    value: Colours.FANDANGO
  },
  {
    title: BrandThemeColors.AMETHYST,
    value: Colours.AMETHYST
  }
];
