import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

import { withMemo } from '@/HOC';

export type ScrollableRef = {
  id: number;
  node: React.RefObject<ScrollView>;
};

interface IProps extends ScrollViewProps {
  refreshing?: boolean;
  onRefresh?: () => void;
  scrollRef?: React.LegacyRef<ScrollView> | undefined;
}

const MyScrollView = (props: IProps) => {
  const { scrollRef, ...rest } = props;
  return (
    <ScrollView
      ref={scrollRef}
      overScrollMode="never"
      fadingEdgeLength={0}
      scrollEventThrottle={16}
      {...rest}
    />
  );
};

export default withMemo(MyScrollView);
