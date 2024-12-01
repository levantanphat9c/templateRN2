import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { Icon } from '@/Components/Core';
import { IconNames } from '@/Constants';

import useStyles from './styles';

const TextFieldButtonGroup = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} multiline placeholder={t('WRITE_COMMENT')} />
      <TouchableOpacity style={styles.iconContainer}>
        <Icon icon={IconNames.Gallery} size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default memo(TextFieldButtonGroup);
