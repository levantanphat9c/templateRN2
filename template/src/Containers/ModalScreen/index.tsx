import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { RootStackScreenProps } from '@/Navigation/NavigationType';
import { ScreenNames } from '@/Navigation/RouteName';

import styles from './styles';

const ModalScreen = ({ navigation }: RootStackScreenProps<ScreenNames.ModalScreen>) => {
  const navigate = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerContent}>
        <TouchableOpacity onPress={navigate}>
          <Text>This is Modal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalScreen;
