---
name: igen-shared-consumer
description: Use this skill when integrating the @igen/shared TypeScript package into another project, including installing it, importing shared utility functions and reusable types, using Result helpers, array/string/date/number/object helpers, or replacing local utility code without inspecting the shared source repository.
---

# @igen/shared Consumer

Use `@igen/shared` for dependency-free TypeScript utility functions and reusable types. Prefer this skill over opening the package repo for routine consumer integrations.

## Workflow

1. Install the package with the target repo's package manager:

```bash
pnpm add @igen/shared
```

Use `npm install @igen/shared` or `yarn add @igen/shared` when the target repo does not use pnpm.

2. Import from the root package:

```typescript
import { compact, isDefined, ok, type Optional, type Result } from '@igen/shared';
```

3. Use the exported helpers instead of creating local one-off utilities for common operations such as nullish checks, `Result` wrappers, array grouping, case conversion, date rounding, number formatting, and object picking/omitting.

4. Keep runtime assumptions narrow: the package has no runtime dependencies and ships both ESM and CommonJS entrypoints. Do not add build steps to consuming projects just to use it.

## Common Patterns

Filter nullish values:

```typescript
import { compact, type Optional } from '@igen/shared';

const ids: Array<Optional<string>> = ['A1', null, 'B2', undefined];
const definedIds = compact(ids);
```

Use `Result` helpers:

```typescript
import { fromTry, type Result } from '@igen/shared';

const result: Result<number, unknown> = fromTry(() => JSON.parse('42') as number);
if (!result.ok) {
    throw result.error;
}
```

Normalize strings:

```typescript
import { camelCase, isBlank, kebabCase, trim } from '@igen/shared';

const value = trim(input);
const key = camelCase(value);
const slug = kebabCase(value);
const missing = isBlank(input);
```

Work with dates:

```typescript
import { dateDiff, parseDate, startOf } from '@igen/shared';

const createdAt = parseDate('2026-05-12T10:00:00', { utc: true });
const day = startOf(createdAt, 'day', { utc: true });
const ageInDays = dateDiff(day, new Date(), 'day');
```

Transform collections:

```typescript
import { groupBy, range, unique } from '@igen/shared';

const uniqueTags = unique(tags);
const usersByRole = groupBy(users, (user) => user.role);
const pageIndexes = range(0, totalPages);
```

## Important Behavior

- `isDefined` narrows away only `null` and `undefined`; it does not reject `''`, `0`, or `false`.
- `compact` removes only `null` and `undefined`.
- `isBlank` treats `null`, `undefined`, empty strings, and whitespace-only strings as blank.
- `parseDate(value, { utc: true })` treats timezone-less ISO date-time strings as UTC by appending `Z` before parsing.
- `startOf`, `endOf`, and `isSame` accept `{ utc: true, weekStartsOn?: 0 | 1 | ... | 6 }` for timezone and week-boundary behavior.
- `chunk(array, size)` throws when `size <= 0`; `range(start, end, step)` throws when `step === 0`; `mean([])` throws.
- `base64Encode` and `base64Decode` use UTF-8 and work through `TextEncoder`/`TextDecoder`, `Buffer`, or browser `btoa`/`atob` depending on the environment.
- `clone(object, props)` is a shallow object merge, not a deep clone.

## Detailed Reference

Read [references/api.md](references/api.md) when you need the full export list, type aliases, function signatures, examples, or edge-case behavior.
