import type { Optional } from '../types.js';
/**
 * Capitalizes only the first letter of the provided string.
 */
export declare const capitalize: (str: string) => string;
/**
 * Converts a phrase into snake_case.
 */
export declare const snakeCase: (str: string) => string;
/**
 * Converts a phrase into kebab-case.
 */
export declare const kebabCase: (str: string) => string;
/**
 * Converts a phrase into camelCase.
 */
export declare const camelCase: (str: string) => string;
/**
 * Truncates text and appends a suffix when over length.
 */
export declare const truncate: (str: string, maxLength: number, suffix?: string) => string;
/**
 * Removes the prefix when present.
 */
export declare const stripPrefix: (str: string, prefix: string) => string;
/**
 * Removes the suffix when present.
 */
export declare const stripSuffix: (str: string, suffix: string) => string;
/**
 * Counts overlapping occurrences of `search` within `str`.
 * @throws Error when `search` is empty to avoid infinite matches.
 */
export declare const countOccurrences: (str: string, search: string) => number;
/**
 * Encodes a string to base64 using UTF-8 bytes.
 */
export declare const base64Encode: (str: string) => string;
/**
 * Decodes a base64 string back to a UTF-8 string.
 */
export declare const base64Decode: (value: string) => string;
/**
 * Safely trims a string, defaulting to an empty value.
 */
export declare const trim: (str: Optional<string>) => string;
/**
 * Checks whether a string is nullish or contains only whitespace.
 */
export declare const isBlank: (str: Optional<string>) => boolean;
/**
 * Checks whether a string exists and has at least one non-whitespace character.
 */
export declare const isNotBlank: (str: Optional<string>) => boolean;
//# sourceMappingURL=string.d.ts.map