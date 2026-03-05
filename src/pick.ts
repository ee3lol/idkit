/**
 * pick – Securely pick a random element from an array.
 *
 * @param array - Non-empty array to pick from.
 * @returns A randomly selected element.
 *
 * @example
 * pick(["apple", "banana", "cherry"]) // => "banana"
 */

import { randomIndex } from "./utils/crypto.js";

export function pick<T>(array: ReadonlyArray<T>): T {
  if (!Array.isArray(array)) {
    throw new TypeError("[idkit] pick: argument must be an array");
  }
  if (array.length === 0) {
    throw new RangeError("[idkit] pick: cannot pick from an empty array");
  }
  return array[randomIndex(array.length)]!;
}

export default pick;
