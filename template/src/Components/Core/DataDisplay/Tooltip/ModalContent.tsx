import { View } from 'react-native';

import { insertObjectIfElse } from '@/Utils';

import { IProps } from '.';
import Typography from '../Typography';
import useStyles from './styles';

const ModalContent = ({
  content,
  contentVariant,
  contentColor,
}: Pick<IProps, 'content' | 'contentVariant' | 'contentColor'>) => {
  const { styles } = useStyles();
  return (
    <View
      style={insertObjectIfElse(
        typeof content === 'string',
        styles.modalContentContainer,
        styles.modalContentContainer2,
      )}
    >
      {typeof content === 'string' ? (
        <Typography variant={contentVariant} color={contentColor}>
          {content}
        </Typography>
      ) : (
        content
      )}
    </View>
  );
};

export default ModalContent;
