export type FixedArray<T, L extends number> = [T, ...Array<T>] & { length: L };

export type Matrix<T, R extends number, C extends number> = FixedArray<FixedArray<T, C>, R>;

export type PromiseOr<T> = T | Promise<T>;

export type ValueChanged<T> = (value: T) => unknown;
