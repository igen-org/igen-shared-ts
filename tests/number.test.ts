import { describe, expect, it } from 'vitest';

import { clamp, formatNumber, mean, roundTo, sum, toPercentage } from '../src/utils/number.js';

describe('number utilities', () => {
    it('clamp limits numbers to the provided range', () => {
        expect(clamp(5, 0, 10)).toBe(5);
        expect(clamp(-5, 0, 10)).toBe(0);
        expect(clamp(15, 0, 10)).toBe(10);
    });

    it('roundTo rounds to the requested precision', () => {
        expect(roundTo(1.2345, 2)).toBe(1.23);
        expect(roundTo(1.2355, 2)).toBe(1.24);
        expect(roundTo(12.5)).toBe(13);
    });

    it('sum totals every value in the provided list', () => {
        expect(sum([1, 2, 3, 4])).toBe(10);
    });

    it('mean computes the arithmetic average', () => {
        expect(mean([2, 4, 6])).toBe(4);
        expect(() => mean([])).toThrow(/mean of an empty array/);
    });

    it('toPercentage renders ratios as percentage strings', () => {
        expect(toPercentage(0.1234)).toBe('12.34%');
        expect(toPercentage(0.5, 0)).toBe('50%');
    });

    it('formatNumber delegates to Intl.NumberFormat', () => {
        expect(formatNumber(1234.5, 'en-US', { minimumFractionDigits: 1 })).toBe('1,234.5');
    });
});
