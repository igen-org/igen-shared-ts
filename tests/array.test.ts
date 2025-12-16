import { describe, expect, it } from 'vitest';

import {
    chunk,
    compact,
    count,
    difference,
    flatten,
    groupBy,
    intersection,
    isEmpty,
    partition,
    range,
    unique,
    without,
    withoutAll,
    zip,
} from '../src/utils/array.js';

describe('array utilities', () => {
    it('unique keeps only first occurrence of each element', () => {
        expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
    });

    it('isEmpty only returns true for defined empty arrays', () => {
        expect(isEmpty([])).toBe(true);
        expect(isEmpty([1])).toBe(false);
        expect(isEmpty(undefined)).toBe(false);
    });

    it('without removes all occurrences of a single value', () => {
        expect(without([1, 2, 1, 3], 1)).toEqual([2, 3]);
    });

    it('withoutAll removes every element contained in the provided list', () => {
        expect(withoutAll([1, 2, 3, 4], [1, 4])).toEqual([2, 3]);
    });

    it('intersection returns only the elements present in both arrays', () => {
        expect(intersection(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['b', 'c']);
    });

    it('difference returns only elements exclusive to the first array', () => {
        expect(difference(['a', 'b', 'c'], ['b'])).toEqual(['a', 'c']);
    });

    it('compact removes nullish values', () => {
        expect(compact([1, null, 2, undefined, 3])).toEqual([1, 2, 3]);
    });

    it('chunk splits arrays into equally sized groups', () => {
        expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('chunk throws when size is not greater than zero', () => {
        expect(() => chunk([1, 2], 0)).toThrow(/chunk size/);
    });

    it('groupBy aggregates items under derived keys', () => {
        const grouped = groupBy(['ant', 'bear', 'bee'], (value) => value[0]!);
        expect(grouped).toEqual({
            a: ['ant'],
            b: ['bear', 'bee'],
        });
    });

    it('partition splits arrays into truthy and falsy buckets', () => {
        const [even, odd] = partition([1, 2, 3, 4], (value) => value % 2 === 0);
        expect(even).toEqual([2, 4]);
        expect(odd).toEqual([1, 3]);
    });

    it('count returns how many items satisfy the predicate', () => {
        expect(count([1, 2, 3, 4, 5], (value) => value > 3)).toBe(2);
        expect(count(['a', 'b', 'c'], (value) => value === 'z')).toBe(0);
    });

    it('range builds sequences respecting direction and step', () => {
        expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
        expect(range(5, 0, 2)).toEqual([5, 3, 1]);
        expect(() => range(0, 3, 0)).toThrow(/step/);
    });

    it('flatten collapses a single nested level', () => {
        expect(flatten([[1, 2], [], [3]])).toEqual([1, 2, 3]);
    });

    it('zip pairs elements using the shortest array length', () => {
        expect(zip([1, 2, 3], ['a', 'b'])).toEqual([
            [1, 'a'],
            [2, 'b'],
        ]);
    });
});
