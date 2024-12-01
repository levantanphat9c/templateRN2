import { UI_SPACING } from '@/Constants';
import { getStylesHook } from '@/Hooks';

export default getStylesHook(dynamicColors => ({
  container: { flexDirection: 'row', alignItems: 'center' },
  containerInputText: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    _minHeight: 40,
    paddingHorizontal: UI_SPACING.GAP_MD,
    gap: UI_SPACING.GAP_S,
  },
  containerInputTextHorizontal: {
    borderRadius: 8,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  containerInputError: {
    backgroundColor: dynamicColors.Flag.bG.bGVeryHighRisk,
  },
  input: {
    padding: 0,
    flex: 1,
    color: dynamicColors.UI.textContent,
  },
  label: {
    marginRight: 6,
  },
  errorMessage: {
    marginTop: 4,
  },
  containerLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  containerLabelHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  toolTipArrow: {
    transform: [
      {
        rotate: '45deg',
      },
      {
        translateY: -5,
      },
      {
        translateX: 2,
      },
    ],
  },
}));
