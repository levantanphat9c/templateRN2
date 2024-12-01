import { PayloadAction } from '@reduxjs/toolkit';

export type Payload<T> = PayloadAction<T>;

export type ArrayElement<
  ArrayType extends readonly unknown[],
  // tslint:disable-next-line: array-type
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSON_TYPE = { [key: string]: any };
