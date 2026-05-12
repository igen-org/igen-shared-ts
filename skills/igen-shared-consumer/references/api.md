# @igen/shared API Reference

Use this reference when integrating `@igen/shared` without reading its source.

## Install and Import

```bash
pnpm add @igen/shared
```

```typescript
import { isDefined, compact, type Optional } from '@igen/shared';
```

The package exports from the root package. It publishes ESM, CommonJS, and TypeScript declarations.

## Reusable Types

```typescript
type primitive = string | number | boolean | bigint | symbol | null | undefined;
type missing = null | undefined;
type blank = missing | '';
type AnyObject<K extends PropertyKey = string, V = unknown> = Record<K, V>;
type AnyFunction<Args extends unknown[] = unknown[], Return = unknown> = (...args: Args) => Return;
type Optional<T> = T | null | undefined;
type Something<T> = Exclude<T, null | undefined>;
type Complete<T> = { [P in keyof T]: Something<T[P]> };
type Provider<T> = () => T;
type Consumer<T> = (value: T) => void;
type Transformer<T, U> = (value: T) => U;
type Predicate<T> = Transformer<T, boolean>;
type MaybePromise<T> = T | Promise<T>;
type MaybeArray<T> = T | T[];
type NonEmptyArray<T> = [T, ...T[]];
type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };
type DeepRequired<T> = { [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P] };
type Mutable<T> = { -readonly [P in keyof T]: T[P] };
type ValueOf<T> = T[keyof T];
type Brand<T, Tag extends string> = T & { readonly __brand: Tag };
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };
type SetOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type SetRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
type XOR<T, U> = mutually exclusive object union, or T | U for non-objects;
```

Use `Optional<T>` for values that may be nullish and `Result<T, E>` for explicit success/failure returns.

## Standard Helpers

```typescript
isDefined<T>(value: Optional<T>): value is T
assertDefined<T>(value: Optional<T>, message?: string): T
identity<T>(value: T): T
noop(): void
not<Args extends unknown[]>(fn: (...args: Args) => boolean): (...args: Args) => boolean
isString(value: unknown): value is string
isNumber(value: unknown): value is number
isBoolean(value: unknown): value is boolean
isSymbol(value: unknown): value is symbol
isFunction(value: unknown): value is AnyFunction
isDate(value: unknown): value is Date
isRegExp(value: unknown): value is RegExp
isPromise(value: unknown): value is Promise<unknown>
isObject(value: unknown): value is Record<string, unknown>
isArray(value: unknown): value is unknown[]
isSafeNumber(value: unknown): value is number
isEmptyObject(value: unknown): value is Record<string, never>
isPlainObject(value: unknown): value is Record<string, unknown>
ok<T>(value: T): Result<T, never>
err<E>(error: E): Result<never, E>
fromTry<T>(fn: () => T): Result<T, unknown>
```

Use `assertDefined` when absence is exceptional:

```typescript
const user = assertDefined(usersById[id], `Missing user ${id}`);
```

Use `fromTry` only for synchronous functions that may throw.

## Array Helpers

```typescript
unique<T>(array: T[]): T[]
isEmpty<T>(array: Optional<T[]>): boolean
without<T>(array: T[], value: T): T[]
withoutAll<T>(array: T[], values: T[]): T[]
compact<T>(array: Array<Optional<T>>): T[]
intersection<T>(a: T[], b: T[]): T[]
difference<T>(a: T[], b: T[]): T[]
chunk<T>(array: T[], size: number): T[][]
groupBy<T, K extends PropertyKey>(array: T[], keyFn: (value: T) => K): Record<K, T[]>
partition<T>(array: T[], predicate: (value: T) => boolean): [T[], T[]]
zip<A, B>(a: A[], b: B[]): Array<[A, B]>
range(start: number, end: number, step = 1): number[]
flatten<T>(array: T[][]): T[]
count<T>(array: T[], predicate: (value: T) => boolean): number
```

Examples:

```typescript
const ids = compact(rawIds);
const [enabled, disabled] = partition(features, (feature) => feature.enabled);
const byType = groupBy(events, (event) => event.type);
const pages = range(1, pageCount + 1);
```

Notes:

- `unique` uses `Set`, so object uniqueness is by reference.
- `intersection`, `difference`, and `withoutAll` use `Array.includes`.
- `chunk` throws when `size <= 0`.
- `range` is end-exclusive, supports descending ranges, normalizes step sign, and throws when `step === 0`.
- `isEmpty(undefined)` and `isEmpty(null)` return `false`.

