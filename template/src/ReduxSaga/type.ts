import { PersistConfig } from 'redux-persist';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IPersistConfig<S, RS = any, HSS = any, ESS = any>
  extends PersistConfig<S, RS, HSS, ESS> {
  readonly whitelist?: Extract<keyof S, string>[];
  readonly blacklist?: Extract<keyof S, string>[];
}
