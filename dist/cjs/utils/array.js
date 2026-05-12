"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = exports.flatten = exports.range = exports.zip = exports.partition = exports.groupBy = exports.chunk = exports.difference = exports.intersection = exports.compact = exports.withoutAll = exports.without = exports.isEmpty = exports.unique = void 0;
const std_js_1 = require("./std.js");
/**
 * Returns a new array containing only the first occurrence of each item in insertion order.
 */
const unique = (array) => Array.from(new Set(array));
exports.unique = unique;
/**
 * Checks if an array exists and has no elements.
 */
const isEmpty = (array) => (0, std_js_1.isDefined)(array) && array.length === 0;
exports.isEmpty = isEmpty;
/**
 * Creates a new array without every occurrence of the provided value.
 */
const without = (array, value) => array.filter((item) => item !== value);
exports.without = without;
/**
 * Creates a new array filtering out every value present in the provided list.
 */
const withoutAll = (array, values) => array.filter((item) => !values.includes(item));
exports.withoutAll = withoutAll;
/**
 * Returns a new array excluding null and undefined values.
 */
const compact = (array) => array.filter(std_js_1.isDefined);
exports.compact = compact;
/**
 * Returns the elements shared between both arrays.
 */
const intersection = (a, b) => a.filter((item) => b.includes(item));
exports.intersection = intersection;
/**
 * Returns the elements that are present in the first array but not the second.
 */
const difference = (a, b) => a.filter((item) => !b.includes(item));
exports.difference = difference;
/**
 * Splits an array into equally sized chunks.
 * @throws Error when size is not greater than zero.
 */
const chunk = (array, size) => {
    if (size <= 0) {
        throw new Error('chunk size must be greater than 0');
    }
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
};
exports.chunk = chunk;
/**
 * Groups items by a derived key produced by `keyFn`.
 */
const groupBy = (array, keyFn) => {
    return array.reduce((acc, item) => {
        const key = keyFn(item);
        if (!(0, std_js_1.isDefined)(acc[key])) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});
};
exports.groupBy = groupBy;
/**
 * Splits an array in two lists according to predicate truthiness.
 * @returns A tuple with items passing the predicate and the remaining items.
 */
const partition = (array, predicate) => {
    const truthy = [];
    const falsy = [];
    for (const item of array) {
        if (predicate(item)) {
            truthy.push(item);
        }
        else {
            falsy.push(item);
        }
    }
    return [truthy, falsy];
};
exports.partition = partition;
/**
 * Combines two arrays into a list of tuples with matching indexes.
 */
const zip = (a, b) => {
    const length = Math.min(a.length, b.length);
    const result = [];
    for (let i = 0; i < length; i += 1) {
        result.push([a[i], b[i]]);
    }
    return result;
};
exports.zip = zip;
/**
 * Builds an array of numbers from start (inclusive) to end (exclusive).
 * @throws Error when step is zero.
 */
const range = (start, end, step = 1) => {
    if (step === 0) {
        throw new Error('range step must not be zero');
    }
    const result = [];
    const ascending = end >= start;
    const normalizedStep = ascending ? Math.abs(step) : -Math.abs(step);
    for (let value = start; ascending ? value < end : value > end; value += normalizedStep) {
        result.push(value);
    }
    return result;
};
exports.range = range;
/**
 * Flattens a single level of nesting.
 */
const flatten = (array) => array.reduce((acc, current) => acc.concat(current), []);
exports.flatten = flatten;
/**
 * Counts the number of items matching the predicate.
 */
const count = (array, predicate) => array.filter(predicate).length;
exports.count = count;
//# sourceMappingURL=array.js.map