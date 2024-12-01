import { UI_SPACING } from '@/Constants';
import { getStylesHook } from '@/Hooks';

export default getStylesHook(dynamicColors => ({
  modalContainer: {
    position: 'relative',
    height: '100%',
    backgroundColor: 'transparent',
  },
  modalShadowContainer: {
    position: 'absolute',
    zIndex: 1,
    borderRadius: UI_SPACING.RADIUS_MD,
    backgroundColor: dynamicColors.UI.sureface,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    width: 240,
  },
  modalContentContainer: {
    borderRadius: UI_SPACING.RADIUS_MD,
    overflow: 'hidden',
    backgroundColor: dynamicColors.UI.sureface,
    maxHeight: 224,
    padding: 12,
  },
  modalContentContainer2: {
    borderRadius: UI_SPACING.RADIUS_MD,
    overflow: 'hidden',
    backgroundColor: dynamicColors.UI.sureface,
  },
  arrow: {
    position: 'absolute',
    zIndex: 2,
    width: 13,
    height: 13,
    backgroundColor: dynamicColors.UI.sureface,
    transform: [{ rotate: '45deg' }],
  },

  closeView: {
    position: 'absolute',
    zIndex: 3,
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));
