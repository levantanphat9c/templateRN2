import { UI_SPACING } from '@/Constants';
import { getStylesHook } from '@/Hooks';

export default getStylesHook(dynamicColor => ({
  container: {
    flex: 1,
    backgroundColor: dynamicColor.UI.background,
  },
  containerHeader: {
    backgroundColor: dynamicColor.UI.bGHeader02,
    borderBottomWidth: 0,
  },
  title: {
    marginBottom: UI_SPACING.GAP_MD_LG,
    paddingLeft: UI_SPACING.GAP_MD_LG,
  },
  containerBody: {
    paddingTop: UI_SPACING.GAP_MD_LG,
  },
  containerAsset: {
    paddingHorizontal: UI_SPACING.GAP_MD_LG,
  },
  containerCustomizationServices: {
    padding: UI_SPACING.GAP_MD_LG,
  },
  containerBanner: {
    paddingHorizontal: UI_SPACING.GAP_MD_LG,
    paddingBottom: UI_SPACING.GAP_MD_LG,
  },
  separator2: {
    width: '100%',
    height: 10,
  },
}));
