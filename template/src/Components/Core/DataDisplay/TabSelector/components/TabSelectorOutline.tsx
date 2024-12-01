import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { Typography } from '@/Components/Core';
import { MyScrollView } from '@/Components/Custom';
import { UI_SPACING } from '@/Constants';
import { withMemo } from '@/HOC';
import { getStylesHook, useColor } from '@/Hooks';
import { scale } from '@/styles';
import { insertObjectIf, mapV2 } from '@/Utils';

import Icon, { IIcoMoonProps } from '../../Icon';
import textStyle from '../../Typography/styles';
import { ITabSelectorProps, TabSelectorRefType } from '../type';

interface IProps extends ITabSelectorProps {}

interface ITabLineContainerProps extends Pick<ITabSelectorProps, 'containerStyle' | 'itemSpacing'> {
  scrollable: boolean | undefined;
  children: React.ReactNode;
  onLayout?: (event: LayoutChangeEvent) => void;
}

interface IItemProps {
  item: string;
  index: number;
  width: number;
  itemStyle: ITabSelectorProps['itemStyle'];
  variantText: ITabSelectorProps['variantText'];
  variantTextSelected: ITabSelectorProps['variantTextSelected'];
  colorTextSelected: ITabSelectorProps['colorTextSelected'];
  colorText: ITabSelectorProps['colorText'];
  backgroundColorSelected: ITabSelectorProps['backgroundColorSelected'];
  indexSelected: SharedValue<number>;
  onPress: () => void;
  iconLabel?: ImageSourcePropType | IIcoMoonProps;
}

const TabLineContainer = (props: ITabLineContainerProps) => {
  const { styles } = useStyles();
  const { children, containerStyle, scrollable, itemSpacing, onLayout } = props;
  if (scrollable) {
    return (
      <View onLayout={onLayout} style={containerStyle}>
        <MyScrollView
          contentContainerStyle={[
            styles.scrollViewContentContainer,
            { gap: scale(itemSpacing || 20) },
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <>{children}</>
        </MyScrollView>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        insertObjectIf(itemSpacing, { gap: scale(itemSpacing || 20) }),
      ]}
    >
      <>{children}</>
    </View>
  );
};

const TabSelectorOutline = forwardRef<TabSelectorRefType, IProps>((props: IProps, ref) => {
  const { dynamicColor } = useColor();
  const {
    labels,
    containerStyle,
    itemStyle,
    backgroundColorSelected = dynamicColor.Main.mainPurple,
    onPressItem,
    variantText = 'REGULAR_13',
    variantTextSelected = variantText,
    colorText = dynamicColor.UI.tabDisable,
    colorTextSelected = dynamicColor.UI.textContent,
    initTab = 0,
    scrollable,
    itemSpacing,
    conditionTab,
  } = props;
  const [itemFixedWidth, setItemFixedWidth] = useState(0);
  const indexSelected = useSharedValue(initTab);

  const onContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const fixedWidth = event.nativeEvent.layout.width / 2 - scale(itemSpacing || 20);
    setItemFixedWidth(fixedWidth);
  }, []);

  const onPress = useCallback(
    (index: number) => () => {
      onPressItem?.(index);
      if (!conditionTab?.condition && conditionTab?.tabs.includes(index)) return;
      indexSelected.value = index;
    },
    [onPressItem],
  );

  useImperativeHandle(ref, () => {
    return {
      onPressItem: (index: number) => {
        onPress(index)();
      },
      getCurrentIndex: () => {
        return indexSelected.value;
      },
    };
  });

  return (
    <TabLineContainer
      onLayout={onContainerLayout}
      scrollable={scrollable}
      containerStyle={containerStyle}
      itemSpacing={itemSpacing}
    >
      {mapV2(labels, (item, index) => {
        return (
          <Item
            key={index}
            index={index}
            indexSelected={indexSelected}
            width={itemFixedWidth}
            itemStyle={itemStyle}
            onPress={onPress(index)}
            item={item}
            variantText={variantText}
            variantTextSelected={variantTextSelected}
            colorText={colorText}
            colorTextSelected={colorTextSelected}
            backgroundColorSelected={backgroundColorSelected}
            iconLabel={props.iconLabels?.[index]}
          />
        );
      })}
    </TabLineContainer>
  );
});

const Item = (props: IItemProps) => {
  const { styles, dynamicColors } = useStyles();
  const { styles: textStyles } = textStyle();

  const animatedContainerStyleSelected = useAnimatedStyle(() => {
    const isSelected = props.indexSelected.value === props.index;
    return {
      ...styles.item,
      width: props.width,
      ...props.itemStyle,
      borderColor: isSelected ? props.backgroundColorSelected : dynamicColors.Component.subButtonL1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    };
  });

  const animatedTextStyleSelected = useAnimatedStyle(() => {
    const isSelected = props.indexSelected.value === props.index;
    const styles = isSelected
      ? textStyles[props.variantTextSelected!]
      : textStyles[props.variantText!];
    return {
      color: isSelected ? props.colorTextSelected : props.colorText,
      ...styles,
    };
  });

  const renderIcon = () => {
    if (typeof props.iconLabel === 'object' && 'icon' in props.iconLabel) {
      return (
        <View style={styles.containerIcon}>
          <Icon {...props.iconLabel} />
        </View>
      );
    }

    if (typeof props.iconLabel === 'number') {
      return <Image source={props.iconLabel} style={styles.imageLogo} />;
    }

    return null;
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <Animated.View style={animatedContainerStyleSelected}>
        {renderIcon()}
        <Typography style={animatedTextStyleSelected}>{props.item}</Typography>
      </Animated.View>
    </TouchableOpacity>
  );
};

const useStyles = getStylesHook(dynamicColors => {
  return {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: dynamicColors.Main.white,
      padding: 4,
      borderRadius: 8,
    },
    scrollViewContentContainer: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    item: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      borderWidth: 1,
      borderRadius: UI_SPACING.RADIUS_MD,
    },
    imageLogo: {
      _width: 20,
      _height: 20,
      borderRadius: 10,
      marginRight: UI_SPACING.GAP_BASE,
    },
    containerIcon: {
      marginRight: UI_SPACING.GAP_BASE,
    },
  };
});

export default withMemo(TabSelectorOutline);
