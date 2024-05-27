/**
 * Checks if the given value is empty, whether it's a string, an object or array.
 * @param {unknown} val.
 * @returns {boolean}
 */
export function isEmpty(val: unknown): val is undefined | null | "" | [] {
  if (val === null || val === undefined) {
    return true;
  }

  if (Array.isArray(val)) {
    return !val.length;
  }

  if (typeof val === "string") {
    return !val.trim().length;
  }

  if (typeof val === "object") {
    return !Object.keys(val).length;
  }

  return false;
}
