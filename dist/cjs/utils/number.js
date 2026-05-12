"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatNumber = exports.toPercentage = exports.mean = exports.sum = exports.roundTo = exports.clamp = void 0;
/**
 * Restricts a number to stay within the inclusive [min, max] range.
 */
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
exports.clamp = clamp;
/**
 * Rounds a number to the requested decimal precision.
 */
const roundTo = (value, precision = 0) => {
    const factor = 10 ** precision;
    return Math.round(value * factor) / factor;
};
exports.roundTo = roundTo;
/**
 * Adds together every value in the provided list.
 */
const sum = (values) => values.reduce((total, current) => total + current, 0);
exports.sum = sum;
/**
 * Calculates the arithmetic mean of all numbers.
 * @throws Error when the list is empty.
 */
const mean = (values) => {
    if (values.length === 0) {
        throw new Error('Cannot compute mean of an empty array');
    }
    return (0, exports.sum)(values) / values.length;
};
exports.mean = mean;
/**
 * Converts a ratio to a percentage string with the given precision.
 */
const toPercentage = (value, digits = 2) => `${(value * 100).toFixed(digits)}%`;
exports.toPercentage = toPercentage;
/**
 * Formats a number using Intl.NumberFormat with the provided options.
 */
const formatNumber = (value, locales, options) => {
    return new Intl.NumberFormat(locales, options).format(value);
};
exports.formatNumber = formatNumber;
//# sourceMappingURL=number.js.map