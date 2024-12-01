import { getStylesHook } from '@/Hooks';

import '@/styles';

import { UI_COLOR_PALETTES, UI_SIZE } from '@/Constants';

import { mergeStyleNames } from '../../hepler';

export default getStylesHook(({ UI }) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* SIZE */
  [UI_SIZE.SMALL]: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },

  [UI_SIZE.NORMAL]: {
    paddingVertical: 9,
    paddingHorizontal: 8,
  },

  /* COLOR */
  [mergeStyleNames(UI_COLOR_PALETTES.PRIMARY, 'TEXT', 'ORIGINAL')]: {
    color: UI.mainPurple,
  },
  [mergeStyleNames(UI_COLOR_PALETTES.PRIMARY, 'TEXT', 'DISABLED')]: {
    color: UI.tabDisable,
  },

  /* VARIANT */
  [mergeStyleNames(UI_COLOR_PALETTES.PRIMARY, 'UNDERLINE', 'ORIGINAL')]: {
    borderBottomWidth: 1,
    borderBottomColor: UI.mainPurple,
  },
  [mergeStyleNames(UI_COLOR_PALETTES.PRIMARY, 'UNDERLINE', 'DISABLED')]: {
    borderBottomWidth: 1,
    borderBottomColor: UI.tabDisable,
  },
}));
