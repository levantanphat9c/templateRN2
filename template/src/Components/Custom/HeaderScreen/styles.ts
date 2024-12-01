import { getStylesHook } from '@/Hooks';

export default getStylesHook(dynamicColors => ({
  container: {
    width: '100%',
    backgroundColor: dynamicColors.UI.bGHeader01,
    alignItems: 'flex-end',
    paddingBottom: 8,
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: dynamicColors.UI.tableLine,
  },
  iconBack: {
    marginRight: 10,
  },
  title: {},
  containerTitle: {
    flex: 1,
    justifyContent: 'center',
  },
}));
