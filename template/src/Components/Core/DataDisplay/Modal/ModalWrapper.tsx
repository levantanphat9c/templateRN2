import React, { createContext, useCallback, useMemo } from 'react';

import { withMemo } from '@/HOC';

interface IProps {
  children?: React.ReactNode;
}

export const ModalContext = createContext({
  onPushStackModal: (_key: string) => {},
  onPopStackModal: (_key: string) => {},
  stackModal: [] as string[],
});

const ModalWrapper = (props: IProps) => {
  const { children } = props;
  const [stackModal, setStackModal] = React.useState([] as string[]);
  const onPushStackModal = useCallback((key: string) => {
    setStackModal(prev => [...prev, key]);
  }, []);

  const onPopStackModal = useCallback((key: string) => {
    setStackModal(prev => prev.filter(item => item !== key));
  }, []);

  const valueContext = useMemo(() => {
    return {
      onPushStackModal,
      onPopStackModal,
      stackModal,
    };
  }, [onPushStackModal, onPopStackModal, stackModal]);

  return <ModalContext.Provider value={valueContext}>{children}</ModalContext.Provider>;
};

export default withMemo(ModalWrapper);
