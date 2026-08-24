import assert from "node:assert/strict";
import test from "node:test";

const configured = new Map();
const eventEmitterRaw = { on() { return this; } };
const internal = new Proxy({
  voidSize: 8,
  eventEmitter: { listeners() { return []; } },
  eventEmitter_raw: eventEmitterRaw,
  Config: {
    GetAsString(key) {
      const value = configured.get(key);
      return value === undefined
        ? { ret: false, output: "" }
        : { ret: true, output: value };
    },
  },
}, {
  get(target, key) {
    if (key in target) return target[key];
    return new Proxy({}, { get() { return () => ({ ret: 0 }); } });
  },
});

globalThis.__internal_omp = internal;
globalThis.__omp = {};

let initialize;
globalThis.__internal_setOmpNodeLibraryFunction = (fn) => {
  initialize = fn;
};

const core = await import("../dist/bundle.js");

async function limitsFor(entries) {
  configured.clear();
  for (const [key, value] of entries) configured.set(key, value);

  await initialize(false);
  return core.omp.limits.textDraw;
}

test("uses the modern runtime textdraw limits", async () => {
  assert.deepEqual(
    await limitsFor([
      ["textdraw.global_limit", "50"],
      ["textdraw.player_limit", "2254"],
    ]),
    { global: 50, player: 2254 },
  );
});

test("accepts legacy textdraw limit keys", async () => {
  assert.deepEqual(
    await limitsFor([
      ["max_global_textdraws", "11"],
      ["max_player_textdraws", "22"],
    ]),
    { global: 11, player: 22 },
  );
});

test("preserves zero as a valid configured capacity", async () => {
  assert.deepEqual(
    await limitsFor([
      ["textdraw.global_limit", "0"],
      ["textdraw.player_limit", "0"],
    ]),
    { global: 0, player: 0 },
  );
});

test("falls back to both defaults when configuration is invalid", async () => {
  assert.deepEqual(
    await limitsFor([
      ["textdraw.global_limit", "-1"],
      ["textdraw.player_limit", "2254"],
    ]),
    { global: 256, player: 2048 },
  );

  assert.deepEqual(
    await limitsFor([
      ["textdraw.global_limit", "65535"],
      ["textdraw.player_limit", "1"],
    ]),
    { global: 256, player: 2048 },
  );
});

test("uses the PR defaults when no limit is configured", async () => {
  assert.deepEqual(await limitsFor([]), { global: 256, player: 2048 });
});
