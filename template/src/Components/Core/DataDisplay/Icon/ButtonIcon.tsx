import { isNilOrEmpty } from 'ramda-adjunct';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { HIT_SLOP } from '@/Constants';
import { withMemo } from '@/HOC';

import Icon, { IIcoMoonProps } from '../Icon';

interface IProps extends TouchableOpacityProps {
  icon?: IIcoMoonProps;
}

const ButtonIcon = (props: IProps) => {
  const { icon, onPress, ...rest } = props;

  return (
    <TouchableOpacity
      hitSlop={HIT_SLOP}
      onPress={onPress}
      disabled={isNilOrEmpty(onPress)}
      {...rest}
    >
      {icon && <Icon {...icon} />}
    </TouchableOpacity>
  );
};

export default withMemo(ButtonIcon);
