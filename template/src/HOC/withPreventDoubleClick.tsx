/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from 'lodash';
import React, { FunctionComponent } from 'react';

import { IS_IOS } from '@/Constants';

export const withPreventDoubleClick = <T,>(WrappedComponent: any): FunctionComponent<T> => {
  class PreventDoubleClick extends React.PureComponent<any> {
    debouncedOnPress = () => {
      const { onPress } = this.props;
      if (onPress) {
        onPress();
      }
    };

    onPress = debounce(this.debouncedOnPress, IS_IOS ? 500 : 1000, {
      leading: true,
      trailing: false,
    });

    render() {
      return <WrappedComponent ref={this.props?.btnRef} {...this.props} onPress={this.onPress} />;
    }
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  PreventDoubleClick.displayName = `withPreventDoubleClick(${WrappedComponent.displayName || WrappedComponent.name})`;

  return PreventDoubleClick as any;
};
