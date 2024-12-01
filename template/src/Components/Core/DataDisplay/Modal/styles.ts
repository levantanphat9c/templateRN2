import { getStylesHook } from '@/Hooks';
import { screenHeight, screenWidth } from '@/styles';

export default getStylesHook(dynamicColors => ({
  modalBackground: {
    flex: 1,
    backgroundColor: dynamicColors.Opacity.blueGray50Percent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    _width: screenWidth,
    _height: screenHeight,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    elevation: -1,
    zIndex: -1,
  },
}));
