import { UI_SPACING } from '@/Constants';
import { getStylesHook } from '@/Hooks';

export default getStylesHook(dynamicColors => ({
  container: {
    position: 'relative',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: dynamicColors.UI.bGDroplist,
    borderRadius: UI_SPACING.RADIUS_MD,
  },
  labelText: {
    flex: 1,
  },
  labelContainerFocus: {
    opacity: 0.5,
  },
  modalOverlay: {
    width: '100%',
  },
  modalContainer: {
    position: 'relative',
    backgroundColor: 'transparent',
    top: 7,
  },
  modalShadowContainer: {
    position: 'absolute',
    zIndex: 1,
    borderRadius: UI_SPACING.RADIUS_MD,
    backgroundColor: dynamicColors.UI.sureface,
  },
  modalContentContainer: {
    borderRadius: UI_SPACING.RADIUS_MD,
    overflow: 'hidden',
    backgroundColor: dynamicColors.UI.sureface,
    minWidth: 150,
  },
}));
