/**
 * pattern – Generate IDs from a format string.
 *
 * Placeholder characters:
 *   `#`  → random digit (0–9)
 *   `A`  → random uppercase letter (A–Z)
 *   `a`  → random lowercase letter (a–z)
 *   `*`  → random alphanumeric character (A–Z a–z 0–9)
 *
 * All other characters are passed through verbatim.
 *
 * @param format - Pattern string.
 * @returns A generated string matching the pattern.
 *
 * @example
 * pattern("INV-####")        // => "INV-4821"
 * pattern("AA-####-aa")      // => "KP-7823-qw"
 * pattern("****-****")       // => "aB3k-Z9mQ"
 */

import { randomChar } from "./utils/crypto.js";
import { DIGITS, UPPERCASE, LOWERCASE, ALPHANUMERIC } from "./utils/alphabet.js";

export function pattern(format: string): string {
  if (typeof format !== "string" || format.length === 0) {
    throw new TypeError("[idkit] pattern: format must be a non-empty string");
  }

  let result = "";
  for (const char of format) {
    switch (char) {
      case "#":
        result += randomChar(DIGITS);
        break;
      case "A":
        result += randomChar(UPPERCASE);
        break;
      case "a":
        result += randomChar(LOWERCASE);
        break;
      case "*":
        result += randomChar(ALPHANUMERIC);
        break;
      default:
        result += char;
    }
  }
  return result;
}

export default pattern;
