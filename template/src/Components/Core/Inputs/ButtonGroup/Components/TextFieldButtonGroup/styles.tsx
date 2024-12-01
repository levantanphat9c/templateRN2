import { getStylesHook } from '@/Hooks';

export default getStylesHook(dynamicColors => ({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-around',
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: dynamicColors.Component.subButtonL1,
    padding: 10,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
  },
  iconContainer: {
    padding: 10,
    marginLeft: 16,
  },
}));
