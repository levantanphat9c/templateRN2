import React, { memo } from 'react';
import { View } from 'react-native';


import useStyles from './styles';
import { Typography } from '@/Components/Core/index';

const MoreScreen = () => {
  const { styles } = useStyles();
  

  return (
    <View style={styles.container}>
      <Typography >More screen</Typography>
    </View>
  );
};

export default memo(MoreScreen);
