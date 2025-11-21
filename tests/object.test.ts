import { describe, expect, it } from 'vitest';

import { clone, entriesToObject, isShallowEqual, omit, pick } from '../src/utils/object.js';

describe('object utilities', () => {
    it('clone copies the object overriding the provided props', () => {
        const object = { a: 1, b: 2 };
        expect(clone(object, { b: 3, c: 4 })).toEqual({ a: 1, b: 3, c: 4 });
    });

    it('isShallowEqual compares only first-level keys and values', () => {
        expect(isShallowEqual({ a: 1 }, { a: 1 })).toBe(true);
        expect(isShallowEqual({ a: 1 }, { a: 2 })).toBe(false);
        expect(isShallowEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    });

    it('pick keeps only explicitly requested keys', () => {
        expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('omit drops every provided key', () => {
        expect(omit({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ a: 1, c: 3 });
    });

    it('entriesToObject builds an object from tuples', () => {
        expect(
            entriesToObject([
                ['a', 1],
                ['b', 2],
            ]),
        ).toEqual({ a: 1, b: 2 });
    });
});
