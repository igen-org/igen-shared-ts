import type { Optional, Predicate, Transformer } from '../types.js';
/**
 * Returns a new array containing only the first occurrence of each item in insertion order.
 */
export declare const unique: <T>(array: T[]) => T[];
/**
 * Checks if an array exists and has no elements.
 */
export declare const isEmpty: <T>(array: Optional<T[]>) => boolean;
/**
 * Creates a new array without every occurrence of the provided value.
 */
export declare const without: <T>(array: T[], value: T) => T[];
/**
 * Creates a new array filtering out every value present in the provided list.
 */
export declare const withoutAll: <T>(array: T[], values: T[]) => T[];
/**
 * Returns a new array excluding null and undefined values.
 */
export declare const compact: <T>(array: Array<Optional<T>>) => T[];
/**
 * Returns the elements shared between both arrays.
 */
export declare const intersection: <T>(a: T[], b: T[]) => T[];
/**
 * Returns the elements that are present in the first array but not the second.
 */
export declare const difference: <T>(a: T[], b: T[]) => T[];
/**
 * Splits an array into equally sized chunks.
 * @throws Error when size is not greater than zero.
 */
export declare const chunk: <T>(array: T[], size: number) => T[][];
/**
 * Groups items by a derived key produced by `keyFn`.
 */
export declare const groupBy: <T, K extends PropertyKey>(array: T[], keyFn: Transformer<T, K>) => Record<K, T[]>;
/**
 * Splits an array in two lists according to predicate truthiness.
 * @returns A tuple with items passing the predicate and the remaining items.
 */
export declare const partition: <T>(array: T[], predicate: Predicate<T>) => [T[], T[]];
/**
 * Combines two arrays into a list of tuples with matching indexes.
 */
export declare const zip: <A, B>(a: A[], b: B[]) => Array<[A, B]>;
/**
 * Builds an array of numbers from start (inclusive) to end (exclusive).
 * @throws Error when step is zero.
 */
export declare const range: (start: number, end: number, step?: number) => number[];
/**
 * Flattens a single level of nesting.
 */
export declare const flatten: <T>(array: T[][]) => T[];
/**
 * Counts the number of items matching the predicate.
 */
export declare const count: <T>(array: T[], predicate: Predicate<T>) => number;
//# sourceMappingURL=array.d.ts.map