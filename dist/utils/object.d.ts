/**
 * Produces a new object overriding the provided properties on top of the original shape.
 */
export declare const clone: <T, P>(object: T, props: Partial<P>) => T & P;
/**
 * Checks if two objects have the same keys with strictly equal values.
 */
export declare const isShallowEqual: <T extends Record<PropertyKey, unknown>>(a: T, b: T) => boolean;
/**
 * Builds a new object including only the provided keys present on the source.
 */
export declare const pick: <T extends Record<PropertyKey, unknown>, K extends keyof T>(object: T, keys: readonly K[]) => Pick<T, K>;
/**
 * Builds a new object excluding the provided keys.
 */
export declare const omit: <T extends Record<PropertyKey, unknown>, K extends keyof T>(object: T, keys: readonly K[]) => Omit<T, K>;
/**
 * Converts an array of key-value tuples into an object literal.
 */
export declare const entriesToObject: <T>(entries: Array<[PropertyKey, T]>) => Record<PropertyKey, T>;
//# sourceMappingURL=object.d.ts.map