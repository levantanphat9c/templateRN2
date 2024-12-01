import { SpringConfig } from 'react-native-reanimated/lib/typescript/animation/springUtils';

import { TypographyVariantLiteral } from '@/Components/Core/DataDisplay/Typography/type';

import { ButtonSizeLiteral } from '../../type';

export const animatedConfig: SpringConfig = {
  stiffness: 500,
  damping: 100,
};

export const MAP_TEXT_SIZE: { [key in ButtonSizeLiteral]: TypographyVariantLiteral } = {
  X_SMALL: 'MEDIUM_13',
  SMALL: 'MEDIUM_14',
  NORMAL: 'BOLD_14',
  LARGE: 'BOLD_15',
};