## String Helpers

```typescript
capitalize(str: string): string
snakeCase(str: string): string
kebabCase(str: string): string
camelCase(str: string): string
truncate(str: string, maxLength: number, suffix = '...'): string
stripPrefix(str: string, prefix: string): string
stripSuffix(str: string, suffix: string): string
countOccurrences(str: string, search: string): number
base64Encode(str: string): string
base64Decode(value: string): string
trim(str: Optional<string>): string
isBlank(str: Optional<string>): boolean
isNotBlank(str: Optional<string>): boolean
```

Examples:

```typescript
const title = capitalize('status');
const envKey = snakeCase('API Token').toUpperCase();
const route = kebabCase('Patient Search');
const field = camelCase('patient id');
const safeLabel = truncate(label, 40);
```

Notes:

- Case conversion splits words around uppercase boundaries and digits.
- `truncate` throws when `maxLength < 0`.
- `countOccurrences` throws when `search` is empty. It advances by `search.length`, so matches are non-overlapping.
- `trim(null)` and `trim(undefined)` return `''`.
- `base64Encode` and `base64Decode` operate on UTF-8 strings.

## Number Helpers

```typescript
clamp(value: number, min: number, max: number): number
roundTo(value: number, precision = 0): number
sum(values: number[]): number
mean(values: number[]): number
toPercentage(value: number, digits = 2): string
formatNumber(value: number, locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string
```

Examples:

```typescript
const progress = clamp(rawProgress, 0, 1);
const display = toPercentage(progress, 1);
const average = mean(scores);
```

Notes:

- `mean([])` throws.
- `toPercentage(0.1234, 2)` returns `'12.34%'`.
- `formatNumber` delegates to `Intl.NumberFormat`.

## Object Helpers

```typescript
clone<T, P>(object: T, props: Partial<P>): T & P
isShallowEqual<T extends Record<PropertyKey, unknown>>(a: T, b: T): boolean
pick<T extends Record<PropertyKey, unknown>, K extends keyof T>(object: T, keys: readonly K[]): Pick<T, K>
omit<T extends Record<PropertyKey, unknown>, K extends keyof T>(object: T, keys: readonly K[]): Omit<T, K>
entriesToObject<T>(entries: Array<[PropertyKey, T]>): Record<PropertyKey, T>
```

Examples:

```typescript
const publicUser = omit(user, ['passwordHash'] as const);
const payload = pick(form, ['name', 'email'] as const);
const updated = clone(existing, { status: 'active' });
```

Notes:

- `clone` is a shallow object spread with overrides.
- `isShallowEqual` compares own enumerable string keys with strict equality.
- `pick` ignores requested keys that are not own properties.

## Date Helpers

```typescript
type DateUnit = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
type DateHelperOptions = { utc?: boolean; weekStartsOn?: number };

formatDate(date: Date, locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string
now(): Date
parseDate(value: string | number | Date, options?: DateHelperOptions): Date
modifyDate(value: number, unit: DateUnit, date?: Date): Date
dateDiff(start: Date, end: Date, unit: DateUnit): number
startOf(date: Date, unit: DateUnit, options?: DateHelperOptions): Date
endOf(date: Date, unit: DateUnit, options?: DateHelperOptions): Date
isSame(a: Date, b: Date, unit: DateUnit, options?: DateHelperOptions): boolean
```

Examples:

```typescript
const parsed = parseDate('2026-05-12T12:30:00', { utc: true });
const start = startOf(parsed, 'week', { utc: true, weekStartsOn: 1 });
const end = endOf(parsed, 'day', { utc: true });
const days = dateDiff(start, end, 'day');
```

Notes:

- Helpers return new `Date` instances and do not mutate the input date.
- `modifyDate(value, unit, date = now())` currently does not accept `DateHelperOptions`.
- `dateDiff` returns fractional values when the dates do not align exactly.
- `dateDiff` for `month` and `year` accounts for calendar month lengths.
- `startOf`/`endOf` week calculations default to Sunday (`weekStartsOn: 0`).
- With `parseDate(value, { utc: true })`, timezone-less ISO date-time strings are parsed as UTC. Date-only strings still follow JavaScript `Date` parsing behavior.

## Migration Guidance

Prefer replacing local utilities with these exports when the behavior matches. Keep project-local helpers only when the consuming app needs different semantics, such as deep equality, deep clone, locale-specific parsing, async `Result` capture, or overlapping substring counts.
