import { UI_SPACING } from '@/Constants';
import { getStylesHook } from '@/Hooks';

export default getStylesHook(() => ({
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: UI_SPACING.GAP_LG,
  },
  text: {
    marginLeft: UI_SPACING.GAP_LG,
    flex: 1,
  },
  containerBox: {
    borderRadius: 5,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
