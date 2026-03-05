/**
 * uniqueId – Generate a collision-safe ID guaranteed not to exist in a store.
 *
 * Calls the generator repeatedly until it produces a value absent from `store`,
 * then adds the new ID to the store before returning it.
 *
 * @param generator    - A function that produces a candidate ID string.
 * @param store        - A Set of existing IDs to check against.
 * @param maxAttempts  - Maximum retries before throwing. Default: 100.
 * @returns A unique ID string that has been added to `store`.
 *
 * @example
 * const ids = new Set<string>()
 * const id = uniqueId(() => shortId(6), ids)
 * console.log(ids.has(id)) // => true
 */

export function uniqueId(
  generator: () => string,
  store: Set<string>,
  maxAttempts = 100
): string {
  if (typeof generator !== "function") {
    throw new TypeError("[idkit.js] uniqueId: generator must be a function");
  }
  if (!(store instanceof Set)) {
    throw new TypeError("[idkit.js] uniqueId: store must be a Set<string>");
  }
  if (!Number.isInteger(maxAttempts) || maxAttempts <= 0) {
    throw new RangeError(
      `[idkit.js] uniqueId: maxAttempts must be a positive integer, got ${maxAttempts}`
    );
  }

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const id = generator();
    if (!store.has(id)) {
      store.add(id);
      return id;
    }
  }

  throw new Error(
    `[idkit.js] uniqueId: failed to generate a unique ID after ${maxAttempts} attempts. ` +
      "Consider increasing the ID length or alphabet to reduce collisions."
  );
}

export default uniqueId;
