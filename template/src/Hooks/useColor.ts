/* eslint-disable @typescript-eslint/no-empty-function */

// import { useSelector } from 'react-redux';

// import { RootState } from '@/ReduxSaga/rootReducer';
import { LightMode } from '@/styles';

/**
 * Hook that check dark light mode and return correct color set
 * example
 * const {dynamicColor, isLight} = useColor();
 */
export const useColor = () => {
  const dynamicColor = LightMode; //isLight ? LightMode : DarkMode;
  return { dynamicColor, isLight: true };
};
