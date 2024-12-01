import React from 'react';
import { FlatList, FlatListProps } from 'react-native';

import { withMemo } from '@/HOC';

interface IProps<T> extends FlatListProps<T> {
  listRef?: React.LegacyRef<FlatList<T>> | undefined;
}

const MyFlatList = <T,>(props: IProps<T>) => {
  const { listRef, ...rest } = props;
  return (
    <FlatList
      ref={listRef}
      overScrollMode="never"
      fadingEdgeLength={0}
      scrollEventThrottle={16}
      {...rest}
    />
  );
};

export default withMemo(MyFlatList);
