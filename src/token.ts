/**
 * token – Generate a cryptographically secure hex token.
 *
 * @param length - Number of hex characters to return (each byte yields 2 hex chars).
 * @returns A lowercase hex string of the requested length.
 *
 * @example
 * token(32) // => "f8a29c4d7f3a9e1b8c1d2a3b4e5f6a7b"
 */

import { getRandomBytes } from "./utils/randomBytes.js";

export function token(length: number): string {
  if (!Number.isInteger(length) || length <= 0) {
    throw new RangeError(`[idkit] token: length must be a positive integer, got ${length}`);
  }

  const byteCount = Math.ceil(length / 2);
  const bytes = getRandomBytes(byteCount);

  let hex = "";
  for (const byte of bytes) {
    hex += byte.toString(16).padStart(2, "0");
  }

  return hex.slice(0, length);
}

export default token;
