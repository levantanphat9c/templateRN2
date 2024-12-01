import React, { createContext, forwardRef } from 'react';

import { withMemo } from '@/HOC';

import TabSelectorLine from './components/TabSelectorLine';
import TabSelectorOutline from './components/TabSelectorOutline';
import TabSelectorSolid from './components/TabSelectorSolid';
import TabSelectorToggle from './components/TabSelectorToggle';
import { ITabSelectorProps, TabSelectorRefType } from './type';

export const TabSelectorContext = createContext<ITabSelectorProps>({
  labels: [],
});

const TabSelector = forwardRef<TabSelectorRefType, ITabSelectorProps>(
  (props: ITabSelectorProps, ref) => {
    const { variant = 'TOGGLE', ...rest } = props;

    if (variant === 'TOGGLE') {
      return <TabSelectorToggle {...rest} ref={ref} />;
    }

    if (variant === 'OUTLINE') {
      return <TabSelectorOutline {...rest} ref={ref} />;
    }

    if (variant === 'LINE') {
      return <TabSelectorLine {...rest} ref={ref} />;
    }

    return <TabSelectorSolid {...rest} ref={ref} />;
  },
);

export default withMemo(TabSelector);
