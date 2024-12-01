import { UI_SPACING } from '@/Constants';
import { getStylesHook } from '@/Hooks';

export default getStylesHook(dynamicColors => ({
  container: {
    paddingHorizontal: UI_SPACING.GAP_S,
    backgroundColor: dynamicColors.Component.subButtonL1,
    borderRadius: UI_SPACING.RADIUS_MD,
    width: 60,
  },
  containerItem: {
    borderRadius: UI_SPACING.RADIUS_BASE,
    backgroundColor: dynamicColors.UI.sureface,
  },
}));
