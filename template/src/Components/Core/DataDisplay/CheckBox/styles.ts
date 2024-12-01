import { UI_SPACING } from '@/Constants';
import { getStylesHook } from '@/Hooks';

export default getStylesHook(dynamicColors => ({
  container: {
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    marginLeft: UI_SPACING.GAP_LG,
  },
  squareContainerBox: {
    borderRadius: 5,
    borderColor: dynamicColors.UI.textPlaceholder,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  roundedContainerBox: {
    borderRadius: 30,
    borderColor: dynamicColors.UI.textPlaceholder,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
