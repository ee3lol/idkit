/**
 * collisionProbability – Calculate the birthday-problem collision probability.
 *
 * Uses the approximation: P ≈ 1 − e^(−n(n−1) / (2N))
 * where N = alphabet^length and n = samples.
 *
 * @param options.alphabet - Alphabet size (number of unique characters).
 * @param options.length   - ID length in characters.
 * @param options.samples  - Number of IDs generated.
 * @returns Probability of at least one collision (between 0 and 1).
 *
 * @example
 * collisionProbability({ alphabet: 62, length: 8, samples: 1_000_000 })
 * // => ~8.3e-8 (roughly 0.000000083)
 */

export interface CollisionProbabilityOptions {
  /** Number of unique characters in the alphabet (e.g. 62 for alphanumeric). */
  alphabet: number;
  /** Length of each generated ID. */
  length: number;
  /** Number of IDs generated in the system. */
  samples: number;
}

export function collisionProbability(options: CollisionProbabilityOptions): number {
  const { alphabet, length, samples } = options;

  if (!Number.isInteger(alphabet) || alphabet < 2) {
    throw new RangeError(
      `[idkit] collisionProbability: alphabet must be an integer ≥ 2, got ${alphabet}`
    );
  }
  if (!Number.isInteger(length) || length < 1) {
    throw new RangeError(
      `[idkit] collisionProbability: length must be a positive integer, got ${length}`
    );
  }
  if (!Number.isInteger(samples) || samples < 1) {
    throw new RangeError(
      `[idkit] collisionProbability: samples must be a positive integer, got ${samples}`
    );
  }

  // N = total possible IDs = alphabet^length
  // We use logarithms to avoid floating-point overflow for large N.
  // ln(N) = length * ln(alphabet)
  const lnN = length * Math.log(alphabet);

  // Approximation: P ≈ 1 - exp(-n*(n-1) / (2*N))
  // Exponent = -n*(n-1) / (2*N) = -(samples * (samples-1)) / (2 * exp(lnN))
  // To keep in log space:
  // exponent = -samples*(samples-1) / 2 * exp(-lnN)
  const exponent = -(samples * (samples - 1)) / 2 * Math.exp(-lnN);

  const probability = 1 - Math.exp(exponent);

  // Clamp to [0, 1]
  return Math.max(0, Math.min(1, probability));
}

export default collisionProbability;
