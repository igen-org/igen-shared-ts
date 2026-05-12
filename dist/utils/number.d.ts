/**
 * Restricts a number to stay within the inclusive [min, max] range.
 */
export declare const clamp: (value: number, min: number, max: number) => number;
/**
 * Rounds a number to the requested decimal precision.
 */
export declare const roundTo: (value: number, precision?: number) => number;
/**
 * Adds together every value in the provided list.
 */
export declare const sum: (values: number[]) => number;
/**
 * Calculates the arithmetic mean of all numbers.
 * @throws Error when the list is empty.
 */
export declare const mean: (values: number[]) => number;
/**
 * Converts a ratio to a percentage string with the given precision.
 */
export declare const toPercentage: (value: number, digits?: number) => string;
/**
 * Formats a number using Intl.NumberFormat with the provided options.
 */
export declare const formatNumber: (value: number, locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions) => string;
//# sourceMappingURL=number.d.ts.map