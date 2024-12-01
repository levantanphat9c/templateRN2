import { getStylesHook } from '@/Hooks';

import { UI_SPACING } from '../../../Constants';

export default getStylesHook(colors => ({
  container: {
    flex: 1,
    backgroundColor: colors.UI.background,
  },
  contentContainer: {
    paddingTop: UI_SPACING.GAP_MD_LG,
    paddingHorizontal: UI_SPACING.GAP_MD_LG,
    gap: UI_SPACING.GAP_MD_LG,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
}));
