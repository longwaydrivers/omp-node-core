import type {
  Actor,
  GangZone,
  Menu,
  NPC,
  ObjectMp,
  Pickup,
  Player,
  PlayerObject,
  PlayerTextDraw,
  PlayerTextLabel,
  TextDraw,
  TextLabel,
  Vehicle,
} from "./components";
import type { PerPlayerEntityPool, PlayerPool, Pool } from "./pools";
import type { EventCallback, EventMap, EventName } from "./event-types";
import type { EventHandlerResult, NativePointer } from "./types";

// The native host injects this object before the resource starts. Its full
// ABI is intentionally private to the bridge; public wrappers expose typed
// return values instead of leaking the native object through declarations.
// @ts-expect-error -- __internal_omp is injected by the native host at runtime.
export const internal_omp = __internal_omp;

export type { EventHandlerResult, NativePointer } from "./types";
export type { EventArgs, EventCallback, EventMap, EventName } from "./event-types";

/** Convert a native pointer to the representation used by this process. */
export function PTR(value: NativePointer): NativePointer {
  if (internal_omp.voidSize === 8) {
    return BigInt(value);
  }

  return value;
}

type CustomEventName<T extends string> = T extends EventName ? never : T;

export interface IOMP {
  /** Register a listener for a built-in open.mp event. */
  on<K extends EventName>(eventName: K, callback: EventCallback<K>): void;

  /** Register a listener for a custom resource event. */
  on<TEventName extends string, TArgs extends unknown[]>(
    eventName: CustomEventName<TEventName>,
    callback: (...args: TArgs) => EventHandlerResult
  ): void;

  /** Alias for `on`. */
  addListener<K extends EventName>(
    eventName: K,
    callback: EventCallback<K>
  ): void;

  /** Alias for `on` for custom resource events. */
  addListener<TEventName extends string, TArgs extends unknown[]>(
    eventName: CustomEventName<TEventName>,
    callback: (...args: TArgs) => EventHandlerResult
  ): void;

  /** Remove a specific built-in event listener. */
  removeListener<K extends EventName>(
    eventName: K,
    callback: EventCallback<K>
  ): void;

  /** Remove a specific custom resource event listener. */
  removeListener<TEventName extends string, TArgs extends unknown[]>(
    eventName: CustomEventName<TEventName>,
    callback: (...args: TArgs) => EventHandlerResult
  ): void;

  /** Remove every listener for an event. */
  removeAllListeners(eventName: EventName | string): void;

  /** Write a message to the open.mp server log. */
  log(message?: unknown, ...optionalParams: unknown[]): void;

  /** Global entity pools. */
  players: Pool<Player>;
  vehicles: Pool<Vehicle>;
  objects: Pool<ObjectMp>;
  textdraws: Pool<TextDraw>;
  pickups: Pool<Pickup>;
  gangzones: Pool<GangZone>;
  textlabels: Pool<TextLabel>;
  actors: Pool<Actor>;
  menus: Pool<Menu>;
  npcs: Pool<NPC>;

  /** Per-player entity pools. */
  playerObjects: PerPlayerEntityPool<PlayerPool<PlayerObject>>;
  playerTextLabels: PerPlayerEntityPool<PlayerPool<PlayerTextLabel>>;
  playerTextDraws: PerPlayerEntityPool<PlayerPool<PlayerTextDraw>>;

  /** Resource metadata supplied by the native host. */
  resource: {
    name: string;
    path: string;
    entryFile: string;
  };
}

export const omp: IOMP = __omp;
