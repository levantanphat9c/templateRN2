import { UI_SPACING } from '@/Constants';
import { getStylesHook } from '@/Hooks';

export default getStylesHook(dynamicColors => ({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: dynamicColors.Opacity.blueGray50Percent,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  containerLoading: {
    flexDirection: 'row',
    backgroundColor: dynamicColors.Component.indigo,
    borderRadius: UI_SPACING.RADIUS_MD,
    paddingVertical: UI_SPACING.GAP_LG,
    paddingHorizontal: UI_SPACING.GAP_MD_LG,
    alignItems: 'center',
  },
  text: {
    marginLeft: UI_SPACING.GAP_MD,
  },
}));
