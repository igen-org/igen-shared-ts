import { describe, expect, it } from 'vitest';

import { base64Decode, base64Encode, camelCase, capitalize, isBlank, isNotBlank, kebabCase, snakeCase, trim } from '../src/utils/string.js';

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
