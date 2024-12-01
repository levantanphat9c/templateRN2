export type ExcludeKeys<T, K extends keyof T> = Exclude<keyof T, K>;
