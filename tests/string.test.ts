import { describe, expect, it } from 'vitest';

import {
    base64Decode,
    base64Encode,
    camelCase,
    capitalize,
    countOccurrences,
    isBlank,
    isNotBlank,
    kebabCase,
    stripPrefix,
    stripSuffix,
    snakeCase,
    trim,
    truncate,
} from '../src/utils/string.js';

describe('string utilities', () => {
    it('capitalize only affects the first character', () => {
        expect(capitalize('hello')).toBe('Hello');
    });

    it('case converters transform phrases into conventional formats', () => {
        expect(snakeCase('Hello World')).toBe('hello_world');
        expect(kebabCase('Hello World')).toBe('hello-world');
        expect(camelCase('hello world example')).toBe('helloWorldExample');
    });

    it('base64 helpers round trip UTF-8 strings', () => {
        const encoded = base64Encode('Olá mundo');
        expect(base64Decode(encoded)).toBe('Olá mundo');
    });

    it('truncate shortens text and appends suffix', () => {
        expect(truncate('hello world', 5)).toBe('he...');
        expect(truncate('short', 10)).toBe('short');
        expect(() => truncate('text', -1)).toThrow(/maxLength/);
    });

    it('stripPrefix and stripSuffix remove matches only when present', () => {
        expect(stripPrefix('foobar', 'foo')).toBe('bar');
        expect(stripPrefix('bar', 'foo')).toBe('bar');
        expect(stripSuffix('README.md', '.md')).toBe('README');
        expect(stripSuffix('README', '.md')).toBe('README');
    });

    it('countOccurrences counts non-overlapping matches', () => {
        expect(countOccurrences('banana', 'an')).toBe(2);
        expect(countOccurrences('aaaa', 'aa')).toBe(2);
        expect(() => countOccurrences('text', '')).toThrow(/empty/);
    });

    it('trim safely handles undefined and whitespace-only strings', () => {
        expect(trim('  spaced  ')).toBe('spaced');
        expect(trim(undefined)).toBe('');
    });

    it('blank helpers inspect whitespace content', () => {
        expect(isBlank('   ')).toBe(true);
        expect(isBlank('value')).toBe(false);
        expect(isNotBlank('value')).toBe(true);
        expect(isNotBlank('   ')).toBe(false);
    });
});
