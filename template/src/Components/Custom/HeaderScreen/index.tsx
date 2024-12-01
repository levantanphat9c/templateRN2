import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, Typography } from '@/Components/Core';
import { TypographyVariantLiteral } from '@/Components/Core/DataDisplay/Typography/type';
import { IconNames } from '@/Constants';
import { withMemo } from '@/HOC';
import { useColor } from '@/Hooks';
import { navigateBack } from '@/Services';
import { scale } from '@/styles';

import TouchableScale from '../TouchableScale';
import useStyles from './styles';

interface IProps {
  title?: string;
  typeTitle?: TypographyVariantLiteral;
  canGoBack?: boolean;
  colorIconBack?: string;
  titleComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  titleColor?: string;
  onGoBack?: () => void;
}

const HeaderScreen = (props: IProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const { dynamicColor } = useColor();
  const insets = useSafeAreaInsets();
  const {
    title,
    canGoBack = true,
    rightComponent,
    typeTitle = 'BOLD_18',
    titleComponent,
    colorIconBack = dynamicColor.UI.textContent,
    titleColor,
  } = props;

  const goBack = () => {
    navigateBack();
    props.onGoBack?.();
  };

  return (
    <View
      style={[
        styles.container,
        { height: insets.top + scale(52), paddingTop: insets.top },
        props.containerStyle,
      ]}
    >
      {canGoBack && (
        <TouchableScale onPress={goBack}>
          <Icon
            icon={IconNames['Alt_Arrow_Left']}
            size={scale(24)}
            color={colorIconBack}
            style={styles.iconBack}
          />
        </TouchableScale>
      )}
      {titleComponent ? (
        <>{titleComponent}</>
      ) : (
        <View style={styles.containerTitle}>
          <Typography variant={typeTitle} color={titleColor} numberOfLines={1}>
            {t(title ?? '')}
          </Typography>
        </View>
      )}
      {rightComponent}
    </View>
  );
};

export default withMemo(HeaderScreen);
