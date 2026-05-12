"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entriesToObject = exports.omit = exports.pick = exports.isShallowEqual = exports.clone = void 0;
/**
 * Produces a new object overriding the provided properties on top of the original shape.
 */
const clone = (object, props) => ({ ...object, ...props });
exports.clone = clone;
/**
 * Checks if two objects have the same keys with strictly equal values.
 */
const isShallowEqual = (a, b) => {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
        return false;
    }
    return keysA.every((key) => Object.prototype.hasOwnProperty.call(b, key) && a[key] === b[key]);
};
exports.isShallowEqual = isShallowEqual;
/**
 * Builds a new object including only the provided keys present on the source.
 */
const pick = (object, keys) => {
    return keys.reduce((acc, key) => {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            acc[key] = object[key];
        }
        return acc;
    }, {});
};
exports.pick = pick;
/**
 * Builds a new object excluding the provided keys.
 */
const omit = (object, keys) => {
    const omitSet = new Set(keys);
    return Object.keys(object).reduce((acc, key) => {
        if (!omitSet.has(key)) {
            acc[key] = object[key];
        }
        return acc;
    }, {});
};
exports.omit = omit;
/**
 * Converts an array of key-value tuples into an object literal.
 */
const entriesToObject = (entries) => {
    return entries.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
};
exports.entriesToObject = entriesToObject;
//# sourceMappingURL=object.js.map