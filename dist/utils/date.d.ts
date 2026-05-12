/**
 * Units supported by the date helpers for shifting, diffing and rounding.
 */
export type DateUnit = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
export type DateHelperOptions = {
    /**
     * When true the operations use UTC setters/getters rather than local time.
     */
    utc?: boolean;
    /**
     * Sets which weekday is considered the start of the week (0 = Sunday, 1 = Monday, ... 6 = Saturday).
     * Applies to week-based calculations in startOf/endOf/isSame.
     */
    weekStartsOn?: number;
};
/**
 * Formats a date using the Intl.DateTimeFormat API helpers.
 */
export declare const formatDate: (date: Date, locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions) => string;
/**
 * Returns a new Date representing the current instant.
 */
export declare const now: () => Date;
/**
 * Parses a date value, treating timezone-less ISO strings as UTC when requested.
 */
export declare const parseDate: (value: string | number | Date, options?: DateHelperOptions) => Date;
/**
 * Creates a new date shifted by the provided value and unit.
 * @param date Base date, defaults to `now()`.
 */
export declare const modifyDate: (value: number, unit: DateUnit, date?: Date) => Date;
/**
 * Calculates the difference between two dates in the desired unit.
 */
export declare const dateDiff: (start: Date, end: Date, unit: DateUnit) => number;
/**
 * Returns a new date pinned to the beginning of the specified unit.
 * @param options When `utc` is true calculations ignore the local timezone offset.
 */
export declare const startOf: (date: Date, unit: DateUnit, options?: DateHelperOptions) => Date;
/**
 * Returns a new date representing the end instant of a given unit.
 * @param options When `utc` is true calculations ignore the local timezone offset.
 */
export declare const endOf: (date: Date, unit: DateUnit, options?: DateHelperOptions) => Date;
/**
 * Compares two dates at the provided unit precision.
 * @param options When `utc` is true calculations ignore the local timezone offset.
 */
export declare const isSame: (a: Date, b: Date, unit: DateUnit, options?: DateHelperOptions) => boolean;
//# sourceMappingURL=date.d.ts.map