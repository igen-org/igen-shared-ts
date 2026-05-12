"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSame = exports.endOf = exports.startOf = exports.dateDiff = exports.modifyDate = exports.parseDate = exports.now = exports.formatDate = void 0;
const MILLISECOND_IN_SECOND = 1000;
const MILLISECOND_IN_MINUTE = MILLISECOND_IN_SECOND * 60;
const MILLISECOND_IN_HOUR = MILLISECOND_IN_MINUTE * 60;
const MILLISECOND_IN_DAY = MILLISECOND_IN_HOUR * 24;
const MILLISECOND_IN_WEEK = MILLISECOND_IN_DAY * 7;
const cloneDate = (date) => new Date(date.getTime());
const assertUnsupportedUnit = (_unit) => {
    void _unit;
    throw new Error('Unsupported DateUnit');
};
const ISO_TIMEZONE_PATTERN = /(?:Z|[+-]\d{2}:?\d{2})$/i;
const ISO_HAS_TIME = /T/;
const parseDateString = (value, asUtc) => {
    const trimmed = value.trim();
    const hasTime = ISO_HAS_TIME.test(trimmed);
    const hasTimezone = ISO_TIMEZONE_PATTERN.test(trimmed);
    if (asUtc && hasTime && !hasTimezone) {
        return new Date(`${trimmed}Z`);
    }
    return new Date(trimmed);
};
const shiftDate = (date, value, unit, options) => {
    const updated = cloneDate(date);
    const useUtc = options?.utc === true;
    switch (unit) {
        case 'millisecond':
            if (useUtc) {
                updated.setUTCMilliseconds(updated.getUTCMilliseconds() + value);
            }
            else {
                updated.setMilliseconds(updated.getMilliseconds() + value);
            }
            break;
        case 'second':
            if (useUtc) {
                updated.setUTCSeconds(updated.getUTCSeconds() + value);
            }
            else {
                updated.setSeconds(updated.getSeconds() + value);
            }
            break;
        case 'minute':
            if (useUtc) {
                updated.setUTCMinutes(updated.getUTCMinutes() + value);
            }
            else {
                updated.setMinutes(updated.getMinutes() + value);
            }
            break;
        case 'hour':
            if (useUtc) {
                updated.setUTCHours(updated.getUTCHours() + value);
            }
            else {
                updated.setHours(updated.getHours() + value);
            }
            break;
        case 'day':
            if (useUtc) {
                updated.setUTCDate(updated.getUTCDate() + value);
            }
            else {
                updated.setDate(updated.getDate() + value);
            }
            break;
        case 'week':
            if (useUtc) {
                updated.setUTCDate(updated.getUTCDate() + value * 7);
            }
            else {
                updated.setDate(updated.getDate() + value * 7);
            }
            break;
        case 'month':
            if (useUtc) {
                updated.setUTCMonth(updated.getUTCMonth() + value);
            }
            else {
                updated.setMonth(updated.getMonth() + value);
            }
            break;
        case 'year':
            if (useUtc) {
                updated.setUTCFullYear(updated.getUTCFullYear() + value);
            }
            else {
                updated.setFullYear(updated.getFullYear() + value);
            }
            break;
        default:
            return assertUnsupportedUnit(unit);
    }
    return updated;
};
const diffInMonths = (start, end) => {
    if (start.getTime() === end.getTime()) {
        return 0;
    }
    const sign = end > start ? 1 : -1;
    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const anchor = shiftDate(start, months, 'month');
    if ((sign > 0 && end < anchor) || (sign < 0 && end > anchor)) {
        months -= sign;
    }
    const adjustedAnchor = shiftDate(start, months, 'month');
    const next = shiftDate(adjustedAnchor, sign, 'month');
    const interval = next.getTime() - adjustedAnchor.getTime();
    if (interval === 0) {
        return months;
    }
    return months + ((end.getTime() - adjustedAnchor.getTime()) / interval) * sign;
};
/**
 * Formats a date using the Intl.DateTimeFormat API helpers.
 */
const formatDate = (date, locales, options) => {
    return new Intl.DateTimeFormat(locales, options).format(date);
};
exports.formatDate = formatDate;
/**
 * Returns a new Date representing the current instant.
 */
const now = () => new Date();
exports.now = now;
/**
 * Parses a date value, treating timezone-less ISO strings as UTC when requested.
 */
