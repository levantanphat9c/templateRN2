import { isNumber } from 'lodash';
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { LayoutChangeEvent, TouchableOpacity, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Typography } from '@/Components/Core';
import { MyScrollView } from '@/Components/Custom';
import { withMemo } from '@/HOC';
import { getStylesHook, useColor } from '@/Hooks';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import { mapV2 } from '@/Utils';

import textStyle from '../../Typography/styles';
import { ITabSelectorProps, TabSelectorRefType } from '../type';

interface IProps extends ITabSelectorProps {}

interface ITabLineContainerProps
  extends Pick<ITabSelectorProps, 'containerStyle' | 'tabWrapperStyle'> {
  scrollable: boolean | undefined;
  children: React.ReactNode;
}

const TabLineContainer = (props: ITabLineContainerProps) => {
  const { styles } = useStyles();
  const { children, containerStyle, scrollable, tabWrapperStyle } = props;
  if (scrollable) {
    return (
      <View style={[styles.scrollViewContainer, containerStyle]}>
        <MyScrollView
          contentContainerStyle={[styles.scrollViewContentContainer]}
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
    <View style={tabWrapperStyle}>
      <View style={[styles.container, containerStyle]}>
        <>{children}</>
      </View>
    </View>
  );
};

const TabSelectorToggle = forwardRef<TabSelectorRefType, IProps>((props: IProps, ref) => {
  const { dynamicColor } = useColor();
  const {
    labels,
    containerStyle,
    itemStyle,
    backgroundColorSelected = dynamicColor.Main.mainPurple,
    variantText = 'REGULAR_13',
    variantTextSelected = variantText,
    colorText = dynamicColor.UI.tabDisable,
    colorTextSelected = dynamicColor.UI.textContent,
    initTab = 0,
    scrollable,
    tabWrapperStyle,
    conditionTab,
    onPressItem,
  } = props;
  const { styles } = useStyles();
  const widthItem = useSharedValue(0);
  const heightItem = useSharedValue(0);
  const positionItem = useSharedValue(0);
  const extraValueHorizontal = useSharedValue(0);
  const indexSelected = useSharedValue(initTab);
  const positionItems = useRef([] as number[]);
  const widthItems = useRef([] as number[]);

  const onLayoutItem = useCallback((event: LayoutChangeEvent) => {
    const { x, width, height } = event.nativeEvent.layout;
    if (width === 0) return;

    if (positionItems.current.length === initTab) {
      widthItem.value = width;
      heightItem.value = height;
      extraValueHorizontal.value = x;
      positionItem.value = x;
    }
    positionItems.current.push(x);
    widthItems.current.push(width);
  }, []);

  const onPress = useCallback(
    (index: number) => () => {
      onPressItem?.(index);
      if (!conditionTab?.condition && conditionTab?.tabs.includes(index)) return;
      indexSelected.value = index;
      widthItem.value = withTiming(widthItems.current[index]);
      positionItem.value = withTiming(positionItems.current[index]);
    },
    [onPressItem],
  );

  useUpdateEffect(() => {
    if (isNumber(widthItems.current[initTab]) || isNumber(positionItems.current[initTab])) {
      widthItem.value = withTiming(widthItems.current[initTab]);
      positionItem.value = withTiming(positionItems.current[initTab]);
      indexSelected.value = initTab;
    }
  }, [initTab]);

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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: widthItem.value,
      height: heightItem.value,
      transform: [{ translateX: positionItem.value }],
    };
  });
  return (
    <TabLineContainer
      scrollable={scrollable}
      containerStyle={containerStyle}
      tabWrapperStyle={tabWrapperStyle}
    >
      {mapV2(labels, (item, index) => {
        const props = {
          item,
          index,
          onLayout: onLayoutItem,
          itemStyle,
          onPressItem: onPress(index),
          variantText,
          variantTextSelected,
          colorTextSelected,
          colorText,
          indexSelected,
        };

        return <Item {...props} key={`${item}-${index}`} />;
      })}

      <Animated.View
        style={[
          styles.itemSelected,
          itemStyle,
          { backgroundColor: backgroundColorSelected },
          animatedStyle,
        ]}
      />
    </TabLineContainer>
  );
});

const Item = (props: {
  item: string;
  index: number;
  onLayout: (event: LayoutChangeEvent) => void;
  itemStyle: ITabSelectorProps['itemStyle'];
  onPressItem: () => void;
  variantText: ITabSelectorProps['variantText'];
  variantTextSelected: ITabSelectorProps['variantTextSelected'];
  colorTextSelected: ITabSelectorProps['colorTextSelected'];
  colorText: ITabSelectorProps['colorText'];
  indexSelected: SharedValue<number>;
}) => {
  const { styles } = useStyles();
  const { styles: textStyles } = textStyle();

  const {
    itemStyle,
    onPressItem,
    index,
    onLayout,
    item,
    variantText,
    variantTextSelected,
    colorTextSelected,
    colorText,
    indexSelected,
  } = props;

  const animatedStyleSelected = useAnimatedStyle(() => {
    const isSelected = indexSelected.value === index;
    const styles = isSelected ? textStyles[variantTextSelected!] : textStyles[variantText!];
    return {
      color: isSelected ? colorTextSelected : colorText,
      ...styles,
    };
  });

  return (
    <TouchableOpacity
      style={[styles.item, itemStyle]}
      onPress={onPressItem}
      onLayout={onLayout}
      key={item}
    >
      <Typography style={animatedStyleSelected}>{item}</Typography>
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
    containerScrollable: {
      backgroundColor: dynamicColors.Main.white,
      padding: 4,
      borderRadius: 8,
    },
    item: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
    },
    itemSelected: {
      position: 'absolute',
      zIndex: -1,
    },
    scrollViewContainer: {
      backgroundColor: dynamicColors.Component.blueGray800,
    },
    scrollViewContentContainer: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
  };
});

export default withMemo(TabSelectorToggle);
