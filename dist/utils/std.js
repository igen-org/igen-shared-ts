/**
 * Type guard that checks whether a value is neither null nor undefined.
 */
export const isDefined = (value) => value !== undefined && value !== null;
/**
 * Ensures a value is defined, otherwise throws with an optional custom message.
 */
export const assertDefined = (value, message) => {
    if (!isDefined(value)) {
        throw new Error(message ?? 'Value is undefined or null');
    }
    return value;
};
/**
 * Identity helper that returns the same value received.
 */
export const identity = (value) => value;
/**
 * No-operation function used as a safe default callback.
 */
export const noop = () => { };
/**
 * Negates the boolean result of the provided predicate while preserving argument types.
 */
export const not = (fn) => {
    return (...args) => !fn(...args);
};
/**
 * Narrowing guard that checks if the value is a string.
 */
export const isString = (value) => typeof value === 'string';
/**
 * Narrowing guard that checks if the value is a number.
 */
export const isNumber = (value) => typeof value === 'number';
/**
 * Narrowing guard that checks if the value is a boolean.
 */
export const isBoolean = (value) => typeof value === 'boolean';
/**
 * Narrowing guard that checks if the value is a symbol.
 */
export const isSymbol = (value) => typeof value === 'symbol';
/**
 * Type guard for functions.
 */
export const isFunction = (value) => typeof value === 'function';
/**
 * Type guard for Date instances.
 */
export const isDate = (value) => value instanceof Date;
/**
 * Type guard for regular expressions.
 */
export const isRegExp = (value) => value instanceof RegExp;
/**
 * Type guard for native promises.
 */
export const isPromise = (value) => value instanceof Promise;
/**
 * Checks for non-null objects.
 */
export const isObject = (value) => typeof value === 'object' && value !== null;
/**
 * Type guard for arrays.
 */
export const isArray = (value) => Array.isArray(value);
/**
 * Checks whether the value is a finite number.
 */
export const isSafeNumber = (value) => typeof value === 'number' && isFinite(value);
/**
 * Checks whether the value is a plain object with no own properties.
 */
export const isEmptyObject = (value) => isObject(value) && Object.keys(value).length === 0;
/**
 * Checks whether the value is an object created by `{}` or `Object.create(null)`.
 */
export const isPlainObject = (value) => {
    if (!isObject(value)) {
        return false;
    }
    const proto = Reflect.getPrototypeOf(value);
    return proto === null || proto === Object.prototype;
};
/**
 * Wraps a successful result in a discriminated union.
 */
export const ok = (value) => ({ ok: true, value });
/**
 * Wraps an error in a discriminated Result union.
 */
export const err = (error) => ({ ok: false, error });
/**
 * Executes a function and captures thrown errors into a Result.
 */
export const fromTry = (fn) => {
    try {
        return ok(fn());
    }
    catch (error) {
        return err(error);
    }
};
//# sourceMappingURL=std.js.map