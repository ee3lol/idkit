/**
 * timeId – Generate a time-sortable, globally unique ID.
 *
 * Format: 10 timestamp chars + 16 random entropy chars = 26 chars total.
 * Alphabet: Crockford Base32 (0-9 A-Z, excluding I L O U).
 * Lexicographically sortable by creation time.
 * Compatible with ULID's character set.
 *
 * @returns A 26-character uppercase time-sortable ID.
 *
 * @example
 * timeId() // => "01HF6K2A9P8J5TQXR4NWMD7V2B"
 */

import { getRandomBytes } from "./utils/randomBytes.js";
import { CROCKFORD_BASE32 } from "./utils/alphabet.js";

const ENC = CROCKFORD_BASE32;

/** Encode a number into `charCount` Crockford Base32 characters (big-endian). */
function encodeTime(ms: number, charCount: number): string {
  let result = "";
  let remaining = ms;
  for (let i = charCount - 1; i >= 0; i--) {
    const mod = remaining % 32;
    result = ENC[mod]! + result;
    remaining = Math.floor(remaining / 32);
  }
  return result;
}

/** Encode raw bytes into Crockford Base32 characters. */
function encodeRandom(bytes: Uint8Array, charCount: number): string {
  let result = "";
  let bitsAccumulated = 0;
  let accumulator = 0;

  for (const byte of bytes) {
    accumulator = (accumulator << 8) | byte;
    bitsAccumulated += 8;

    while (bitsAccumulated >= 5 && result.length < charCount) {
      bitsAccumulated -= 5;
      result += ENC[(accumulator >> bitsAccumulated) & 0x1f]!;
    }

    if (result.length >= charCount) break;
  }

  while (result.length < charCount) {
    result += ENC[0]!;
  }

  return result;
}

export function timeId(): string {
  const now = Date.now();

  const tsChars = encodeTime(now, 10);

  const randBytes = getRandomBytes(10);
  const randChars = encodeRandom(randBytes, 16);

  return tsChars + randChars;
}

export default timeId;
