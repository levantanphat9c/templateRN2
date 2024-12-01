import { UI_COLOR_PALETTES, UI_SIZE } from '@/Constants';
import { getStylesHook } from '@/Hooks';

import { mergeStyleNames } from '../../hepler';

export default getStylesHook(({ UI, Component }) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* SIZE */
  [UI_SIZE.X_SMALL]: {
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderWidth: 1,
  },

  [UI_SIZE.SMALL]: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderWidth: 1,
  },

  [UI_SIZE.NORMAL]: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
  },

  /* COLOR */
  [mergeStyleNames(UI_COLOR_PALETTES.PRIMARY, 'ORIGINAL')]: {
    borderColor: UI.mainPurple,
  },
  [mergeStyleNames(UI_COLOR_PALETTES.PRIMARY, 'DISABLED')]: {
    borderColor: Component.subButtonL1,
  },
  [mergeStyleNames(UI_COLOR_PALETTES.PRIMARY, 'TEXT', 'ORIGINAL')]: {
    color: UI.mainPurple,
  },
  [mergeStyleNames(UI_COLOR_PALETTES.PRIMARY, 'TEXT', 'DISABLED')]: {
    color: UI.textPlaceholder,
  },
}));
