/**
 * randomInt – Generate a cryptographically secure random integer.
 *
 * Both `min` and `max` are **inclusive**.
 *
 * @param min - Inclusive lower bound (integer).
 * @param max - Inclusive upper bound (integer).
 * @returns A secure random integer in [min, max].
 *
 * @example
 * randomInt(1, 100)  // => 42
 * randomInt(0, 1)    // => 0 or 1
 */

import { randomIndex } from "./utils/crypto.js";

export function randomInt(min: number, max: number): number {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError(`[idkit] randomInt: min and max must be integers, got ${min} and ${max}`);
  }
  if (min > max) {
    throw new RangeError(
      `[idkit] randomInt: min (${min}) must be less than or equal to max (${max})`
    );
  }
  if (min === max) return min;

  const range = max - min + 1;
  return min + randomIndex(range);
}

export default randomInt;
