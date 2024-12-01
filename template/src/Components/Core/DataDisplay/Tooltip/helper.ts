import { OrientationType } from 'react-native-orientation-locker';

import { screenHeight, screenWidth } from '@/styles';

import { TooltipPosition } from '.';

export const calculatePopoverPosition = (
  position: TooltipPosition,
  x: number,
  y: number,
  contentWidth: number,
  contentHeight: number,
  popoverWidth: number,
  popoverHeight: number,
  orientation: OrientationType,
  popoverSpaceX: number,
  popoverSpaceY: number,
  scaleX: (size: number) => number,
  scaleY: (size: number) => number,
) => {
  const isPortrait = orientation === OrientationType.PORTRAIT;
  const oriScreenW = isPortrait ? screenWidth : screenHeight;
  const oriScreenH = isPortrait ? screenHeight : screenWidth;

  if (position === 'left' || position === 'right') {
    const leftX = x - popoverWidth - scaleX(popoverSpaceX);
    const rightX = x + popoverWidth + scaleX(popoverSpaceX);
    const popoverY = y - popoverHeight / 2 + contentHeight / 2;
    let popoverX = position === 'left' ? leftX : rightX;
    const isOutsideX = position === 'left' ? leftX < 0 : rightX > oriScreenW;

    if (isOutsideX) {
      popoverX = position === 'left' ? rightX : leftX;
    }

    return { x: popoverX, y: popoverY };
  }

  const leftX = x - scaleX(popoverSpaceX);
  const rightX = x - popoverWidth + contentWidth + scaleX(popoverSpaceX);
  const popoverX = leftX + popoverWidth > oriScreenW ? rightX : leftX;

  const topY = y - popoverHeight - scaleY(popoverSpaceY);
  const bottomY = y + contentHeight + scaleY(popoverSpaceY);
  let popoverY = position === 'bottom' ? bottomY : topY;
  const isOutsideY = position === 'bottom' ? bottomY > oriScreenH : topY < 0;
  if (isOutsideY) {
    popoverY = position === 'bottom' ? topY : bottomY;
  }

  return { x: popoverX, y: popoverY };
};

export const calculateArrowPosition = (
  position: TooltipPosition,
  x: number,
  y: number,
  contentWidth: number,
  contentHeight: number,
  popoverWidth: number,
  _popoverHeight: number,
  scaleX: (size: number) => number,
  scaleY: (size: number) => number,
) => {
  if (position === 'left' || position === 'right') {
    const arrowY = y + contentHeight / 2 - scaleY(13) / 2;
    return { x: position === 'left' ? x - scaleX(10) : x + contentWidth + scaleX(10), y: arrowY };
  }

  const arrowY = position === 'bottom' ? y : y;
  const arrowX = x + contentWidth / 2 - popoverWidth / 2;
  return { x: arrowX, y: arrowY };
};
