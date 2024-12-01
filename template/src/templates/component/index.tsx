import React from 'react';
import { View } from 'react-native';

import { Typography } from '@/Components/Core';

import useStyles from './styles';

interface IProps {
  data: string;
}

const TemplateName = (props: IProps) => {
  const { data } = props;
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
      <Typography>{data}</Typography>
    </View>
  );
};

export default TemplateName;
