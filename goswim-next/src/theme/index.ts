import _ from 'lodash';
import { DeprecatedThemeOptions, createTheme as createMuiTheme } from '@mui/material/styles';
import { alpha, colors, responsiveFontSizes } from '@mui/material';
import { SettingsState } from 'src/store/settings';
import {
  appThemes,
  ColourCode,
  SecondaryColourCode,
  BrandColorPalette,
  ThemeVariant,
  Direction
} from 'src/constants';
import typography from 'src/theme/typography';
import { softShadows, strongShadows } from 'src/theme/shadows';

const baseConfig: DeprecatedThemeOptions = {
  direction: 'ltr',
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden'
      }
    },
    MuiAvatar: {
      img: {
        objectFit: 'contain'
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32
      }
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)'
      }
    }
  }
};

const themeConfigs: any[] = [
  {
    name: appThemes.heatWave.lite,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }
      }
    },
    palette: {
      mode: 'light',
      action: {
        /* For all event actions */
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.38)', // 'rgba(0,0,0,0.26)':old
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: 'rgba(0, 0, 0, 0.12)'
      },
      background: {
        default: '#FFFFFF' /* Inner background and graph content color */,
        // // dark: '#E5E5E5' /* Whole theme backdrop color */,
        dark: '#f8f8fb' /* Whole theme backdrop color */,
        paper: '#FFFFFF' /* Sidebar and inner content card background color */
      },
      primary: {
        main: ColourCode.HEAT_WAVE,
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: SecondaryColourCode.HEAT_WAVE,
        contrastText: '#FFFFFF'
      },
      text: {
        primary: '#243237' /* Inner content text */,
        secondary: '#546E7A' /* Sidebar and main text */
      }
    },
    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  },
  {
    name: appThemes.heatWave.dark,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(40, 44, 52, 0.75)'
        }
      }
    },
    palette: {
      mode: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.5)', // 'rgba(255, 255, 255, 0.26)':old
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34'
      },
      primary: {
        main: '#EC7969',
        contrastText: '#1c2025'
      },
      secondary: {
        main: '#ef705f',
        contrastText: '#1c2025'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      }
    },
    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  },
  {
    name: appThemes.blue.lite,
    overrides: {
      MuiInputBase: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: colors.blueGrey[600]
          }
        }
      },
      MuiCard: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }
      }
    },
    palette: {
      mode: 'light',
      action: {
        active: colors.blueGrey[600]
      },
      background: {
        default: '#FFFFFF' /* Inner background and graph content color */,
        // dark: '#E5E5E5' /* Whole theme backdrop color */,
        dark: '#f8f8fb' /* Whole theme backdrop color */,
        paper: '#FFFFFF' /* Sidebar and inner content card background color */
      },
      primary: {
        main: colors.indigo[600],
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#5850EC',
        contrastText: '#FFFFFF'
      },
      text: {
        primary: '#243237' /* Inner content text */,
        secondary: '#546E7A' /* Sidebar and main text */
      }
    },
    shadows: softShadows,
    PaperBackground: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  },
  {
    name: appThemes.blue.dark,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(40, 44, 52, 0.75)'
        }
      }
    },
    palette: {
      mode: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34'
      },
      primary: {
        main: '#8a85ff',
        contrastText: '#1c2025'
      },
      secondary: {
        main: '#8a85ff',
        contrastText: '#1c2025'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      }
    },
    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(40, 44, 52, 0.75)'
    }
  },
  {
    name: appThemes.vividSkyBlue.lite,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }
      }
    },
    palette: {
      mode: 'light',
      action: {
        /* For all event actions */
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: 'rgba(0, 0, 0, 0.12)'
      },
      background: {
        default: '#FFFFFF' /* Inner background and graph content color */,
        // dark: '#E5E5E5' /* Whole theme backdrop color */,
        dark: '#f8f8fb' /* Whole theme backdrop color */,
        paper: '#FFFFFF' /* Sidebar and inner content card background color */
      },

      primary: {
        main: ColourCode.VIVID_SKY_BLUE /* Header and main content background and text color */,
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: SecondaryColourCode.VIVID_SKY_BLUE /* Inner content background and text color */,
        contrastText: '#FFFFFF'
      },
      text: {
        primary: '#243237' /* Inner content text */,
        secondary: '#546E7A' /* Sidebar and main text */
      }
    },
    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  },
  {
    name: appThemes.bleuDeFrance.lite,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }
      }
    },
    palette: {
      mode: 'light',
      action: {
        /* For all event actions */
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: 'rgba(0, 0, 0, 0.12)'
      },
      background: {
        default: '#FFFFFF' /* Inner background and graph content color */,
        // dark: '#E5E5E5' /* Whole theme backdrop color */,
        dark: '#f8f8fb' /* Whole theme backdrop color */,
        paper: '#FFFFFF' /* Sidebar and inner content card background color */
      },
      primary: {
        main: ColourCode.BLEU_DE_FRANCE /* Header and main content background and text color */,
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: SecondaryColourCode.BLEU_DE_FRANCE /* Inner content background and text color */,
        contrastText: '#FFFFFF'
      },
      text: {
        primary: '#243237' /* Inner content text */,
        secondary: '#546E7A' /* Sidebar and main text */
      }
    },

    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  },
  {
    name: appThemes.sunglow.lite,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }
      }
    },
    palette: {
      mode: 'light',
      action: {
        /* For all event actions */
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: 'rgba(0, 0, 0, 0.12)'
      },
      background: {
        default: '#FFFFFF' /* Inner background and graph content color */,
        // dark: '#E5E5E5' /* Whole theme backdrop color */,
        dark: '#f8f8fb' /* Whole theme backdrop color */,
        paper: '#FFFFFF' /* Sidebar and inner content card background color */
      },
      primary: {
        main: ColourCode.SUNGLOW,
        contrastText: '#FFFFFF'
        /* Header and main content background and text color */
      },
      secondary: {
        main: SecondaryColourCode.SUNGLOW /* Inner content background and text color */,
        contrastText: '#FFFFFF'
      },
      text: {
        primary: '#243237' /* Inner content text */,
        secondary: '#546E7A' /* Sidebar and main text */
      }
    },

    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  },
  {
    name: appThemes.paoloVeronese.lite,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }
      }
    },
    palette: {
      mode: 'light',
      action: {
        /* For all event actions */
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: 'rgba(0, 0, 0, 0.12)'
      },
      background: {
        default: '#FFFFFF' /* Inner background and graph content color */,
        // dark: '#E5E5E5' /* Whole theme backdrop color */,
        dark: '#f8f8fb' /* Whole theme backdrop color */,
        paper: '#FFFFFF' /* Sidebar and inner content card background color */
      },
      primary: {
        main: ColourCode.PAOLO_VERONESE,
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: SecondaryColourCode.PAOLO_VERONESE,
        contrastText: '#FFFFFF'
      },
      text: {
        primary: '#243237' /* Inner content text */,
        secondary: '#546E7A' /* Sidebar and main text */
      }
    },

    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  },
  {
    name: appThemes.turquoise.lite,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }
      }
    },
    palette: {
      mode: 'light',
      action: {
        /* For all event actions */
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: 'rgba(0, 0, 0, 0.12)'
      },
      background: {
        default: '#FFFFFF' /* Inner background and graph content color */,
        // dark: '#E5E5E5' /* Whole theme backdrop color */,
        dark: '#f8f8fb' /* Whole theme backdrop color */,
        paper: '#FFFFFF' /* Sidebar and inner content card background color */
      },
      primary: {
        main: ColourCode.TURQUOISE,
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: SecondaryColourCode.TURQUOISE,
        contrastText: '#FFFFFF'
      },
      text: {
        primary: '#243237' /* Inner content text */,
        secondary: '#546E7A' /* Sidebar and main text */
      }
    },

    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  },
  {
    name: appThemes.paradisePink.lite,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }
      }
    },
    palette: {
      mode: 'light',
      action: {
        /* For all event actions */
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: 'rgba(0, 0, 0, 0.12)'
      },
      background: {
        default: '#FFFFFF' /* Inner background and graph content color */,
        // dark: '#E5E5E5' /* Whole theme backdrop color */,
        dark: '#f8f8fb' /* Whole theme backdrop color */,
        paper: '#FFFFFF' /* Sidebar and inner content card background color */
      },
      primary: {
        main: ColourCode.PARADISE_PINK,
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: SecondaryColourCode.PARADISE_PINK,
        contrastText: '#FFFFFF'
      },
      text: {
        primary: '#243237' /* Inner content text */,
        secondary: '#546E7A' /* Sidebar and main text */
      }
    },

    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  },
  {
    name: appThemes.cyanProcess.lite,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }
      }
    },
    palette: {
      mode: 'light',
      action: {
        /* For all event actions */
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: 'rgba(0, 0, 0, 0.12)'
      },
      background: {
        default: '#FFFFFF' /* Inner background and graph content color */,
        // dark: '#E5E5E5' /* Whole theme backdrop color */,
        dark: '#f8f8fb' /* Whole theme backdrop color */,
        paper: '#FFFFFF' /* Sidebar and inner content card background color */
      },
      primary: {
        main: ColourCode.CYAN_PROCESS,
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: SecondaryColourCode.CYAN_PROCESS,
        contrastText: '#FFFFFF'
      },
      text: {
        primary: '#243237' /* Inner content text */,
        secondary: '#546E7A' /* Sidebar and main text */
      }
    },

    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  },
  {
    name: appThemes.sapphireBlue.lite,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }
      }
    },
    palette: {
      mode: 'light',
      action: {
        /* For all event actions */
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.38)', //'rgba(0, 0, 0, 0.26)' :old
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: 'rgba(0, 0, 0, 0.12)'
      },
      background: {
        default: '#FFFFFF' /* Inner background and graph content color */,
        // dark: '#E5E5E5' /* Whole theme backdrop color */,
        dark: '#f8f8fb' /* Whole theme backdrop color */,
        paper: '#FFFFFF' /* Sidebar and inner content card background color */,
        light: alpha(ColourCode.SAPPHIRE_BLUE, 0.15)
      },
      primary: {
        main: ColourCode.SAPPHIRE_BLUE,
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: SecondaryColourCode.SAPPHIRE_BLUE,
        contrastText: '#FFFFFF'
      },
      text: {
        primary: '#243237' /* Inner content text */,
        secondary: '#45575E' /* Sidebar and main text */
      },
      info: {
        main: '#f3f7fa'
      },
      error: {
        main: '#d32f2f'
      }
    },

    shadows: softShadows,
    PaperBackground: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  },
  {
    name: appThemes.maxBluePurple.lite,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }
      }
    },
    palette: {
      mode: 'light',
      action: {
        /* For all event actions */
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: 'rgba(0, 0, 0, 0.12)'
      },
      background: {
        default: '#FFFFFF' /* Inner background and graph content color */,
        // dark: '#E5E5E5' /* Whole theme backdrop color */,
        dark: '#f8f8fb' /* Whole theme backdrop color */,
        paper: '#FFFFFF' /* Sidebar and inner content card background color */
      },
      primary: {
        main: ColourCode.MAX_BLUE_PURPLE,
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: SecondaryColourCode.MAX_BLUE_PURPLE,
        contrastText: '#FFFFFF'
      },
      text: {
        primary: '#243237' /* Inner content text */,
        secondary: '#546E7A' /* Sidebar and main text */
      }
    },

    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  },
  {
    name: appThemes.fandango.lite,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }
      }
    },
    palette: {
      mode: 'light',
      action: {
        /* For all event actions */
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: 'rgba(0, 0, 0, 0.12)'
      },
      background: {
        default: '#FFFFFF' /* Inner background and graph content color */,
        // dark: '#E5E5E5' /* Whole theme backdrop color */,
        dark: '#f8f8fb' /* Whole theme backdrop color */,
        paper: '#FFFFFF' /* Sidebar and inner content card background color */
      },
      primary: {
        main: ColourCode.FANDANGO,
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: SecondaryColourCode.FANDANGO,
        contrastText: '#FFFFFF'
      },
      text: {
        primary: '#243237' /* Inner content text */,
        secondary: '#546E7A' /* Sidebar and main text */
      }
    },

    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  },
  {
    name: appThemes.amethyst.lite,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }
      }
    },
    palette: {
      mode: 'light',
      action: {
        /* For all event actions */
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: 'rgba(0, 0, 0, 0.12)'
      },
      background: {
        default: '#FFFFFF' /* Inner background and graph content color */,
        // dark: '#E5E5E5' /* Whole theme backdrop color */,
        dark: '#f8f8fb' /* Whole theme backdrop color */,
        paper: '#FFFFFF' /* Sidebar and inner content card background color */
      },
      primary: {
        main: ColourCode.AMETHYST,
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: SecondaryColourCode.AMETHYST,
        contrastText: '#FFFFFF'
      },
      text: {
        primary: '#243237' /* Inner content text */,
        secondary: '#546E7A' /* Sidebar and main text */
      }
    },

    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  },
  {
    name: appThemes.heatWave.dark,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(40, 44, 52, 0.75)'
        }
      }
    },
    palette: {
      mode: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34'
      },
      primary: {
        main: ColourCode.HEAT_WAVE,
        contrastText: '#1c2025'
      },
      secondary: {
        main: SecondaryColourCode.HEAT_WAVE,
        contrastText: '#1c2025'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      }
    },
    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  },
  {
    name: appThemes.vividSkyBlue.dark,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(40, 44, 52, 0.75)'
        }
      }
    },
    palette: {
      mode: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34'
      },
      primary: {
        main: ColourCode.VIVID_SKY_BLUE,
        contrastText: '#1c2025'
      },
      secondary: {
        main: SecondaryColourCode.VIVID_SKY_BLUE,
        contrastText: '#1c2025'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      }
    },
    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(40, 44, 52, 0.75)'
    }
  },
  {
    name: appThemes.bleuDeFrance.dark,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(40, 44, 52, 0.75)'
        }
      }
    },
    palette: {
      mode: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34'
      },
      primary: {
        main: ColourCode.BLEU_DE_FRANCE,
        contrastText: '#1c2025'
      },
      secondary: {
        main: SecondaryColourCode.BLEU_DE_FRANCE,
        contrastText: '#1c2025'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      }
    },
    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(40, 44, 52, 0.75)'
    }
  },
  {
    name: appThemes.sunglow.dark,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(40, 44, 52, 0.75)'
        }
      }
    },
    palette: {
      mode: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34'
      },
      primary: {
        main: ColourCode.SUNGLOW,
        contrastText: '#1c2025'
      },
      secondary: {
        main: SecondaryColourCode.SUNGLOW,
        contrastText: '#1c2025'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      }
    },
    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(40, 44, 52, 0.75)'
    }
  },
  {
    name: appThemes.paoloVeronese.dark,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(40, 44, 52, 0.75)'
        }
      }
    },
    palette: {
      mode: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34'
      },
      primary: {
        main: ColourCode.PAOLO_VERONESE,
        contrastText: '#1c2025'
      },
      secondary: {
        main: SecondaryColourCode.PAOLO_VERONESE,
        contrastText: '#1c2025'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      }
    },
    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(40, 44, 52, 0.75)'
    }
  },
  {
    name: appThemes.turquoise.dark,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(40, 44, 52, 0.75)'
        }
      }
    },
    palette: {
      mode: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34'
      },
      primary: {
        main: ColourCode.TURQUOISE,
        contrastText: '#1c2025'
      },
      secondary: {
        main: SecondaryColourCode.TURQUOISE,
        contrastText: '#1c2025'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      }
    },
    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(40, 44, 52, 0.75)'
    }
  },
  {
    name: appThemes.paradisePink.dark,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(40, 44, 52, 0.75)'
        }
      }
    },
    palette: {
      mode: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34',
        light: '#F0F5F6'
      },
      primary: {
        main: ColourCode.PARADISE_PINK,
        contrastText: '#1c2025'
      },
      secondary: {
        main: SecondaryColourCode.PARADISE_PINK,
        contrastText: '#1c2025'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      }
    },
    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(40, 44, 52, 0.75)'
    }
  },
  {
    name: appThemes.cyanProcess.dark,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(40, 44, 52, 0.75)'
        }
      }
    },
    palette: {
      mode: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34'
      },
      primary: {
        main: ColourCode.CYAN_PROCESS,
        contrastText: '#1c2025'
      },
      secondary: {
        main: SecondaryColourCode.CYAN_PROCESS,
        contrastText: '#1c2025'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      }
    },
    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(40, 44, 52, 0.75)'
    }
  },
  {
    name: appThemes.sapphireBlue.dark,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(40, 44, 52, 0.75)'
        }
      }
    },
    palette: {
      mode: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.5)', //'rgba(255, 255, 255, 0.26)' :old
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34',
        light: '#15181ce0'
      },
      primary: {
        main: ColourCode.SAPPHIRE_BLUE_DARK,
        contrastText: '#1c2025'
      },
      secondary: {
        main: SecondaryColourCode.SAPPHIRE_BLUE_DARK,
        contrastText: '#1c2025'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      },
      info: {
        main: 'rgba(255, 255, 255, 0.04)'
      },
      error: {
        main: '#ff7597'
      }
    },
    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(40, 44, 52, 0.75)'
    }
  },
  {
    name: appThemes.fandango.dark,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(40, 44, 52, 0.75)'
        }
      }
    },
    palette: {
      mode: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34'
      },
      primary: {
        main: ColourCode.FANDANGO,
        contrastText: '#1c2025'
      },
      secondary: {
        main: SecondaryColourCode.FANDANGO,
        contrastText: '#1c2025'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      }
    },
    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(40, 44, 52, 0.75)'
    }
  },
  {
    name: appThemes.maxBluePurple.dark,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(40, 44, 52, 0.75)'
        }
      }
    },
    palette: {
      mode: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34'
      },
      primary: {
        main: ColourCode.MAX_BLUE_PURPLE,
        contrastText: '#1c2025'
      },
      secondary: {
        main: SecondaryColourCode.MAX_BLUE_PURPLE,
        contrastText: '#1c2025'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      }
    },
    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(40, 44, 52, 0.75)'
    }
  },
  {
    name: appThemes.amethyst.dark,
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: 'rgba(40, 44, 52, 0.75)'
        }
      }
    },
    palette: {
      mode: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34'
      },
      primary: {
        main: ColourCode.AMETHYST,
        contrastText: '#1c2025'
      },
      secondary: {
        main: SecondaryColourCode.AMETHYST,
        contrastText: '#1c2025'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      }
    },
    shadows: strongShadows,
    PaperBackground: {
      backgroundColor: 'rgba(40, 44, 52, 0.75)'
    }
  }
];

export const createTheme = (settings: SettingsState) => {
  try {
    if (settings.theme === undefined) {
      settings.theme = 'sapphireBlue';
      settings.variant = ThemeVariant.LITE;
      settings.direction = Direction.LEFT_TO_RIGHT;
      settings.responsiveFontSizes = true;
    }
    const colours = Object.values(BrandColorPalette);
    const isValidTheme = colours?.filter(value => value.title === settings.theme).length;
    let themeConfig =
      isValidTheme &&
      themeConfigs.find(theme => theme.name === appThemes[settings.theme][settings.variant]);

    if (!themeConfig) {
      console.warn(new Error(`The theme ${settings.theme} is not valid`));
      const [defaultThemeConfig] = themeConfigs;
      themeConfig = defaultThemeConfig;
    }

    const direction: DeprecatedThemeOptions = { direction: settings.direction };
    let typo = {
      typography: {
        subtitle1: {
          fontSize: 12,
          fontWeight: 500
        }
      }
    };
    let theme = createMuiTheme(_.merge({}, baseConfig, themeConfig, direction, typo));

    theme = responsiveFontSizes(theme);
    return theme;
  } catch (ex) {
    throw ex;
  }
};
