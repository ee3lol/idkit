/**
 * shortId – Generate a short, URL-safe alphanumeric ID.
 *
 * @param length  - Number of characters.
 * @param options - Optional settings.
 * @param options.urlSafe - If true, uses A–Z a–z 0–9 - _ (64-char alphabet).
 * @returns A random string of the requested length.
 *
 * @example
 * shortId(8)                       // => "f9K3aP2L"
 * shortId(10, { urlSafe: true })   // => "aB-_3kZ9mQ"
 */

import { randomString } from "./utils/crypto.js";
import { ALPHANUMERIC, URL_SAFE } from "./utils/alphabet.js";

export interface ShortIdOptions {
  /** Use URL-safe alphabet (adds `-` and `_`, 64 chars total). Default: false */
  urlSafe?: boolean;
}

export function shortId(length: number, options: ShortIdOptions = {}): string {
  if (!Number.isInteger(length) || length <= 0) {
    throw new RangeError(`[idkit.js] shortId: length must be a positive integer, got ${length}`);
  }
  const alphabet = options.urlSafe ? URL_SAFE : ALPHANUMERIC;
  return randomString(length, alphabet);
}

export default shortId;
