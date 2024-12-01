import { getStylesHook } from '@/Hooks';

export default getStylesHook(({ Main }) => ({
  container: {
    backgroundColor: Main.white,
    flex: 1,
    backgroudColor: 'red',
  },

  contentContainer: {
    paddingHorizontal: 20,
  },
}));
