import { BrandColorPalette, Colours, ColourCode } from 'src/constants';
import { ApplicationThemes } from '@mui/material/styles';

export const getBrandColorPalette = (brandColor: keyof ApplicationThemes | null) => {
  if (!brandColor) return BrandColorPalette.HEAT_WAVE_THEME.value;

  switch (brandColor) {
    case Colours.BLEU_DE_FRANCE:
      return BrandColorPalette.BLEU_DE_FRANCE_THEME.value;

    case Colours.SUNGLOW:
      return BrandColorPalette.SUNGLOW_THEME.value;

    case Colours.VIVID_SKY_BLUE:
      return BrandColorPalette.VIVID_SKY_BLUE_THEME.value;

    case Colours.PAOLO_VERONESE:
      return BrandColorPalette.PAOLO_VERONESE_THEME.value;

    case Colours.TURQUOISE:
      return BrandColorPalette.TURQUOISE_THEME.value;

    case Colours.PARADISE_PINK:
      return BrandColorPalette.PARADISE_PINK_THEME.value;

    case Colours.CYAN_PROCESS:
      return BrandColorPalette.CYAN_PROCESS_THEME.value;

    case Colours.SAPPHIRE_BLUE:
      return BrandColorPalette.SAPPHIRE_BLUE_THEME.value;

    case Colours.MAX_BLUE_PURPLE:
      return BrandColorPalette.MAX_BLUE_PURPLE_THEME.value;

    case Colours.FANDANGO:
      return BrandColorPalette.FANDANGO_THEME.value;

    case Colours.AMETHYST:
      return BrandColorPalette.AMETHYST_THEME.value;

    default:
      return BrandColorPalette.HEAT_WAVE_THEME.value;
  }
};

/**
 * @function getBrandColor
 * @param brandColor
 * @description because the value of brand_theme stored
 * different like bleuDeFrance & Bleu De France so this check is added temporarily
 * @since 09/06/2020
 * @todo need to optimized
 */
export const getBrandColor = (brandColor: string | undefined) => {
  if (!brandColor) return BrandColorPalette.HEAT_WAVE_THEME.title;
  switch (brandColor) {
    case Colours.BLEU_DE_FRANCE || 'Ligh Slate Blue' || ColourCode.BLEU_DE_FRANCE:
      return BrandColorPalette.BLEU_DE_FRANCE_THEME.title;

    case Colours.SUNGLOW || ColourCode.SUNGLOW || 'Broom':
      return BrandColorPalette.SUNGLOW_THEME.title;

    case Colours.VIVID_SKY_BLUE || ColourCode.VIVID_SKY_BLUE || 'Vivid Sky Blue':
      return BrandColorPalette.VIVID_SKY_BLUE_THEME.title;

    case Colours.PAOLO_VERONESE || ColourCode.PAOLO_VERONESE || 'Paolo Veronese':
      return BrandColorPalette.PAOLO_VERONESE_THEME.title;

    case Colours.TURQUOISE || ColourCode.TURQUOISE || 'Turquoise':
      return BrandColorPalette.TURQUOISE_THEME.title;

    case Colours.PARADISE_PINK || ColourCode.PARADISE_PINK || 'Paradise Pink':
      return BrandColorPalette.PARADISE_PINK_THEME.title;

    case Colours.CYAN_PROCESS || ColourCode.CYAN_PROCESS || 'Cyan Process':
      return BrandColorPalette.CYAN_PROCESS_THEME.title;

    case Colours.SAPPHIRE_BLUE || ColourCode.SAPPHIRE_BLUE || 'Sapphire Blue':
      return BrandColorPalette.SAPPHIRE_BLUE_THEME.title;

    case Colours.MAX_BLUE_PURPLE || ColourCode.MAX_BLUE_PURPLE || 'Tapestry':
      return BrandColorPalette.MAX_BLUE_PURPLE_THEME.title;

    case Colours.FANDANGO || ColourCode.FANDANGO || 'Violet Red':
      return BrandColorPalette.FANDANGO_THEME.title;

    case Colours.AMETHYST || ColourCode.AMETHYST || 'Amethyst':
      return BrandColorPalette.AMETHYST_THEME.title;

    default:
      return BrandColorPalette.HEAT_WAVE_THEME.title;
  }
};
