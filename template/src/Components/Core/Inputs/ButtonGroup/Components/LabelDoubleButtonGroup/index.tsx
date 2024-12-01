import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/Components/Core';

import { IButtonConfig } from '../../type';
import useStyles from './styles';

interface ILabelSingleButtonGroup {
  leftButtonConfig: IButtonConfig;
  rightButtonConfig: IButtonConfig;
}

const LabelDoubleButtonGroup = ({
  leftButtonConfig,
  rightButtonConfig,
}: ILabelSingleButtonGroup) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const leftButtonStyle = [styles.button, styles.leftButton, leftButtonConfig.buttonStyle];
  const rightButtonStyle = [styles.button, rightButtonConfig.buttonStyle];

  return (
    <>
      <Button
        variant="CONTAINED"
        color="SECONDARY"
        buttonStyle={leftButtonStyle}
        textStyle={leftButtonConfig.textStyle}
      >
        {t(leftButtonConfig.label || 'LABEL_BUTTON')}
      </Button>
      <Button
        variant="CONTAINED"
        color="PRIMARY"
        buttonStyle={rightButtonStyle}
        textStyle={rightButtonConfig.textStyle}
      >
        {t(rightButtonConfig.label || 'LABEL_BUTTON')}
      </Button>
    </>
  );
};

export default memo(LabelDoubleButtonGroup);
