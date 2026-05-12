"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromTry = exports.err = exports.ok = exports.isPlainObject = exports.isEmptyObject = exports.isSafeNumber = exports.isArray = exports.isObject = exports.isPromise = exports.isRegExp = exports.isDate = exports.isFunction = exports.isSymbol = exports.isBoolean = exports.isNumber = exports.isString = exports.not = exports.noop = exports.identity = exports.assertDefined = exports.isDefined = void 0;
/**
 * Type guard that checks whether a value is neither null nor undefined.
 */
const isDefined = (value) => value !== undefined && value !== null;
exports.isDefined = isDefined;
/**
 * Ensures a value is defined, otherwise throws with an optional custom message.
 */
const assertDefined = (value, message) => {
    if (!(0, exports.isDefined)(value)) {
        throw new Error(message ?? 'Value is undefined or null');
    }
    return value;
};
exports.assertDefined = assertDefined;
/**
 * Identity helper that returns the same value received.
 */
const identity = (value) => value;
exports.identity = identity;
/**
 * No-operation function used as a safe default callback.
 */
const noop = () => { };
exports.noop = noop;
/**
 * Negates the boolean result of the provided predicate while preserving argument types.
 */
const not = (fn) => {
    return (...args) => !fn(...args);
};
exports.not = not;
/**
 * Narrowing guard that checks if the value is a string.
 */
const isString = (value) => typeof value === 'string';
exports.isString = isString;
/**
 * Narrowing guard that checks if the value is a number.
 */
const isNumber = (value) => typeof value === 'number';
exports.isNumber = isNumber;
/**
 * Narrowing guard that checks if the value is a boolean.
 */
const isBoolean = (value) => typeof value === 'boolean';
exports.isBoolean = isBoolean;
/**
 * Narrowing guard that checks if the value is a symbol.
 */
const isSymbol = (value) => typeof value === 'symbol';
exports.isSymbol = isSymbol;
/**
 * Type guard for functions.
 */
const isFunction = (value) => typeof value === 'function';
exports.isFunction = isFunction;
/**
 * Type guard for Date instances.
 */
const isDate = (value) => value instanceof Date;
exports.isDate = isDate;
/**
 * Type guard for regular expressions.
 */
const isRegExp = (value) => value instanceof RegExp;
exports.isRegExp = isRegExp;
/**
 * Type guard for native promises.
 */
const isPromise = (value) => value instanceof Promise;
exports.isPromise = isPromise;
/**
 * Checks for non-null objects.
 */
const isObject = (value) => typeof value === 'object' && value !== null;
exports.isObject = isObject;
/**
 * Type guard for arrays.
 */
const isArray = (value) => Array.isArray(value);
exports.isArray = isArray;
/**
 * Checks whether the value is a finite number.
 */
const isSafeNumber = (value) => typeof value === 'number' && isFinite(value);
exports.isSafeNumber = isSafeNumber;
/**
 * Checks whether the value is a plain object with no own properties.
 */
const isEmptyObject = (value) => (0, exports.isObject)(value) && Object.keys(value).length === 0;
exports.isEmptyObject = isEmptyObject;
/**
 * Checks whether the value is an object created by `{}` or `Object.create(null)`.
 */
const isPlainObject = (value) => {
    if (!(0, exports.isObject)(value)) {
        return false;
    }
    const proto = Reflect.getPrototypeOf(value);
    return proto === null || proto === Object.prototype;
};
exports.isPlainObject = isPlainObject;
/**
 * Wraps a successful result in a discriminated union.
 */
const ok = (value) => ({ ok: true, value });
exports.ok = ok;
/**
 * Wraps an error in a discriminated Result union.
 */
const err = (error) => ({ ok: false, error });
exports.err = err;
/**
 * Executes a function and captures thrown errors into a Result.
 */
const fromTry = (fn) => {
    try {
        return (0, exports.ok)(fn());
    }
    catch (error) {
        return (0, exports.err)(error);
    }
};
exports.fromTry = fromTry;
//# sourceMappingURL=std.js.map