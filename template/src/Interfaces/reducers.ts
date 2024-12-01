export interface IError {
  code: number;
  message: string;
}

export const ReducerStatus = {
  IDLE: 'IDLE',
  PROCESSING: 'PROCESSING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  REFRESHING: 'REFRESHING',
  LOAD_MORE: 'LOAD_MORE',
};
export type ReducerStatus = keyof typeof ReducerStatus;

export interface IReducerState<T> {
  data: T;
  status: ReducerStatus;
  error: IError | null;
}
