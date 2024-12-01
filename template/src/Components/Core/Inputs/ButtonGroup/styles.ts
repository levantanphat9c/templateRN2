import { Platform } from 'react-native';

import { getStylesHook } from '@/Hooks';

import { BUTTON_GROUP_VARIANT } from './type';

export default getStylesHook({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  [BUTTON_GROUP_VARIANT.NORMAL_GROUP]: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  [BUTTON_GROUP_VARIANT.BOTTOM_GROUP]: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 31,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.4,
        shadowRadius: 16.0,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
