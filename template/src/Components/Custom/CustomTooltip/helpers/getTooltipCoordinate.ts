const getArea = (a: number, b: number) => a * b;

const getPointDistance = (a: number[], b: number[]) =>
  Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));

export const getElementVisibleWidth = (
  elementWidth: number,
  xOffset: number,
  ScreenWidth: number,
) => {
  // Element is fully visible OR scrolled right
  if (xOffset >= 0) {
    return xOffset + elementWidth <= ScreenWidth // is element fully visible?
      ? elementWidth // element is fully visible;
      : ScreenWidth - xOffset; // calculate visible width of scrolled element
  }
  // Element is scrolled LEFT
  return elementWidth - xOffset; // calculate visible width of scrolled element
};

const getTooltipCoordinate = (
  x: number,
  y: number,
  width: number,
  height: number,
  ScreenWidth: number,
  ScreenHeight: number,
  tooltipWidth: number,
  tooltipHeight: number,
  withPointer: boolean,
) => {
  // The following are point coordinates: [x, y]
  const center = [x + getElementVisibleWidth(width, x, ScreenWidth) / 2, y + height / 2];
  const pOne = [center[0], 0];
  const pTwo = [ScreenWidth, center[1]];
  const pThree = [center[0], ScreenHeight];
  const pFour = [0, center[1]];
  // vertices
  const vOne = getPointDistance(center, pOne);
  const vTwo = getPointDistance(center, pTwo);
  const vThree = getPointDistance(center, pThree);
  const vFour = getPointDistance(center, pFour);

  const areas = [
    getArea(vOne, vFour),
    getArea(vOne, vTwo),
    getArea(vTwo, vThree),
    getArea(vThree, vFour),
  ].map((each, index) => ({ area: each, id: index }));
  const sortedArea = areas.sort((a, b) => b.area - a.area);

  const dX = 0.001;
  const dY = height / 2;

  const directionCorrection = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];
  const dislocateReferencePoint = [
    [-tooltipWidth, -tooltipHeight],
    [0, -tooltipHeight],
    [0, 0],
    [-tooltipWidth, 0],
  ];
  // current quadrant index
  const qIndex = sortedArea[0].id;
  const getWithPointerOffsetY = () => (withPointer ? 10 * directionCorrection[qIndex][1] : 0);
  const getWithPointerOffsetX = () =>
    withPointer ? center[0] - 18 * directionCorrection[qIndex][0] : center[0];
  const newX =
    getWithPointerOffsetX() +
    (dX * directionCorrection[qIndex][0] + dislocateReferencePoint[qIndex][0]);
  return {
    x: constraintX(newX, qIndex, ScreenWidth, tooltipWidth),
    y:
      center[1] +
      (dY * directionCorrection[qIndex][1] + dislocateReferencePoint[qIndex][1]) +
      getWithPointerOffsetY(),
  };
};

const constraintX = (newX: number, qIndex: number, ScreenWidth: number, tooltipWidth: number) => {
  switch (qIndex) {
    // 0 and 3 are the left side quadrants.
    case 0:
    case 3: {
      const maxWidth = newX > ScreenWidth ? ScreenWidth - 10 : newX;
      return newX < 1 ? 10 : maxWidth;
    }
    // 1 and 2 are the right side quadrants
    case 1:
    case 2: {
      const leftOverSpace = ScreenWidth - newX;
      return leftOverSpace >= tooltipWidth ? newX : newX - (tooltipWidth - leftOverSpace + 10);
    }
    default: {
      return 0;
    }
  }
};

export default getTooltipCoordinate;
