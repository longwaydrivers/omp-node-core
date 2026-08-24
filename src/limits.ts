import Config from "./components/Config";
import * as constants from "./constants";
import type { TextDrawLimits } from "./types";

const GLOBAL_TEXTDRAW_CONFIG_KEYS = [
  "textdraw.global_limit",
  "max_global_textdraws",
] as const;

const PLAYER_TEXTDRAW_CONFIG_KEYS = [
  "textdraw.player_limit",
  "max_player_textdraws",
] as const;

function readConfigValue(keys: readonly string[]): string | undefined {
  for (const key of keys) {
    const result = Config.getAsString(key);
    if (result.ret) {
      return result.output;
    }
  }

  return undefined;
}

function parseLimit(value: string | undefined): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  const parsed = Number(value.trim());
  if (!Number.isSafeInteger(parsed) || parsed < 0) {
    return undefined;
  }

  return parsed;
}

function defaultTextDrawLimits(): TextDrawLimits {
  return {
    global: constants.GLOBAL_TEXTDRAW_POOL_SIZE,
    player: constants.PLAYER_TEXTDRAW_POOL_SIZE,
  };
}

/**
 * Resolve the textdraw capacities advertised by the running open.mp server.
 *
 * The modern config keys are preferred. Legacy keys are accepted for older
 * hosts, and the exported pool-size constants remain the final fallback when
 * no configuration value is available. The server reserves INVALID_TEXTDRAW
 * as a sentinel, so an invalid combined capacity falls back as a pair.
 */
export function getTextDrawLimits(): TextDrawLimits {
  const globalValue = readConfigValue(GLOBAL_TEXTDRAW_CONFIG_KEYS);
  const playerValue = readConfigValue(PLAYER_TEXTDRAW_CONFIG_KEYS);
  const global = parseLimit(globalValue);
  const player = parseLimit(playerValue);

  if (
    (globalValue !== undefined && global === undefined) ||
    (playerValue !== undefined && player === undefined)
  ) {
    return defaultTextDrawLimits();
  }

  const resolvedGlobal = global ?? constants.GLOBAL_TEXTDRAW_POOL_SIZE;
  const resolvedPlayer = player ?? constants.PLAYER_TEXTDRAW_POOL_SIZE;

  if (resolvedGlobal + resolvedPlayer > constants.INVALID_TEXTDRAW) {
    return defaultTextDrawLimits();
  }

  return { global: resolvedGlobal, player: resolvedPlayer };
}
