import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/Components/Core';

import { IButtonConfig } from '../../type';

const LabelSingleButtonGroup = ({ label, buttonStyle, textStyle, onPress }: IButtonConfig) => {
  const { t } = useTranslation();
  return (
    <Button
      variant="CONTAINED"
      color="PRIMARY"
      buttonStyle={buttonStyle}
      textStyle={textStyle}
      onPress={onPress}
    >
      {t(label || 'LABEL_BUTTON')}
    </Button>
  );
};

export default memo(LabelSingleButtonGroup);
