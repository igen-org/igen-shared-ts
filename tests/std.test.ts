import { describe, expect, it, vi } from 'vitest';

import {
    assertDefined,
    err,
    fromTry,
    identity,
    isArray,
    isBoolean,
    isDate,
    isDefined,
    isEmptyObject,
    isFunction,
    isNumber,
    isObject,
    isPlainObject,
    isPromise,
    isRegExp,
    isSafeNumber,
    isString,
    isSymbol,
    noop,
    not,
    ok,
} from '../src/utils/std.js';

describe('std utilities', () => {
    it('isDefined detects nullish values', () => {
        expect(isDefined(0)).toBe(true);
        expect(isDefined(null)).toBe(false);
    });

    it('assertDefined returns the value when present or throws when missing', () => {
        expect(assertDefined('value')).toBe('value');
        expect(() => assertDefined(undefined, 'missing')).toThrow(/missing/);
    });

    it('identity returns exactly the provided value', () => {
        const obj = { a: 1 };
        expect(identity(obj)).toBe(obj);
    });

    it('noop performs no operation and returns void', () => {
        expect(noop()).toBeUndefined();
    });

    it('not negates predicate results and forwards arguments', () => {
        const predicate = vi.fn((value: number) => value > 0);
        const negated = not(predicate);

        expect(negated(-1)).toBe(true);
        expect(predicate).toHaveBeenCalledWith(-1);
    });

    it('type guards identify primitive kinds', () => {
        expect(isString('hello')).toBe(true);
        expect(isNumber(123)).toBe(true);
        expect(isBoolean(false)).toBe(true);
        expect(isSymbol(Symbol('s'))).toBe(true);
        expect(isFunction(() => 1)).toBe(true);
    });

    it('type guards detect complex instances', () => {
        expect(isDate(new Date())).toBe(true);
        expect(isRegExp(/test/)).toBe(true);
        expect(isPromise(Promise.resolve())).toBe(true);
    });

    it('object helpers differentiate arrays, objects and empty objects', () => {
        expect(isObject({})).toBe(true);
        expect(isObject(null)).toBe(false);
        expect(isArray([])).toBe(true);
        expect(isSafeNumber(42)).toBe(true);
        expect(isSafeNumber(Infinity)).toBe(false);
        expect(isEmptyObject({})).toBe(true);
        expect(isEmptyObject({ a: 1 })).toBe(false);
    });

    it('isPlainObject detects objects created without custom prototypes', () => {
        expect(isPlainObject({})).toBe(true);
        expect(isPlainObject(Object.create(null))).toBe(true);
        // Class instances should not count as plain objects.
        class Custom {}
        expect(isPlainObject(new Custom())).toBe(false);
    });

    it('ok and err wrap values in Result discriminated unions', () => {
        expect(ok(123)).toEqual({ ok: true, value: 123 });
        expect(err(new Error('boom'))).toEqual({ ok: false, error: new Error('boom') });
    });

    it('fromTry captures thrown errors into Result', () => {
        expect(fromTry(() => 5)).toEqual({ ok: true, value: 5 });
        const result = fromTry(() => {
            throw new Error('fail');
        });
        expect(result.ok).toBe(false);
        if (!result.ok) {
            expect((result.error as Error).message).toBe('fail');
        }
    });
});
