import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Typography } from '@/Components/Core';

import { IButtonConfig } from '../../type';
import useStyles from './styles';

interface ILabelSingleButtonGroup {
  buyButtonConfig: IButtonConfig;
  sellButtonConfig: IButtonConfig;
}

const BuySellButtonGroup = ({ buyButtonConfig, sellButtonConfig }: ILabelSingleButtonGroup) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const buyButtonStyle = [styles.button, styles.buyButton, buyButtonConfig.buttonStyle];
  const sellButtonStyle = [styles.button, styles.sellButton, sellButtonConfig.buttonStyle];
  const buttonBuyTextStyle = [styles.buttonText, buyButtonConfig.textStyle];
  const buttonSellTextStyle = [styles.buttonText, sellButtonConfig.textStyle];

  return (
    <>
      <Button
        variant="CONTAINED"
        buttonStyle={buyButtonStyle}
        textStyle={buttonBuyTextStyle}
        onPress={buyButtonConfig.onPress}
      >
        <Typography variant="MEDIUM_15" color="white">
          {t('COMMON.BUY')}
        </Typography>
        {buyButtonConfig.label && (
          <Typography variant="REGULAR_13" color="white">
            {t(buyButtonConfig.label)}
          </Typography>
        )}
      </Button>
      <Button
        variant="CONTAINED"
        buttonStyle={sellButtonStyle}
        textStyle={buttonSellTextStyle}
        onPress={sellButtonConfig.onPress}
      >
        <Typography variant="MEDIUM_15" color="white">
          {t('COMMON.SELL')}
        </Typography>
        {sellButtonConfig.subLabel && (
          <Typography variant="REGULAR_13" color="white">
            {t(sellButtonConfig.subLabel)}
          </Typography>
        )}
      </Button>
    </>
  );
};

export default memo(BuySellButtonGroup);
