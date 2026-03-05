/**
 * Shared alphabet constants used across idkit modules.
 */

/** A–Z, a–z, 0–9 (62 characters) */
export const ALPHANUMERIC =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/** A–Z, a–z, 0–9, -, _ (64 characters — URL-safe base64-style) */
export const URL_SAFE =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

/**
 * Invite-safe alphabet — omits visually ambiguous characters:
 * 0 (zero), O (uppercase oh), I (uppercase eye), 1 (one), l (lowercase el)
 * 32 characters, uppercase only.
 */
export const INVITE_SAFE = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Crockford Base32 alphabet (uppercase) — used for time-sortable IDs */
export const CROCKFORD_BASE32 = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

/** 0–9 (10 characters) */
export const DIGITS = "0123456789";

/** A–Z (26 characters) */
export const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** a–z (26 characters) */
export const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
