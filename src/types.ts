/**
 * Values used by the native bridge for opaque C/C++ object pointers.
 *
 * 32-bit builds expose pointers as numbers while 64-bit builds preserve them
 * as bigint values. Consumers normally do not need to construct these values;
 * this type exists so pools and low-level helpers remain correct on both ABIs.
 */
export type NativePointer = number | bigint;

/** Values a listener may return to the native event dispatcher. */
export type EventHandlerResult =
  | void
  | boolean
  | number
  | Promise<void | boolean | number>;

/** Textdraw capacities resolved from the running server configuration. */
export interface TextDrawLimits {
  readonly global: number;
  readonly player: number;
}

/**
 * Minimum contract required for an entity to be stored in a pool.
 *
 * The getters are nullable because an entity becomes invalid after it is
 * destroyed. Pool insertion checks both values before indexing the entity.
 */
export interface PoolEntity {
  getID(): number | null;
  getPtr(): NativePointer | null;
}

/** A three-dimensional vector returned by native APIs. */
export interface Vector3Result {
  ret: boolean;
  x: number;
  y: number;
  z: number;
}

/** A quaternion returned by native APIs. */
export interface QuaternionResult {
  ret: boolean;
  w: number;
  x: number;
  y: number;
  z: number;
}
