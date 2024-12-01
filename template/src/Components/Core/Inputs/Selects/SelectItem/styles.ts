import { getStylesHook } from '@/Hooks';

export default getStylesHook(({ UI }) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: UI.saperator,
  },
  selected: {
    backgroundColor: UI.sureface,
  },
}));
