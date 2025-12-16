import type { Optional } from '../types.js';
import { isDefined } from './std.js';

/**
 * Capitalizes only the first letter of the provided string.
 */
export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

const splitWords = (value: string): string[] => {
    const trimmed = value.trim();
    if (!trimmed) {
        return [];
    }

    return trimmed.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g) ?? [];
};

const slugify = (value: string, separator: string): string => {
    return splitWords(value)
        .map((word) => word.toLowerCase())
        .join(separator);
};

const camelize = (value: string): string => {
    const [first, ...rest] = splitWords(value);

    if (!isDefined(first)) {
        return '';
    }

    return [first.toLowerCase(), ...rest.map((word) => capitalize(word.toLowerCase()))].join('');
};

/**
 * Converts a phrase into snake_case.
 */
export const snakeCase = (str: string): string => slugify(str, '_');

/**
 * Converts a phrase into kebab-case.
 */
export const kebabCase = (str: string): string => slugify(str, '-');

/**
 * Converts a phrase into camelCase.
 */
export const camelCase = (str: string): string => camelize(str);

/**
 * Truncates text and appends a suffix when over length.
 */
export const truncate = (str: string, maxLength: number, suffix = '...'): string => {
    if (maxLength < 0) {
        throw new Error('maxLength must be non-negative');
    }

    if (str.length <= maxLength) {
        return str;
    }

    const available = Math.max(0, maxLength - suffix.length);
    return str.slice(0, available) + suffix;
};

/**
 * Removes the prefix when present.
 */
export const stripPrefix = (str: string, prefix: string): string => (str.startsWith(prefix) ? str.slice(prefix.length) : str);

/**
 * Removes the suffix when present.
 */
export const stripSuffix = (str: string, suffix: string): string => (str.endsWith(suffix) ? str.slice(0, -suffix.length) : str);

/**
 * Counts overlapping occurrences of `search` within `str`.
 * @throws Error when `search` is empty to avoid infinite matches.
 */
export const countOccurrences = (str: string, search: string): number => {
    if (search.length === 0) {
        throw new Error('search value must not be empty');
    }

    let count = 0;
    let startIndex = 0;

    while (true) {
        const index = str.indexOf(search, startIndex);
        if (index === -1) {
            break;
        }
        count += 1;
        startIndex = index + search.length;
    }

    return count;
};

type TextEncoderCtor = new () => { encode: (value: string) => Uint8Array };
type TextDecoderCtor = new () => { decode: (value: Uint8Array) => string };
type BufferFactory = {
    from: (
        value: string | ArrayBuffer | ArrayBufferView,
        encoding?: string,
    ) => {
        toString: (encoding?: string) => string;
        buffer: ArrayBuffer;
        byteOffset: number;
        byteLength: number;
    };
};

const globalObj = globalThis as typeof globalThis & {
    TextEncoder?: TextEncoderCtor;
    TextDecoder?: TextDecoderCtor;
    Buffer?: BufferFactory;
    btoa?: (value: string) => string;
    atob?: (value: string) => string;
};

const textEncoder = globalObj.TextEncoder ? new globalObj.TextEncoder() : null;
const textDecoder = globalObj.TextDecoder ? new globalObj.TextDecoder() : null;

const bufferConstructor = globalObj.Buffer;
const btoaFn = globalObj.btoa;
const atobFn = globalObj.atob;

const encodeUtf8 = (value: string): Uint8Array => {
    if (textEncoder) {
        return textEncoder.encode(value);
    }

    if (bufferConstructor) {
        const buffer = bufferConstructor.from(value, 'utf-8');
        return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }

    throw new Error('UTF-8 encoding is not supported in this environment');
};

const decodeUtf8 = (value: Uint8Array): string => {
    if (textDecoder) {
        return textDecoder.decode(value);
    }

    if (bufferConstructor) {
        const buffer = bufferConstructor.from(value);
        return buffer.toString('utf-8');
    }

    throw new Error('UTF-8 decoding is not supported in this environment');
};

const base64FromBytes = (value: Uint8Array): string => {
    if (bufferConstructor) {
        return bufferConstructor.from(value).toString('base64');
    }

    if (btoaFn) {
        let binary = '';
        const chunkSize = 0x8000;
        for (let i = 0; i < value.length; i += chunkSize) {
            binary += String.fromCharCode(...value.subarray(i, i + chunkSize));
        }
        return btoaFn(binary);
    }

    throw new Error('Base64 encoding is not supported in this environment');
};

const base64ToBytes = (value: string): Uint8Array => {
    if (bufferConstructor) {
        const buffer = bufferConstructor.from(value, 'base64');
        return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }

    if (atobFn) {
        const binary = atobFn(value);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i += 1) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    }

    throw new Error('Base64 decoding is not supported in this environment');
};

/**
 * Encodes a string to base64 using UTF-8 bytes.
 */
export const base64Encode = (str: string): string => base64FromBytes(encodeUtf8(str));

/**
 * Decodes a base64 string back to a UTF-8 string.
 */
export const base64Decode = (value: string): string => decodeUtf8(base64ToBytes(value));

/**
 * Safely trims a string, defaulting to an empty value.
 */
export const trim = (str: Optional<string>): string => str?.trim() ?? '';

/**
 * Checks whether a string is nullish or contains only whitespace.
 */
export const isBlank = (str: Optional<string>): boolean => !isDefined(str) || str.trim().length === 0;

/**
 * Checks whether a string exists and has at least one non-whitespace character.
 */
export const isNotBlank = (str: Optional<string>): boolean => isDefined(str) && str.trim().length > 0;
