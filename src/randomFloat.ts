/**
 * randomFloat – Generate a cryptographically secure float in [0, 1).
 *
 * Reads 4 secure random bytes, interprets them as an unsigned 32-bit integer,
 * and divides by 2^32 to produce a value in [0, 1).
 *
 * @returns A secure random float in the range [0, 1).
 *
 * @example
 * randomFloat() // => 0.7382910483
 */

import { getRandomBytes } from "./utils/randomBytes.js";

export function randomFloat(): number {
  const bytes = getRandomBytes(4);
  const uint32 =
    ((bytes[0]! << 24) | (bytes[1]! << 16) | (bytes[2]! << 8) | bytes[3]!) >>> 0;
  return uint32 / 0x1_0000_0000;
}

export default randomFloat;
