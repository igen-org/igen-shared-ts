import type { AnyFunction, Optional, Provider, Result } from '../types.js';
/**
 * Type guard that checks whether a value is neither null nor undefined.
 */
export declare const isDefined: <T>(value: Optional<T>) => value is T;
/**
 * Ensures a value is defined, otherwise throws with an optional custom message.
 */
export declare const assertDefined: <T>(value: Optional<T>, message?: string) => T;
/**
 * Identity helper that returns the same value received.
 */
export declare const identity: <T>(value: T) => T;
/**
 * No-operation function used as a safe default callback.
 */
export declare const noop: () => void;
/**
 * Negates the boolean result of the provided predicate while preserving argument types.
 */
export declare const not: <Args extends unknown[]>(fn: AnyFunction<Args, boolean>) => AnyFunction<Args, boolean>;
/**
 * Narrowing guard that checks if the value is a string.
 */
export declare const isString: (value: unknown) => value is string;
/**
 * Narrowing guard that checks if the value is a number.
 */
export declare const isNumber: (value: unknown) => value is number;
/**
 * Narrowing guard that checks if the value is a boolean.
 */
export declare const isBoolean: (value: unknown) => value is boolean;
/**
 * Narrowing guard that checks if the value is a symbol.
 */
export declare const isSymbol: (value: unknown) => value is symbol;
/**
 * Type guard for functions.
 */
export declare const isFunction: (value: unknown) => value is AnyFunction;
/**
 * Type guard for Date instances.
 */
export declare const isDate: (value: unknown) => value is Date;
/**
 * Type guard for regular expressions.
 */
export declare const isRegExp: (value: unknown) => value is RegExp;
/**
 * Type guard for native promises.
 */
export declare const isPromise: (value: unknown) => value is Promise<unknown>;
/**
 * Checks for non-null objects.
 */
export declare const isObject: (value: unknown) => value is Record<string, unknown>;
/**
 * Type guard for arrays.
 */
export declare const isArray: (value: unknown) => value is unknown[];
/**
 * Checks whether the value is a finite number.
 */
export declare const isSafeNumber: (value: unknown) => value is number;
/**
 * Checks whether the value is a plain object with no own properties.
 */
export declare const isEmptyObject: (value: unknown) => value is Record<string, never>;
/**
 * Checks whether the value is an object created by `{}` or `Object.create(null)`.
 */
export declare const isPlainObject: (value: unknown) => value is Record<string, unknown>;
/**
 * Wraps a successful result in a discriminated union.
 */
export declare const ok: <T>(value: T) => Result<T, never>;
/**
 * Wraps an error in a discriminated Result union.
 */
export declare const err: <E>(error: E) => Result<never, E>;
/**
 * Executes a function and captures thrown errors into a Result.
 */
export declare const fromTry: <T>(fn: Provider<T>) => Result<T, unknown>;
//# sourceMappingURL=std.d.ts.map