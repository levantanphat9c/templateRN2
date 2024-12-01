import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, View, ViewStyle } from 'react-native';

import { withMemo } from '@/HOC';
import { getStylesHook } from '@/Hooks';
import { checkChildIsElement } from '@/Utils';

import Typography from '../../DataDisplay/Typography';

interface IProps {
  children: React.ReactNode | string;
  style?: StyleProp<ViewStyle>;
}
const CardHeader = ({ children, style }: IProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  return (
    <View style={[styles.container, style]}>
      {checkChildIsElement(children) ? children : <Typography>{t(children as string)}</Typography>}
    </View>
  );
};

const useStyles = getStylesHook(dynamicColors => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: dynamicColors.UI.stroke,
  },
}));

export default withMemo(CardHeader);
