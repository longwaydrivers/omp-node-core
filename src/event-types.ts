import type {
  Actor,
  GangZone,
  NPC,
  ObjectMp,
  Pickup,
  Player,
  PlayerObject,
  PlayerTextDraw,
  TextDraw,
  Vehicle,
} from "./components";
import type {
  BODY_PART,
  CLICK_SOURCE,
  DOWNLOAD_REQUEST,
  EDIT_RESPONSE,
  KeyMask,
  PLAYER_STATE,
  WEAPON,
  WEAPONSTATE,
} from "./enums";
import type { EventHandlerResult } from "./types";

/**
 * Arguments delivered to each public open.mp event.
 *
 * Tuple labels make callbacks self-documenting while preserving normal
 * TypeScript parameter inference when passed to `omp.on`.
 */
export interface EventMap {
  resourceStart: [error: boolean];
  playerGiveDamageActor: [player: Player, actor: Actor, amount: number, weapon: WEAPON, part: BODY_PART];
  actorStreamIn: [actor: Actor, forPlayer: Player];
  actorStreamOut: [actor: Actor, forPlayer: Player];
  playerEnterCheckpoint: [player: Player];
  playerLeaveCheckpoint: [player: Player];
  playerEnterRaceCheckpoint: [player: Player];
  playerLeaveRaceCheckpoint: [player: Player];
  playerRequestClass: [player: Player, classId: number];
  consoleText: [command: string, parameters: string];
  rconLoginAttempt: [address: string, password: string, success: boolean];
  tick: [elapsed: number];
  playerFinishedDownloading: [player: Player, virtualWorld: number];
  playerRequestDownload: [player: Player, type: DOWNLOAD_REQUEST, checksum: number];
  dialogResponse: [player: Player, dialogId: number, response: number, listItem: number, inputText: string];
  playerEnterGangZone: [player: Player, zone: GangZone];
  playerLeaveGangZone: [player: Player, zone: GangZone];
  playerClickGangZone: [player: Player, zone: GangZone];
  playerSelectedMenuRow: [player: Player, row: number];
  playerExitedMenu: [player: Player];
  npcFinishMove: [npc: NPC];
  npcCreate: [npc: NPC];
  npcDestroy: [npc: NPC];
  npcWeaponStateChange: [npc: NPC, newState: WEAPONSTATE, oldState: WEAPONSTATE];
  npcTakeDamage: [npc: NPC, damager: NPC, damage: number, weapon: WEAPON, bodyPart: BODY_PART];
  npcGiveDamage: [npc: NPC, damaged: NPC, damage: number, weapon: WEAPON, bodyPart: BODY_PART];
  npcDeath: [npc: NPC, killer: Player | undefined, reason: WEAPON];
  npcSpawn: [npc: NPC];
  npcRespawn: [npc: NPC];
  npcPlaybackStart: [npc: NPC, recordId: number];
  npcPlaybackEnd: [npc: NPC, recordId: number];
  npcShotMissed: [npc: NPC, weapon: WEAPON, offsetX: number, offsetY: number, offsetZ: number];
  npcShotPlayer: [npc: NPC, player: Player, weapon: WEAPON, offsetX: number, offsetY: number, offsetZ: number];
  npcShotNPC: [npc: NPC, target: NPC, weapon: WEAPON, offsetX: number, offsetY: number, offsetZ: number];
  npcShotVehicle: [npc: NPC, vehicle: Vehicle, weapon: WEAPON, offsetX: number, offsetY: number, offsetZ: number];
  npcShotObject: [npc: NPC, object: ObjectMp, weapon: WEAPON, offsetX: number, offsetY: number, offsetZ: number];
  npcShotPlayerObject: [npc: NPC, playerObject: PlayerObject, weapon: WEAPON, offsetX: number, offsetY: number, offsetZ: number];
  npcFinishNodePoint: [npc: NPC, nodeId: number, pointId: number];
  npcFinishNode: [npc: NPC, nodeId: number];
  npcChangeNode: [npc: NPC, newNodeId: number, oldNodeId: number];
  npcFinishMovePath: [npc: NPC, pathId: number];
  npcFinishMovePathPoint: [npc: NPC, pathId: number, pointId: number];
  objectMove: [object: ObjectMp];
  playerObjectMove: [player: Player, object: PlayerObject];
  playerEditObject: [player: Player, object: ObjectMp, response: EDIT_RESPONSE, offsetX: number, offsetY: number, offsetZ: number, rotationX: number, rotationY: number, rotationZ: number];
  playerEditPlayerObject: [player: Player, object: PlayerObject, response: EDIT_RESPONSE, offsetX: number, offsetY: number, offsetZ: number, rotationX: number, rotationY: number, rotationZ: number];
  playerEditAttachedObject: [player: Player, saved: boolean, index: number, model: number, bone: number, offsetX: number, offsetY: number, offsetZ: number, rotationX: number, rotationY: number, rotationZ: number, scaleX: number, scaleY: number, scaleZ: number];
  playerSelectObject: [player: Player, object: ObjectMp, model: number, x: number, y: number, z: number];
  playerSelectPlayerObject: [player: Player, object: PlayerObject, model: number, x: number, y: number, z: number];
  playerPickUpPickup: [player: Player, pickup: Pickup];
  playerCancelTextDrawSelection: [player: Player];
  playerCancelPlayerTextDrawSelection: [player: Player];
  playerClickTextDraw: [player: Player, textdraw: TextDraw];
  playerClickPlayerTextDraw: [player: Player, textdraw: PlayerTextDraw];
  playerConnect: [player: Player];
  playerSpawn: [player: Player];
  playerCommandText: [player: Player, command: string];
  playerKeyStateChange: [player: Player, newKeys: KeyMask, oldKeys: KeyMask];
  incomingConnection: [player: Player, ipAddress: string, port: number];
  playerDisconnect: [player: Player, reason: number];
  playerRequestSpawn: [player: Player];
  playerStreamIn: [player: Player, forPlayer: Player];
  playerStreamOut: [player: Player, forPlayer: Player];
  playerText: [player: Player, text: string];
  playerShotMissed: [player: Player, weapon: WEAPON, x: number, y: number, z: number];
  playerShotPlayer: [player: Player, target: Player, weapon: WEAPON, x: number, y: number, z: number];
  playerShotVehicle: [player: Player, target: Vehicle, weapon: WEAPON, x: number, y: number, z: number];
  playerShotObject: [player: Player, target: ObjectMp, weapon: WEAPON, x: number, y: number, z: number];
  playerShotPlayerObject: [player: Player, target: PlayerObject, weapon: WEAPON, x: number, y: number, z: number];
  playerDeath: [player: Player, killer: Player | undefined, reason: WEAPON];
  playerTakeDamage: [player: Player, from: Player | undefined, amount: number, weapon: WEAPON, bodyPart: BODY_PART];
  playerGiveDamage: [player: Player, to: Player, amount: number, weapon: WEAPON, bodyPart: BODY_PART];
  playerInteriorChange: [player: Player, newInterior: number, oldInterior: number];
  playerStateChange: [player: Player, newState: PLAYER_STATE, oldState: PLAYER_STATE];
  playerClickMap: [player: Player, x: number, y: number, z: number];
  playerClickPlayer: [player: Player, clicked: Player, source: CLICK_SOURCE];
  clientCheckResponse: [player: Player, actionType: number, address: number, result: number];
  playerUpdate: [player: Player];
  vehicleStreamIn: [vehicle: Vehicle, player: Player];
  vehicleStreamOut: [vehicle: Vehicle, player: Player];
  vehicleDeath: [vehicle: Vehicle, player: Player];
  playerEnterVehicle: [player: Player, vehicle: Vehicle, passenger: boolean];
  playerExitVehicle: [player: Player, vehicle: Vehicle];
  vehicleDamageStatusUpdate: [vehicle: Vehicle, player: Player];
  vehiclePaintJob: [player: Player, vehicle: Vehicle, paintJob: number];
  vehicleMod: [player: Player, vehicle: Vehicle, component: number];
  vehicleRespray: [player: Player, vehicle: Vehicle, color1: number, color2: number];
  enterExitModShop: [player: Player, enterExit: number, interiorId: number];
  vehicleSpawn: [vehicle: Vehicle];
  unoccupiedVehicleUpdate: [vehicle: Vehicle, player: Player, seat: number, posX: number, posY: number, posZ: number, velocityX: number, velocityY: number, velocityZ: number];
  trailerUpdate: [player: Player, trailer: Vehicle];
  vehicleSirenStateChange: [player: Player, vehicle: Vehicle, sirenState: number];
}

export type EventName = keyof EventMap;
export type EventArgs<K extends EventName> = EventMap[K];
export type EventCallback<K extends EventName> = (
  ...args: EventArgs<K>
) => EventHandlerResult;
