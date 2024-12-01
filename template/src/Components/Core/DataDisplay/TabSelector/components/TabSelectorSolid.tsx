import React, { forwardRef, useImperativeHandle } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { Typography } from '@/Components/Core';
import { UI_SPACING } from '@/Constants';
import { getStylesHook, useColor } from '@/Hooks';
import { insertObjectIfElse, mapV2 } from '@/Utils';

import textStyle from '../../Typography/styles';
import { ITabSelectorProps, TabSelectorRefType } from '../type';

interface IProps extends ITabSelectorProps {}
const TabSelectorSolid = forwardRef<TabSelectorRefType, IProps>((props: IProps, ref) => {
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
    isScrollable = false,
    initTab = 0,
    conditionTab,
  } = props;
  const { styles } = useStyles();
  const indexSelected = useSharedValue(initTab);

  const Component = isScrollable ? ScrollView : View;

  useImperativeHandle(ref, () => {
    return {
      onPressItem: onPress,
      getCurrentIndex: () => {
        return indexSelected.value;
      },
    };
  });

  const onPress = (index: number) => {
    onPressItem?.(index);
    if (!conditionTab?.condition && conditionTab?.tabs.includes(index)) return;
    indexSelected.value = index;
  };

  return (
    <Component
      overScrollMode="never"
      fadingEdgeLength={0}
      {...insertObjectIfElse(
        isScrollable,
        {
          horizontal: true,
          contentContainerStyle: [containerStyle],
          showsVerticalScrollIndicator: false,
          showsHorizontalScrollIndicator: false,
          style: styles.containerScrollView,
        },
        {
          style: [styles.container, containerStyle],
        },
      )}
    >
      {mapV2(labels, (item, index) => {
        const onPressItem = () => {
          onPress(index);
        };
        const props = {
          item,
          index,
          itemStyle,
          onPressItem,
          variantText,
          colorTextSelected,
          colorText,
          indexSelected,
          backgroundColorSelected,
          variantTextSelected,
        };
        return <Item {...props} key={`${item}-${index}`} />;
      })}
    </Component>
  );
});

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Item = (props: {
  item: string;
  index: number;
  itemStyle: ITabSelectorProps['itemStyle'];
  onPressItem: () => void;
  variantText: ITabSelectorProps['variantText'];
  variantTextSelected: ITabSelectorProps['variantTextSelected'];
  colorTextSelected: ITabSelectorProps['colorTextSelected'];
  colorText: ITabSelectorProps['colorText'];
  indexSelected: SharedValue<number>;
  backgroundColorSelected: string;
}) => {
  const { styles } = useStyles();
  const {
    itemStyle,
    onPressItem,
    index,
    item,
    variantText,
    variantTextSelected,
    colorTextSelected,
    colorText,
    indexSelected,
    backgroundColorSelected,
  } = props;

  const { styles: textStyles } = textStyle();

  const animatedStyleSelected = useAnimatedStyle(() => {
    const styles =
      indexSelected.value === index ? textStyles[variantTextSelected!] : textStyles[variantText!];
    return {
      color: indexSelected.value === index ? colorTextSelected : colorText,
      ...styles,
    };
  });

  const animatedButtonStyleSelected = useAnimatedStyle(() => {
    const backgroundColor = itemStyle?.['backgroundColor'] ?? styles.item['backgroundColor'];
    return {
      ...styles.item,
      ...itemStyle,
      backgroundColor: indexSelected.value === index ? backgroundColorSelected : backgroundColor,
    };
  });

  return (
    <AnimatedTouchableOpacity style={animatedButtonStyleSelected} onPress={onPressItem} key={item}>
      <Typography style={animatedStyleSelected}>{item}</Typography>
    </AnimatedTouchableOpacity>
  );
};

const useStyles = getStylesHook(dynamicColor => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerScrollView: {
    flexGrow: 0,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: UI_SPACING.GAP_BASE,
    paddingHorizontal: UI_SPACING.GAP_BASE,
    borderRadius: UI_SPACING.RADIUS_MD,
    backgroundColor: dynamicColor.UI.tableHeader,
  },
}));
export default TabSelectorSolid;