const parseDate = (value, options) => {
    if (value instanceof Date) {
        return cloneDate(value);
    }
    if (typeof value === 'number') {
        return new Date(value);
    }
    return parseDateString(value, options?.utc === true);
};
exports.parseDate = parseDate;
/**
 * Creates a new date shifted by the provided value and unit.
 * @param date Base date, defaults to `now()`.
 */
const modifyDate = (value, unit, date = (0, exports.now)()) => shiftDate(date, value, unit);
exports.modifyDate = modifyDate;
/**
 * Calculates the difference between two dates in the desired unit.
 */
const dateDiff = (start, end, unit) => {
    const diffMilliseconds = end.getTime() - start.getTime();
    switch (unit) {
        case 'millisecond':
            return diffMilliseconds;
        case 'second':
            return diffMilliseconds / MILLISECOND_IN_SECOND;
        case 'minute':
            return diffMilliseconds / MILLISECOND_IN_MINUTE;
        case 'hour':
            return diffMilliseconds / MILLISECOND_IN_HOUR;
        case 'day':
            return diffMilliseconds / MILLISECOND_IN_DAY;
        case 'week':
            return diffMilliseconds / MILLISECOND_IN_WEEK;
        case 'month':
            return diffInMonths(start, end);
        case 'year':
            return diffInMonths(start, end) / 12;
        default:
            return assertUnsupportedUnit(unit);
    }
};
exports.dateDiff = dateDiff;
/**
 * Returns a new date pinned to the beginning of the specified unit.
 * @param options When `utc` is true calculations ignore the local timezone offset.
 */
const startOf = (date, unit, options) => {
    const result = cloneDate(date);
    const useUtc = options?.utc === true;
    switch (unit) {
        case 'millisecond':
            return result;
        case 'second':
            if (useUtc) {
                result.setUTCMilliseconds(0);
            }
            else {
                result.setMilliseconds(0);
            }
            return result;
        case 'minute':
            if (useUtc) {
                result.setUTCSeconds(0, 0);
            }
            else {
                result.setSeconds(0, 0);
            }
            return result;
        case 'hour':
            if (useUtc) {
                result.setUTCMinutes(0, 0, 0);
            }
            else {
                result.setMinutes(0, 0, 0);
            }
            return result;
        case 'day':
            if (useUtc) {
                result.setUTCHours(0, 0, 0, 0);
            }
            else {
                result.setHours(0, 0, 0, 0);
            }
            return result;
        case 'week': {
            const startOfDay = (0, exports.startOf)(date, 'day', options);
            const day = useUtc ? startOfDay.getUTCDay() : startOfDay.getDay();
            const weekStart = options?.weekStartsOn ?? 0;
            const offset = (day - weekStart + 7) % 7;
            return shiftDate(startOfDay, -offset, 'day', options);
        }
        case 'month':
            if (useUtc) {
                result.setUTCDate(1);
                result.setUTCHours(0, 0, 0, 0);
            }
            else {
                result.setDate(1);
                result.setHours(0, 0, 0, 0);
            }
            return result;
        case 'year':
            if (useUtc) {
                result.setUTCMonth(0, 1);
                result.setUTCHours(0, 0, 0, 0);
            }
            else {
                result.setMonth(0, 1);
                result.setHours(0, 0, 0, 0);
            }
            return result;
        default:
            return assertUnsupportedUnit(unit);
    }
};
exports.startOf = startOf;
/**
 * Returns a new date representing the end instant of a given unit.
 * @param options When `utc` is true calculations ignore the local timezone offset.
 */
const endOf = (date, unit, options) => {
    if (unit === 'millisecond') {
        return cloneDate(date);
    }
    const nextStart = shiftDate((0, exports.startOf)(date, unit, options), 1, unit, options);
    return shiftDate(nextStart, -1, 'millisecond', options);
};
exports.endOf = endOf;
/**
 * Compares two dates at the provided unit precision.
 * @param options When `utc` is true calculations ignore the local timezone offset.
 */
const isSame = (a, b, unit, options) => {
    return (0, exports.startOf)(a, unit, options).getTime() === (0, exports.startOf)(b, unit, options).getTime();
};
exports.isSame = isSame;
//# sourceMappingURL=date.js.map