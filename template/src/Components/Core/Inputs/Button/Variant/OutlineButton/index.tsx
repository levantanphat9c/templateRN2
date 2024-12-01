import React, { isValidElement, memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@/Components/Core';
import { TouchableScale } from '@/Components/Custom';
import LoadingChildren from '@/Components/Custom/LoadingChildren';
import { insertObjectIf } from '@/Utils';

import { ButtonContext } from '../..';
import { mergeStyleNames } from '../../hepler';
import { MAP_TEXT_SIZE } from './config';
import useStyles from './styles';

const OutlineButton = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const {
    size,
    color,
    buttonStyle,
    textStyle,
    textColor,
    textVariant,
    disabled,
    children,
    isLoading,
    textLoading,
    onPress,
  } = useContext(ButtonContext);

  /* Size & color */
  const styleType = disabled ? 'DISABLED' : 'ORIGINAL';
  const currentSize = size || 'NORMAL';
  const currentColor = color || 'PRIMARY';
  const staticButtonStyle = [
    styles.container,
    styles[currentSize],
    styles[mergeStyleNames(currentColor, styleType)],
    buttonStyle,
  ];
  const staticTextStyle = [
    styles[mergeStyleNames(currentColor, 'TEXT', styleType)],
    styles[mergeStyleNames(currentColor, 'TEXT', styleType)],
    textStyle,
    insertObjectIf(textColor, { color: textColor }),
  ];

  return (
    <TouchableScale disabled={disabled} style={staticButtonStyle} onPress={onPress}>
      <LoadingChildren isLoading={isLoading} textLoading={textLoading} textStyle={staticTextStyle}>
        {isValidElement(children) ? (
          children
        ) : (
          <Typography variant={textVariant ?? MAP_TEXT_SIZE[currentSize]} style={staticTextStyle}>
            {t(String(children))}
          </Typography>
        )}
      </LoadingChildren>
    </TouchableScale>
  );
};

export default memo(OutlineButton);
