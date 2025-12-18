export type primitive = string | number | boolean | bigint | symbol | null | undefined;
export type missing = null | undefined;
export type something = Something<primitive | object>;
export type blank = missing | '';

export type AnyObject<K extends PropertyKey = string, V = unknown> = Record<K, V>;
export type AnyFunction<Args extends unknown[] = unknown[], Return = unknown> = (...args: Args) => Return;
export type Optional<T> = T | missing;
export type Something<T> = Exclude<T, missing>;
export type Complete<T> = { [P in keyof T]: Something<T[P]> };
export type Json<T> = { [P in keyof T]: T[P] extends Array<infer U> ? Array<U> | null : Json<T[P]> | null };
export type Provider<T> = () => T;
export type Consumer<T> = (value: T) => void;
export type Transformer<T, U> = (value: T) => U;
export type Predicate<T> = Transformer<T, boolean>;
export type MaybePromise<T> = T | Promise<T>;
export type MaybeArray<T> = T | T[];
export type NonEmptyArray<T> = [T, ...T[]];

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

export type ValueOf<T> = T[keyof T];

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type Brand<T, Tag extends string> = T & { readonly __brand: Tag };

export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

export type SetOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type SetRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export type XOR<T, U> = T extends object ? (U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U) : T | U;
