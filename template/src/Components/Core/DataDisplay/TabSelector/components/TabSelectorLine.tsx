import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { LayoutChangeEvent, TouchableOpacity, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { Icon, Typography } from '@/Components/Core';
import { MyScrollView } from '@/Components/Custom';
import { IconNames, UI_SPACING } from '@/Constants';
import { withMemo } from '@/HOC';
import { getStylesHook } from '@/Hooks';
import { scale } from '@/styles';
import { mapV2 } from '@/Utils';

import textStyle from '../../Typography/styles';
import { ITabSelectorProps, TabSelectorRefType } from '../type';

interface IProps extends ITabSelectorProps {}

const HIT_SLOP = { top: 12, right: 24, bottom: 12, left: 24 };

interface ITabLineContainerProps extends Pick<ITabSelectorProps, 'containerStyle'> {
  scrollable: boolean | undefined;
  children: React.ReactNode;
}

const TabLineContainer = ({ scrollable, containerStyle, children }: ITabLineContainerProps) => {
  const { styles } = useStyles();

  if (scrollable) {
    return (
      <View>
        <MyScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={[styles.scrollViewContentContainer, containerStyle]}
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
    <View style={[styles.container, containerStyle]}>
      <>{children}</>
    </View>
  );
};

const Item = withMemo(
  (props: {
    item: string;
    index: number;
    onLayout: (event: LayoutChangeEvent, index: number) => void;
    itemStyle: ITabSelectorProps['itemStyle'];
    onPressItem: () => void;
    variantText: ITabSelectorProps['variantText'];
    variantTextSelected: ITabSelectorProps['variantTextSelected'];
    colorTextSelected: ITabSelectorProps['colorTextSelected'];
    colorText: ITabSelectorProps['colorText'];
    indexSelected: SharedValue<number>;
    isHasDot: boolean;
  }) => {
    const { styles, dynamicColors } = useStyles();
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
      isHasDot,
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
        onLayout={e => onLayout(e, index)}
        key={item}
        hitSlop={HIT_SLOP}
      >
        <Typography style={animatedStyleSelected}>{item}</Typography>
        {isHasDot && (
          <View style={styles.icon}>
            <Icon
              icon={IconNames.Bullet}
              size={scale(6)}
              color={dynamicColors.Flag.text.veryHighRisk}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  },
);

const TabSelectorLine = forwardRef<TabSelectorRefType, IProps>((props: IProps, ref) => {
  const { styles, dynamicColors } = useStyles();
  const {
    labels,
    containerStyle,
    itemStyle,
    onPressItem,
    variantText = 'REGULAR_13',
    variantTextSelected = variantText,
    colorText = dynamicColors.UI.textPlaceholder,
    colorTextSelected = dynamicColors.UI.textTitle,
    labelsHighlight,
    initTab = 0,
    scrollable,
    conditionTab,
  } = props;
  const widthItems = useRef([] as number[]);
  const positionItems = useRef([] as number[]);
  const widthItem = useSharedValue(0);
  const positionItem = useSharedValue(0);
  const indexSelected = useSharedValue(initTab);

  const onLayoutItem = (event: LayoutChangeEvent, index: number) => {
    if (positionItems.current.length === labels.length) {
      return;
    }
    const width = event.nativeEvent.layout.width;
    const positionX = event.nativeEvent.layout.x;
    if (index === initTab) {
      widthItem.value = width;
      positionItem.value = positionX;
    }

    if (widthItems.current.length !== labels.length) {
      widthItems.current.push(width);
      positionItems.current.push(positionX);
    }

    // Set position and width for selected tab when have change item size
    if (
      indexSelected.value !== initTab &&
      positionItems.current.length === indexSelected.value + 1
    ) {
      positionItem.value = positionItems.current[indexSelected.value];
      widthItem.value = widthItems.current[indexSelected.value];
    }
  };

  const onPress = useCallback(
    (index: number, ignoreCallback?: boolean) => () => {
      !ignoreCallback && onPressItem?.(index);
      if (!conditionTab?.condition && conditionTab?.tabs.includes(index)) return;

      indexSelected.value = index;
      positionItem.value = positionItems.current[index];
      widthItem.value = widthItems.current[index];
    },
    [onPressItem],
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(widthItem.value),
      transform: [
        {
          translateX: withSpring(positionItem.value, {
            stiffness: 50,
            velocity: 20,
          }),
        },
      ],
    };
  });

  useImperativeHandle(ref, () => {
    return {
      onPressItem: (index: number, ignoreCallback?: boolean) => {
        onPress(index, ignoreCallback)();
      },
      getCurrentIndex: () => {
        return indexSelected.value;
      },
    };
  });

  return (
    <TabLineContainer scrollable={scrollable} containerStyle={containerStyle}>
      {mapV2(labels, (item, index) => {
        const isHasDot = labelsHighlight?.includes(item) ?? false;
        const props = {
          item,
          index,
          itemStyle,
          onLayout: onLayoutItem,
          onPressItem: onPress(index),
          variantText,
          colorTextSelected,
          colorText,
          indexSelected,
          isHasDot,
          variantTextSelected,
        };
        return <Item {...props} key={`${item}-${index}`} />;
      })}

      <Animated.View style={[styles.itemSelected, animatedStyle]} />
    </TabLineContainer>
  );
});

const useStyles = getStylesHook(dynamicColors => {
  return {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: dynamicColors.Main.white,
      borderBottomWidth: 1,
      borderBottomColor: dynamicColors.UI.tableLine,
      paddingHorizontal: 14.5,
      paddingTop: 9,
      paddingBottom: 11,
    },
    scrollViewContainer: {
      width: '100%',
      backgroundColor: dynamicColors.Main.white,
      borderBottomWidth: 1,
      borderBottomColor: dynamicColors.UI.tableLine,
    },
    scrollViewContentContainer: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingTop: 9,
      paddingBottom: 11,
      paddingHorizontal: 14.5,
      gap: 32,
    },
    item: {
      flexDirection: 'row',
    },
    itemSelected: {
      position: 'absolute',
      zIndex: -1,
      bottom: 0,
      height: 3,
      backgroundColor: dynamicColors.UI.textTitle,
      left: 0,
    },
    icon: {
      marginLeft: UI_SPACING.GAP_S,
    },
  };
});

export default withMemo(TabSelectorLine);
