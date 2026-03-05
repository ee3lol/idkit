/**
 * inviteCode – Generate human-friendly invite codes with no ambiguous characters.
 *
 * Omits `0`, `O`, `I`, `1`, `l` to prevent misreading.
 * Alphabet: ABCDEFGHJKLMNPQRSTUVWXYZ23456789 (32 chars)
 *
 * @param length  - Total number of characters (before grouping).
 * @param options - Optional settings.
 * @param options.group - Group characters with a dash every N chars.
 * @returns A human-friendly invite code string.
 *
 * @example
 * inviteCode(6)                   // => "K7M4XP"
 * inviteCode(12, { group: 4 })    // => "K7M4-XP9Q-R2TW"
 */

import { randomString } from "./utils/crypto.js";
import { INVITE_SAFE } from "./utils/alphabet.js";

export interface InviteCodeOptions {
  /** Insert a "-" separator every N characters. */
  group?: number;
}

export function inviteCode(length: number, options: InviteCodeOptions = {}): string {
  if (!Number.isInteger(length) || length <= 0) {
    throw new RangeError(`[idkit.js] inviteCode: length must be a positive integer, got ${length}`);
  }

  const raw = randomString(length, INVITE_SAFE);

  if (!options.group) {
    return raw;
  }

  const groupSize = options.group;
  if (!Number.isInteger(groupSize) || groupSize <= 0) {
    throw new RangeError(
      `[idkit.js] inviteCode: options.group must be a positive integer, got ${groupSize}`
    );
  }

  const parts: string[] = [];
  for (let i = 0; i < raw.length; i += groupSize) {
    parts.push(raw.slice(i, i + groupSize));
  }
  return parts.join("-");
}

export default inviteCode;
