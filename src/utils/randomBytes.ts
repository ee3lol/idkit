/**
 * Cross-platform secure random bytes.
 *
 * Uses `globalThis.crypto.getRandomValues`, which is available in:
 *   - Node.js ≥ 18 (built-in, no import needed)
 *   - All modern browsers (Web Crypto API)
 *   - Deno, Bun, Cloudflare Workers, etc.
 *
 * Zero imports — no Node.js built-in modules required.
 */

export function getRandomBytes(size: number): Uint8Array {
  if (
    typeof globalThis === "undefined" ||
    typeof globalThis.crypto === "undefined" ||
    typeof globalThis.crypto.getRandomValues !== "function"
  ) {
    throw new Error(
      "[idkit.js] No secure random source available. " +
        "idkit.js requires Node.js ≥ 18 or a modern browser with Web Crypto API support."
    );
  }

  const bytes = new Uint8Array(size);
  globalThis.crypto.getRandomValues(bytes);
  return bytes;
}
