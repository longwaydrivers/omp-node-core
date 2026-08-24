import type Player from "./components/Player.js";
import type { NativePointer, PoolEntity } from "./types";

export class Pool<T extends PoolEntity> {
  /**
   * @type {Map<NativePointer, T>}
   */
  private entries = new Map<NativePointer, T>();

  /**
   * @description A map of entity pointers, with their IDs as key
   * @type {Map<number, NativePointer>}
   */
  private entityPtrs = new Map<number, NativePointer>();

  /**
   * @method at
   * @description Get entity instance based on their ID
   * @param {number} id
   * @returns {T|undefined}
   */
  at(id: number): T | undefined {
    const ptr = this.entityPtrs.get(id);
    if (ptr !== undefined) {
      return this.entries.get(ptr);
    }
    return undefined;
  }

  /**
   * @method get
   * @description Get entity instance based on their pointer
   * @param {NativePointer} ptr - entity pointer
   * @returns {T|undefined}
   */
  get(ptr: NativePointer): T | undefined {
    return this.entries.get(ptr);
  }

  /**
   * @method at
   * @returns {T[]} a copy of array of entities
   */
  all(): T[] {
    return [...this.entries.values()];
  }

  /**
   * @method forEach
   * @param {function(T, NativePointer): void} callback - The function to execute for each entity and pointer.
   */
  forEach(callback: (entity: T, pointer: NativePointer) => void): void {
    this.entries.forEach((value, key) => callback(value, key));
  }

  add_INTERNAL_UNSAFE(entity: T): void {
    const id = entity.getID();
    const ptr = entity.getPtr();
    if (id === null || ptr === null) {
      return;
    }

    this.entityPtrs.set(id, ptr);
    this.entries.set(ptr, entity);
  }

  remove_INTERNAL_UNSAFE(entity: T): void {
    const id = entity.getID();
    const ptr = entity.getPtr();
    if (id === null || ptr === null) {
      return;
    }

    this.entityPtrs.delete(id);
    this.entries.delete(ptr);
  }

  entries_INTERNAL_UNSAFE(): Map<NativePointer, T> {
    return this.entries;
  }

  ids_INTERNAL_UNSAFE(): Map<number, NativePointer> {
    return this.entityPtrs;
  }
}

export class PlayerPool<T extends PoolEntity> {
  /**
   * @type {Player}
   */
  player: Player | null = null;

  /**
   * @type {Map<NativePointer, T>}
   */
  entries = new Map<NativePointer, T>();

  /**
   * @description A map of player entity pointers, with their IDs as key
   * @type {Map<number, NativePointer>}
   */
  entityPtrs = new Map<number, NativePointer>();

  /**
   * @constructor
   * @param {Player} player
   */
  constructor(player: Player) {
    this.player = player;
  }

  /**
   * @method at
   * @description Get player entity instance based on their ID
   * @param {number} id
   * @returns {T|undefined}
   */
  at(id: number): T | undefined {
    const ptr = this.entityPtrs.get(id);
    if (ptr !== undefined) {
      return this.entries.get(ptr);
    }
    return undefined;
  }

  /**
   * @method get
   * @description Get player entity instance based on their pointer
   * @param {NativePointer} ptr - player entity pointer
   * @returns {T|undefined}
   */
  get(ptr: NativePointer): T | undefined {
    return this.entries.get(ptr);
  }

  /**
   * @method all
   * @returns {T[]} a copy of array of player entity
   */
  all(): T[] {
    return [...this.entries.values()];
  }

  /**
   * @method forEach
   * @param {function(T, NativePointer): void} callback - The function to execute for each player entity and pointer.
   */
  forEach(callback: (entity: T, pointer: NativePointer) => void): void {
    this.entries.forEach((value, key) => callback(value, key));
  }

  add_INTERNAL_UNSAFE(entity: T): void {
    const id = entity.getID();
    const ptr = entity.getPtr();
    if (id === null || ptr === null) {
      return;
    }

    this.entityPtrs.set(id, ptr);
    this.entries.set(ptr, entity);
  }

  remove_INTERNAL_UNSAFE(entity: T): void {
    const id = entity.getID();
    const ptr = entity.getPtr();
    if (id === null || ptr === null) {
      return;
    }

    this.entityPtrs.delete(id);
    this.entries.delete(ptr);
  }

  entries_INTERNAL_UNSAFE(): Map<NativePointer, T> {
    return this.entries;
  }

  ids_INTERNAL_UNSAFE(): Map<number, NativePointer> {
    return this.entityPtrs;
  }
}

export class PerPlayerEntityPool<T> {
  entries = new Map<number, T>();

  /**
   * @method at
   * @description Get player's entity pool
   * @param {number} playerid
   * @returns {T|undefined}
   */
  at(playerid: number): T | undefined {
    return this.entries.get(playerid);
  }

  entries_INTERNAL_UNSAFE(): Map<number, T> {
    return this.entries;
  }
}
