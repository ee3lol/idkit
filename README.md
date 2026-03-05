# idkit / I don't know it

> Tiny, secure, zero-dependency ID and randomness toolkit for Node.js and
> browsers.

Generate tokens, short IDs, invite codes, human-readable IDs, time-sortable IDs,
and a few other things you probably didn’t know you needed until now.

Yes, you _could_ write your own random ID generator in 6 lines.\
Yes, it will probably break in production.

`idkit` exists so you don't have to find out the hard way.

[![npm version](https://img.shields.io/npm/v/idkit)](https://www.npmjs.com/package/idkit)
[![bundle size](https://img.shields.io/bundlephobia/minzip/idkit)](https://bundlephobia.com/package/idkit)
[![license](https://img.shields.io/npm/l/idkit)](https://github.com/ee3lol/idkit/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-first-blue)](https://www.typescriptlang.org/)

---

# Install

```bash
npm install idkit
# or
pnpm add idkit
# or
yarn add idkit
```

---

# 10-Second Example

```ts
import { humanId, inviteCode, shortId, timeId, token } from "idkit";

token(32);
// "f8a29c4d7f3a9e1b8c1d2a3b4e5f6a7b"

shortId(8);
// "f9K3aP2L"

humanId();
// "blue-tiger-4821"

inviteCode(6);
// "K7M4XP"

timeId();
// "01HF6K2A9P8J5TQXR4NW"
```

If this already solves your problem, you can stop reading and go ship something.

---

# Features

- 🔐 **Secure by default** — uses `crypto.randomBytes` (Node) /
  `crypto.getRandomValues` (browser)
- 🌲 **Tree-shakable** — import only what you need
- 📦 **Zero dependencies** — your dependency graph will thank you
- 🟦 **TypeScript-first** — types included
- ⚡ **Node + Browser support**
- 🎛️ **13 utilities** — tokens, IDs, invite codes, randomness helpers

---

# Quick Examples

## Generate a Token

```ts
import { token } from "idkit";

token(32);
```

Output:

```
f8a29c4d7f3a9e1b8c1d2a3b4e5f6a7b
```

Perfect for:

- API keys
- password reset tokens
- session IDs

---

## Short IDs

```ts
import { shortId } from "idkit";

shortId(8);
```

Example:

```
f9K3aP2L
```

URL-safe version (includes `-` and `_`):

```ts
shortId(10, { urlSafe: true });
```

Example:

```
aB-_3kZ9mQ
```

---

## Human-Readable IDs

```ts
import { humanId } from "idkit";

humanId();
```

Example:

```
blue-tiger-4821
solar-fox-1093
silent-ocean-8822
```

Good for:

- user-visible IDs
- invite systems
- debugging

---

## Invite Codes

```ts
import { inviteCode } from "idkit";

inviteCode(6);
```

Example:

```
K7M4XP
```

Grouped codes:

```ts
inviteCode(12, { group: 4 });
```

Example:

```
K7M4-XP9Q-R2TW
```

Characters like `0`, `O`, `I`, `1`, `l` are removed to avoid confusion.

---

## Time-Sortable IDs

```ts
import { timeId } from "idkit";

timeId();
```

Example:

```
01HF6K2A9P8J5TQXR4NW7DM3Z2
```

Properties:

- sortable by creation time
- globally unique
- URL safe

Great for:

- database primary keys
- event logs
- distributed systems

---

## Pattern-Based IDs

```ts
import { pattern } from "idkit";

pattern("INV-####");
pattern("USER-AAAA-####");
```

Examples:

```
INV-4821
USER-XKQW-3921
```

Pattern symbols:

| Symbol | Meaning          |
| ------ | ---------------- |
| `#`    | random digit     |
| `A`    | uppercase letter |
| `a`    | lowercase letter |
| `*`    | alphanumeric     |

---

## Random Utilities

### Random Integer

```ts
import { randomInt } from "idkit";

randomInt(1, 100);
```

---

### Random Float

```ts
import { randomFloat } from "idkit";

randomFloat();
```

---

### Shuffle Array

```ts
import { shuffle } from "idkit";

shuffle([1, 2, 3, 4]);
```

---

### Pick Random Element

```ts
import { pick } from "idkit";

pick(["apple", "banana", "cherry"]);
```

---

# Collision-Safe IDs

```ts
import { shortId, uniqueId } from "idkit";

const ids = new Set();

const id = uniqueId(() => shortId(6), ids);
```

Ensures no duplicates exist in your dataset.

---

# Seeded Random Generator

For deterministic testing:

```ts
import { seeded } from "idkit";

const rng = seeded("test-seed");

rng.shortId(8);
rng.randomInt(1, 100);
```

Same seed → same results.

Not for security use.

---

# Collision Probability Calculator

```ts
import { collisionProbability } from "idkit";

collisionProbability({
  alphabet: 62,
  length: 8,
  samples: 1_000_000,
});
```

Useful for estimating ID collision risk.

---

# Why Not `Math.random()`?

`Math.random()` is not cryptographically secure.

It’s fine for:

- games
- visual randomness
- simulations

It is **not fine** for:

- tokens
- invite codes
- authentication

`idkit` uses cryptographically secure randomness instead.

---

# Choosing the Right Function

| Use Case          | Function       |
| ----------------- | -------------- |
| API tokens        | `token()`      |
| Short IDs         | `shortId()`    |
| User-friendly IDs | `humanId()`    |
| Invite systems    | `inviteCode()` |
| Database keys     | `timeId()`     |
| Custom formats    | `pattern()`    |

---

# Tree-Shakable Imports

Import everything:

```ts
import { token } from "idkit";
```

Or import individual modules:

```ts
import token from "idkit/token";
```

Your bundler will only include what you use.

---

# License

MIT

Use it, modify it, ship it.
