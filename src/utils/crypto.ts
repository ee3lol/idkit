/**
 * Low-level cryptographic helpers built on top of `getRandomBytes`.
 * These eliminate modulo bias via rejection sampling.
 */

import { getRandomBytes } from "./randomBytes.js";

/**
 * Returns an unbiased random integer in [0, max).
 * Uses rejection sampling to avoid modulo bias.
 */
export function randomIndex(max: number): number {
  if (max <= 0 || !Number.isInteger(max)) {
    throw new RangeError(`[idkit.js] randomIndex: max must be a positive integer, got ${max}`);
  }
  if (max === 1) return 0;

  let mask = max - 1;
  mask |= mask >> 1;
  mask |= mask >> 2;
  mask |= mask >> 4;
  mask |= mask >> 8;
  mask |= mask >> 16;

  let result: number;
  do {
    const bytes = getRandomBytes(4);
    const val = (bytes[0]! << 24) | (bytes[1]! << 16) | (bytes[2]! << 8) | bytes[3]!;
    result = (val >>> 0) & mask;
  } while (result >= max);

  return result;
}

/**
 * Returns a single cryptographically secure random character
 * from the provided alphabet string.
 */
export function randomChar(alphabet: string): string {
  if (!alphabet || alphabet.length === 0) {
    throw new RangeError("[idkit.js] randomChar: alphabet must be a non-empty string");
  }
  return alphabet[randomIndex(alphabet.length)]!;
}

/**
 * Build a string of `length` characters by sampling from `alphabet` securely.
 */
export function randomString(length: number, alphabet: string): string {
  if (length <= 0 || !Number.isInteger(length)) {
    throw new RangeError(`[idkit.js] randomString: length must be a positive integer, got ${length}`);
  }
  let result = "";
  for (let i = 0; i < length; i++) {
    result += randomChar(alphabet);
  }
  return result;
}
