import { UI_COLOR_PALETTES, UI_SIZE } from '@/Constants';
import { getStylesHook } from '@/Hooks';

import { mergeStyleNames } from '../../hepler';

export default getStylesHook(({ UI, Main }) => ({
  /* SIZE */
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [UI_SIZE.X_SMALL]: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  [mergeStyleNames(UI_SIZE.X_SMALL, 'TEXT')]: {
    fontWeight: '500',
  },

  [UI_SIZE.SMALL]: {
    paddingVertical: 7,
    paddingHorizontal: 17.5,
  },
  [mergeStyleNames(UI_SIZE.SMALL, 'TEXT')]: {
    fontWeight: '500',
  },

  [UI_SIZE.NORMAL]: {
    paddingVertical: 10,
    paddingHorizontal: 17,
  },

  [UI_SIZE.LARGE]: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  /* COLOR */
  [mergeStyleNames(UI_COLOR_PALETTES.PRIMARY, 'TEXT')]: {
    color: Main.white,
  },

  [mergeStyleNames(UI_COLOR_PALETTES.SECONDARY, 'TEXT')]: {
    color: UI.textContent,
  },

  [mergeStyleNames(UI_COLOR_PALETTES.TERTIARY, 'TEXT')]: {
    color: UI.mainPurple,
  },

  [mergeStyleNames(UI_COLOR_PALETTES.MUTED, 'TEXT')]: {
    color: UI.textContent,
  },

  [mergeStyleNames(UI_COLOR_PALETTES.LIGHT, 'TEXT')]: {
    color: UI.mainPurple,
  },

  [mergeStyleNames(UI_COLOR_PALETTES.TRANSPARENT, 'TEXT')]: {
    color: UI.textTitle,
  },

  buttonDisabled: {
    opacity: 0.5,
  },
}));
