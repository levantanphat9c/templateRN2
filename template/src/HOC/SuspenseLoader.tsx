import { LazyExoticComponent, MemoExoticComponent, Suspense } from 'react';
import { Text } from 'react-native';

const SuspenseLoader =
  (Component: LazyExoticComponent<(() => JSX.Element) | MemoExoticComponent<() => JSX.Element>>) =>
  (props: JSX.IntrinsicAttributes) => (
    <Suspense fallback={<Text>Loading...</Text>}>
      <Component {...props} />
    </Suspense>
  );

export default SuspenseLoader;
