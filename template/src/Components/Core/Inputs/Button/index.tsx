import React, { createContext, useMemo } from 'react';

import { withMemo } from '@/HOC';

import { IButtonProps } from './type';
import ContainedButton from './Variant/ContainedButton';
import OutlineButton from './Variant/OutlineButton';
import TextButton from './Variant/TextButton';

export const ButtonContext = createContext<Omit<IButtonProps, 'variant'>>({
  children: '',
});

const Button = ({ variant = 'CONTAINED', ...props }: IButtonProps) => {
  const memoizedValue = useMemo(() => ({ variant, ...props }), [variant, props]);

  return (
    <ButtonContext.Provider value={memoizedValue}>
      {variant === 'CONTAINED' && <ContainedButton />}
      {variant === 'OUTLINE' && <OutlineButton />}
      {variant === 'TEXT' && <TextButton />}
    </ButtonContext.Provider>
  );
};

export default withMemo(Button);
