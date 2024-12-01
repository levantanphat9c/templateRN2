import { getStylesHook } from '@/Hooks';

export default getStylesHook(({ TradingColor }) => ({
  button: {
    width: '100%',
    flex: 1,
    paddingVertical: 9,
    overflow: 'hidden',
  },
  buttonText: {
    textTransform: 'uppercase',
  },

  buyButton: {
    marginRight: 12,
    backgroundColor: TradingColor.increaseGreen900,
  },

  sellButton: {
    backgroundColor: TradingColor.declineRed900,
  },
}));
