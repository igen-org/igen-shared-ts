/**
 * Produces a new object overriding the provided properties on top of the original shape.
 */
export const clone = (object, props) => ({ ...object, ...props });
/**
 * Checks if two objects have the same keys with strictly equal values.
 */
export const isShallowEqual = (a, b) => {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
        return false;
    }
    return keysA.every((key) => Object.prototype.hasOwnProperty.call(b, key) && a[key] === b[key]);
};
/**
 * Builds a new object including only the provided keys present on the source.
 */
export const pick = (object, keys) => {
    return keys.reduce((acc, key) => {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            acc[key] = object[key];
        }
        return acc;
    }, {});
};
/**
 * Builds a new object excluding the provided keys.
 */
export const omit = (object, keys) => {
    const omitSet = new Set(keys);
    return Object.keys(object).reduce((acc, key) => {
        if (!omitSet.has(key)) {
            acc[key] = object[key];
        }
        return acc;
    }, {});
};
/**
 * Converts an array of key-value tuples into an object literal.
 */
export const entriesToObject = (entries) => {
    return entries.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
};
//# sourceMappingURL=object.js.map