/**
 * seeded – Create a deterministic pseudo-random number generator (PRNG).
 *
 * Uses a fast, high-quality xorshift128+ algorithm seeded from a string hash.
 * Designed for reproducible tests and deterministic simulations — NOT for security.
 *
 * @param seed - Any string. Same seed always produces the same sequence.
 * @returns A `SeededRng` object with deterministic versions of common idkit.js utilities.
 *
 * @example
 * const rng = seeded("test-seed")
 * rng.shortId(8)        // always "xK9aP2Lm" for this seed
 * rng.randomInt(1, 100) // always 42 for this seed (second call)
 */

import { ALPHANUMERIC, URL_SAFE, DIGITS, UPPERCASE, LOWERCASE } from "./utils/alphabet.js";


/** Convert a string seed into two 32-bit integers using djb2 variant. */
function hashSeed(seed: string): [number, number] {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < seed.length; i++) {
    const ch = seed.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 0x9e3779b9);
    h2 = Math.imul(h2 ^ ch, 0x6c62272e);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 0x45d9f3b);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 0x45d9f3b);
  return [h1 >>> 0, h2 >>> 0];
}

/** Splitmix32 — used to expand the two seed values into four 32-bit state words. */
function splitmix32(s: number): number {
  s = (s + 0x9e3779b9) | 0;
  s = Math.imul(s ^ (s >>> 16), 0x85ebca6b);
  s = Math.imul(s ^ (s >>> 13), 0xc2b2ae35);
  return (s ^ (s >>> 16)) >>> 0;
}

class XorShift128Plus {
  private s0: number;
  private s1: number;
  private s2: number;
  private s3: number;

  constructor(seed: string) {
    const [a, b] = hashSeed(seed);
    this.s0 = splitmix32(a);
    this.s1 = splitmix32(this.s0);
    this.s2 = splitmix32(b);
    this.s3 = splitmix32(this.s2);
  }

  /** Returns the next 32-bit unsigned integer. */
  nextUint32(): number {
    const result = (this.s0 + this.s3) >>> 0;
    const t = (this.s1 << 9) >>> 0;
    this.s2 ^= this.s0;
    this.s3 ^= this.s1;
    this.s1 ^= this.s2;
    this.s0 ^= this.s3;
    this.s2 ^= t;
    this.s3 = ((this.s3 << 11) | (this.s3 >>> 21)) >>> 0;
    return result;
  }

  /** Returns a float in [0, 1). */
  nextFloat(): number {
    return this.nextUint32() / 0x1_0000_0000;
  }

  /** Returns an integer in [0, max) — unbiased via rejection sampling. */
  nextIndex(max: number): number {
    if (max <= 1) return 0;
    let mask = max - 1;
    mask |= mask >> 1;
    mask |= mask >> 2;
    mask |= mask >> 4;
    mask |= mask >> 8;
    mask |= mask >> 16;
    let result: number;
    do {
      result = this.nextUint32() & mask;
    } while (result >= max);
    return result;
  }
}


export interface SeededRng {
  /** The raw float in [0, 1) from the underlying PRNG. */
  nextFloat(): number;
  /** Deterministic shortId — same seed + same call order = same result. */
  shortId(length: number, options?: { urlSafe?: boolean }): string;
  /** Deterministic randomInt in [min, max] inclusive. */
  randomInt(min: number, max: number): number;
  /** Deterministic randomFloat in [0, 1). */
  randomFloat(): number;
  /** Deterministically pick a random element from an array. */
  pick<T>(array: ReadonlyArray<T>): T;
  /** Deterministically shuffle an array (returns a new array). */
  shuffle<T>(array: ReadonlyArray<T>): T[];
}

export function seeded(seed: string): SeededRng {
  if (typeof seed !== "string") {
    throw new TypeError(`[idkit.js] seeded: seed must be a string, got ${typeof seed}`);
  }

  const prng = new XorShift128Plus(seed);

  function randomStringSeeded(length: number, alphabet: string): string {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += alphabet[prng.nextIndex(alphabet.length)]!;
    }
    return result;
  }

  return {
    nextFloat() {
      return prng.nextFloat();
    },

    shortId(length: number, options: { urlSafe?: boolean } = {}): string {
      if (!Number.isInteger(length) || length <= 0) {
        throw new RangeError(
          `[idkit.js] seeded.shortId: length must be a positive integer, got ${length}`
        );
      }
      const alphabet = options.urlSafe ? URL_SAFE : ALPHANUMERIC;
      return randomStringSeeded(length, alphabet);
    },

    randomInt(min: number, max: number): number {
      if (!Number.isInteger(min) || !Number.isInteger(max)) {
        throw new TypeError(
          `[idkit.js] seeded.randomInt: min and max must be integers, got ${min} and ${max}`
        );
      }
      if (min > max) {
        throw new RangeError(
          `[idkit.js] seeded.randomInt: min (${min}) must be ≤ max (${max})`
        );
      }
      if (min === max) return min;
      return min + prng.nextIndex(max - min + 1);
    },

    randomFloat(): number {
      return prng.nextFloat();
    },

    pick<T>(array: ReadonlyArray<T>): T {
      if (!Array.isArray(array)) {
        throw new TypeError("[idkit.js] seeded.pick: argument must be an array");
      }
      if (array.length === 0) {
        throw new RangeError("[idkit.js] seeded.pick: cannot pick from an empty array");
      }
      return array[prng.nextIndex(array.length)]!;
    },

    shuffle<T>(array: ReadonlyArray<T>): T[] {
      if (!Array.isArray(array)) {
        throw new TypeError("[idkit.js] seeded.shuffle: argument must be an array");
      }
      const result = [...array];
      for (let i = result.length - 1; i > 0; i--) {
        const j = prng.nextIndex(i + 1);
        [result[i], result[j]] = [result[j]!, result[i]!];
      }
      return result;
    },
  };
}

export default seeded;
