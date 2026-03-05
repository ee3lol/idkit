/**
 * humanId – Generate memorable, human-readable IDs.
 *
 * Combines a random adjective + noun + 4-digit number.
 *
 * @param options - Optional settings.
 * @param options.separator - Character to separate words. Default: "-"
 * @returns A human-readable ID string.
 *
 * @example
 * humanId()                       // => "blue-tiger-4821"
 * humanId({ separator: "_" })     // => "solar_fox_1093"
 */

import { randomIndex } from "./utils/crypto.js";
import { randomInt } from "./randomInt.js";

export interface HumanIdOptions {
  /** Word separator. Default: "-" */
  separator?: string;
}

const ADJECTIVES: string[] = [
  "amber", "ancient", "arctic", "autumn", "azure",
  "bold", "brave", "bright", "broken", "bronze",
  "calm", "cardinal", "cedar", "chalk", "clever",
  "coastal", "cold", "coral", "cosmic", "crimson",
  "crystal", "cyan", "dark", "dawn", "deep",
  "desert", "distant", "dusty", "electric", "emerald",
  "empty", "epic", "fierce", "flint", "foggy",
  "forest", "frozen", "gentle", "glacial", "golden",
  "granite", "gray", "hollow", "icy", "indigo",
  "jade", "keen", "iron", "lava", "light",
  "lucky", "lunar", "marble", "mellow", "misty",
  "mossy", "mystic", "neon", "noble", "north",
  "ocean", "old", "orange", "pale", "pine",
  "plain", "polar", "prime", "purple", "quiet",
  "rapid", "raven", "red", "rising", "rocky",
  "royal", "ruby", "rugged", "rustic", "sage",
  "sandy", "scarlet", "serene", "shadow", "sharp",
  "silent", "silver", "sleek", "slim", "slow",
  "smoky", "solar", "solid", "sonic", "stark",
  "steel", "still", "stone", "stormy", "swift",
  "tall", "teal", "thunder", "timber", "tiny",
  "ultra", "vast", "velvet", "violet", "vivid",
  "warm", "wild", "windy", "winter", "wise",
];

const NOUNS: string[] = [
  "anchor", "arrow", "ash", "atlas", "aurora",
  "bay", "bear", "birch", "bird", "blade",
  "brook", "canyon", "cedar", "cliff", "cloud",
  "comet", "coral", "crane", "creek", "crow",
  "delta", "dune", "dust", "eagle", "echo",
  "falcon", "fern", "field", "fire", "fjord",
  "flame", "flash", "forest", "fox", "frost",
  "gale", "glacier", "glyph", "grove", "hawk",
  "hill", "horizon", "ice", "iris", "island",
  "jade", "jaguar", "lake", "leaf", "light",
  "lightning", "lion", "lynx", "maple", "marsh",
  "meadow", "mesa", "mist", "moon", "moss",
  "mountain", "nebula", "night", "north", "oak",
  "ocean", "orbit", "otter", "owl", "peak",
  "pebble", "pine", "prism", "rain", "raven",
  "reef", "ridge", "river", "rock", "root",
  "sage", "sea", "shadow", "shore", "sky",
  "slate", "snow", "spark", "star", "storm",
  "stream", "sun", "thorn", "thunder", "tide",
  "tiger", "timber", "torch", "trail", "tree",
  "vale", "valley", "vapor", "vine", "wave",
  "wind", "wolf", "wood", "yard", "zenith",
];

export function humanId(options: HumanIdOptions = {}): string {
  const sep = options.separator ?? "-";
  const adj = ADJECTIVES[randomIndex(ADJECTIVES.length)]!;
  const noun = NOUNS[randomIndex(NOUNS.length)]!;
  const num = randomInt(1000, 9999);
  return `${adj}${sep}${noun}${sep}${num}`;
}

export default humanId;
