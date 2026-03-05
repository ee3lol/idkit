/**
 * shuffle – Securely shuffle an array using Fisher-Yates.
 *
 * Returns a **new array** and does not mutate the original.
 *
 * @param array - The array to shuffle.
 * @returns A new array containing the same elements in a random order.
 *
 * @example
 * shuffle([1, 2, 3, 4, 5]) // => [3, 1, 5, 2, 4]
 */

import { randomIndex } from "./utils/crypto.js";

export function shuffle<T>(array: ReadonlyArray<T>): T[] {
  if (!Array.isArray(array)) {
    throw new TypeError("[idkit] shuffle: argument must be an array");
  }

  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [result[i], result[j]] = [result[j]!, result[i]!];
  }

  return result;
}

export default shuffle;
