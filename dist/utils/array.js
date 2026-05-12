import { isDefined } from './std.js';
/**
 * Returns a new array containing only the first occurrence of each item in insertion order.
 */
export const unique = (array) => Array.from(new Set(array));
/**
 * Checks if an array exists and has no elements.
 */
export const isEmpty = (array) => isDefined(array) && array.length === 0;
/**
 * Creates a new array without every occurrence of the provided value.
 */
export const without = (array, value) => array.filter((item) => item !== value);
/**
 * Creates a new array filtering out every value present in the provided list.
 */
export const withoutAll = (array, values) => array.filter((item) => !values.includes(item));
/**
 * Returns a new array excluding null and undefined values.
 */
export const compact = (array) => array.filter(isDefined);
/**
 * Returns the elements shared between both arrays.
 */
export const intersection = (a, b) => a.filter((item) => b.includes(item));
/**
 * Returns the elements that are present in the first array but not the second.
 */
export const difference = (a, b) => a.filter((item) => !b.includes(item));
/**
 * Splits an array into equally sized chunks.
 * @throws Error when size is not greater than zero.
 */
export const chunk = (array, size) => {
    if (size <= 0) {
        throw new Error('chunk size must be greater than 0');
    }
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
};
/**
 * Groups items by a derived key produced by `keyFn`.
 */
export const groupBy = (array, keyFn) => {
    return array.reduce((acc, item) => {
        const key = keyFn(item);
        if (!isDefined(acc[key])) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});
};
/**
 * Splits an array in two lists according to predicate truthiness.
 * @returns A tuple with items passing the predicate and the remaining items.
 */
export const partition = (array, predicate) => {
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
/**
 * Combines two arrays into a list of tuples with matching indexes.
 */
export const zip = (a, b) => {
    const length = Math.min(a.length, b.length);
    const result = [];
    for (let i = 0; i < length; i += 1) {
        result.push([a[i], b[i]]);
    }
    return result;
};
/**
 * Builds an array of numbers from start (inclusive) to end (exclusive).
 * @throws Error when step is zero.
 */
export const range = (start, end, step = 1) => {
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
/**
 * Flattens a single level of nesting.
 */
export const flatten = (array) => array.reduce((acc, current) => acc.concat(current), []);
/**
 * Counts the number of items matching the predicate.
 */
export const count = (array, predicate) => array.filter(predicate).length;
//# sourceMappingURL=array.js.map