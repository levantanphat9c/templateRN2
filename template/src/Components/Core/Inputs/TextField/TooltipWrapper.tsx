import React from 'react';

import { useColor } from '@/Hooks';

import { CustomTooltip } from '../../../Custom';
import Typography from '../../DataDisplay/Typography';

type Props = {
  children: React.ReactNode;
  tooltipText?: string;
};

const TooltipWrapper = (props: Props) => {
  const [show, setShow] = React.useState(false);
  const { dynamicColor } = useColor();
  return (
    <CustomTooltip
      visible={show}
      onClose={() => setShow(false)}
      onOpen={() => setShow(true)}
      backgroundColor={dynamicColor.Main.white}
      pointerColor={dynamicColor.Main.white}
      popover={
        <Typography variant={'REGULAR_14'} color={dynamicColor.UI.textContent}>
          {props.tooltipText}
        </Typography>
      }
    >
      {props.children}
    </CustomTooltip>
  );
};

export default TooltipWrapper;
