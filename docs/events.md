# Events

`omp.on`, `omp.addListener`, `omp.removeListener`, and `omp.removeAllListeners` use the same event catalogue. Use the literal event name to get the callback tuple from TypeScript:

```ts
import { omp } from "@omp-node/core";

omp.on("playerTakeDamage", (player, from, amount, weapon, bodyPart) => {
  // player: Player
  // from: Player | undefined
  // amount: number, weapon: WEAPON, bodyPart: BODY_PART
  void [player, from, amount, weapon, bodyPart];
});
```

Callbacks may be synchronous or asynchronous. For events with a stop rule below, return the indicated boolean to stop the native listener chain. Return values for ordinary events are ignored. `removeListener` requires the same callback reference that was registered.

`EventMap` is the public event catalogue, and `EventArgs<"eventName">` can be used when a resource needs the tuple directly. `EventHandlerResult` is the exported callback result type: `void | boolean | number | Promise<void | boolean | number>`.

The built-in event overloads are keyed by literal event names. Custom resource events remain supported with their own callback parameter types.

## Resource and server events

| Event | Callback arguments | Stop rule |
| --- | --- | --- |
| `resourceStart` | `(error: boolean)` | ignored |
| `tick` | `(elapsed: number)` | ignored |
| `consoleText` | `(command: string, parameters: string)` | return `true` |
| `rconLoginAttempt` | `(address: string, password: string, success: boolean)` | return `true` |
| `incomingConnection` | `(player: Player, ipAddress: string, port: number)` | ignored |
| `playerRequestDownload` | `(player: Player, type: DOWNLOAD_REQUEST, checksum: number)` | ignored |
| `playerFinishedDownloading` | `(player: Player, virtualWorld: number)` | ignored |

`resourceStart` is delivered after the package has initialized its public pools. Its `error` argument indicates whether resource startup failed.

## Checkpoints, zones, menus, and actors

| Event | Callback arguments | Stop rule |
| --- | --- | --- |
| `playerGiveDamageActor` | `(player: Player, actor: Actor, amount: number, weapon: WEAPON, part: BODY_PART)` | ignored |
| `actorStreamIn` | `(actor: Actor, forPlayer: Player)` | ignored |
| `actorStreamOut` | `(actor: Actor, forPlayer: Player)` | ignored |
| `playerEnterCheckpoint` | `(player: Player)` | ignored |
| `playerLeaveCheckpoint` | `(player: Player)` | ignored |
| `playerEnterRaceCheckpoint` | `(player: Player)` | ignored |
| `playerLeaveRaceCheckpoint` | `(player: Player)` | ignored |
| `playerEnterGangZone` | `(player: Player, zone: GangZone)` | ignored |
| `playerLeaveGangZone` | `(player: Player, zone: GangZone)` | ignored |
| `playerClickGangZone` | `(player: Player, zone: GangZone)` | ignored |
| `playerRequestClass` | `(player: Player, classId: number)` | return `false` |
| `playerSelectedMenuRow` | `(player: Player, row: number)` | ignored |
| `playerExitedMenu` | `(player: Player)` | ignored |

## NPC events

| Event | Callback arguments | Stop rule |
| --- | --- | --- |
| `npcFinishMove` | `(npc: NPC)` | ignored |
| `npcCreate` | `(npc: NPC)` | ignored |
| `npcDestroy` | `(npc: NPC)` | ignored |
| `npcWeaponStateChange` | `(npc: NPC, newState: WEAPONSTATE, oldState: WEAPONSTATE)` | ignored |
| `npcTakeDamage` | `(npc: NPC, damager: NPC, damage: number, weapon: WEAPON, bodyPart: BODY_PART)` | return `false` |
| `npcGiveDamage` | `(npc: NPC, damaged: NPC, damage: number, weapon: WEAPON, bodyPart: BODY_PART)` | return `true` |
| `npcDeath` | `(npc: NPC, killer: Player | undefined, reason: WEAPON)` | ignored |
| `npcSpawn` | `(npc: NPC)` | ignored |
| `npcRespawn` | `(npc: NPC)` | ignored |
| `npcPlaybackStart` | `(npc: NPC, recordId: number)` | ignored |
| `npcPlaybackEnd` | `(npc: NPC, recordId: number)` | ignored |
| `npcShotMissed` | `(npc: NPC, weapon: WEAPON, offsetX: number, offsetY: number, offsetZ: number)` | return `false` |
| `npcShotPlayer` | `(npc: NPC, player: Player, weapon: WEAPON, offsetX: number, offsetY: number, offsetZ: number)` | return `false` |
| `npcShotNPC` | `(npc: NPC, npcTarget: NPC, weapon: WEAPON, offsetX: number, offsetY: number, offsetZ: number)` | return `false` |
| `npcShotVehicle` | `(npc: NPC, vehicle: Vehicle, weapon: WEAPON, offsetX: number, offsetY: number, offsetZ: number)` | return `false` |
| `npcShotObject` | `(npc: NPC, object: ObjectMp, weapon: WEAPON, offsetX: number, offsetY: number, offsetZ: number)` | return `false` |
| `npcShotPlayerObject` | `(npc: NPC, playerObject: PlayerObject, weapon: WEAPON, offsetX: number, offsetY: number, offsetZ: number)` | return `false` |
| `npcFinishNodePoint` | `(npc: NPC, nodeId: number, pointId: number)` | ignored |
| `npcFinishNode` | `(npc: NPC, nodeId: number)` | ignored |
| `npcChangeNode` | `(npc: NPC, newNodeId: number, oldNodeId: number)` | return `false` |
| `npcFinishMovePath` | `(npc: NPC, pathId: number)` | ignored |
| `npcFinishMovePathPoint` | `(npc: NPC, pathId: number, pointId: number)` | ignored |

## Object and UI events

| Event | Callback arguments | Stop rule |
| --- | --- | --- |
| `objectMove` | `(object: ObjectMp)` | ignored |
| `playerObjectMove` | `(player: Player, object: PlayerObject)` | ignored |
| `playerEditObject` | `(player: Player, object: ObjectMp, response: EDIT_RESPONSE, offsetX: number, offsetY: number, offsetZ: number, rotationX: number, rotationY: number, rotationZ: number)` | ignored |
| `playerEditPlayerObject` | `(player: Player, object: PlayerObject, response: EDIT_RESPONSE, offsetX: number, offsetY: number, offsetZ: number, rotationX: number, rotationY: number, rotationZ: number)` | ignored |
| `playerEditAttachedObject` | `(player: Player, saved: boolean, index: number, model: number, bone: number, offsetX: number, offsetY: number, offsetZ: number, rotationX: number, rotationY: number, rotationZ: number, scaleX: number, scaleY: number, scaleZ: number)` | ignored |
| `dialogResponse` | `(player: Player, dialogId: number, response: number, listItem: number, inputText: string)` | ignored |
| `playerSelectObject` | `(player: Player, object: ObjectMp, model: number, x: number, y: number, z: number)` | ignored |
| `playerSelectPlayerObject` | `(player: Player, object: PlayerObject, model: number, x: number, y: number, z: number)` | ignored |
| `playerPickUpPickup` | `(player: Player, pickup: Pickup)` | ignored |
| `playerCancelTextDrawSelection` | `(player: Player)` | ignored |
| `playerCancelPlayerTextDrawSelection` | `(player: Player)` | ignored |
| `playerClickTextDraw` | `(player: Player, textdraw: TextDraw)` | ignored |
| `playerClickPlayerTextDraw` | `(player: Player, textdraw: PlayerTextDraw)` | ignored |

## Player events

| Event | Callback arguments | Stop rule |
| --- | --- | --- |
| `playerConnect` | `(player: Player)` | ignored |
| `playerSpawn` | `(player: Player)` | ignored |
| `playerCommandText` | `(player: Player, command: string)` | return `true` |
| `playerKeyStateChange` | `(player: Player, newKeys: KeyMask, oldKeys: KeyMask)` | ignored |
| `playerDisconnect` | `(player: Player, reason: number)` | ignored |
| `playerRequestSpawn` | `(player: Player)` | return `false` |
| `playerStreamIn` | `(player: Player, forPlayer: Player)` | ignored |
| `playerStreamOut` | `(player: Player, forPlayer: Player)` | ignored |
| `playerText` | `(player: Player, text: string)` | return `false` |
| `playerShotMissed` | `(player: Player, weapon: WEAPON, x: number, y: number, z: number)` | return `false` |
| `playerShotPlayer` | `(player: Player, target: Player, weapon: WEAPON, x: number, y: number, z: number)` | return `false` |
| `playerShotVehicle` | `(player: Player, target: Vehicle, weapon: WEAPON, x: number, y: number, z: number)` | return `false` |
| `playerShotObject` | `(player: Player, target: ObjectMp, weapon: WEAPON, x: number, y: number, z: number)` | return `false` |
| `playerShotPlayerObject` | `(player: Player, target: PlayerObject, weapon: WEAPON, x: number, y: number, z: number)` | return `false` |
| `playerDeath` | `(player: Player, killer: Player | undefined, reason: WEAPON)` | ignored |
| `playerTakeDamage` | `(player: Player, from: Player | undefined, amount: number, weapon: WEAPON, bodyPart: BODY_PART)` | ignored |
| `playerGiveDamage` | `(player: Player, to: Player, amount: number, weapon: WEAPON, bodyPart: BODY_PART)` | ignored |
| `playerInteriorChange` | `(player: Player, newInterior: number, oldInterior: number)` | ignored |
| `playerStateChange` | `(player: Player, newState: PLAYER_STATE, oldState: PLAYER_STATE)` | ignored |
| `playerClickMap` | `(player: Player, x: number, y: number, z: number)` | ignored |
| `playerClickPlayer` | `(player: Player, clicked: Player, source: CLICK_SOURCE)` | ignored |
| `clientCheckResponse` | `(player: Player, actionType: number, address: number, result: number)` | ignored |
| `playerUpdate` | `(player: Player)` | return `false` |

## Vehicle events

| Event | Callback arguments | Stop rule |
| --- | --- | --- |
| `vehicleStreamIn` | `(vehicle: Vehicle, player: Player)` | ignored |
| `vehicleStreamOut` | `(vehicle: Vehicle, player: Player)` | ignored |
| `vehicleDeath` | `(vehicle: Vehicle, player: Player)` | ignored |
| `playerEnterVehicle` | `(player: Player, vehicle: Vehicle, passenger: boolean)` | ignored |
| `playerExitVehicle` | `(player: Player, vehicle: Vehicle)` | ignored |
| `vehicleDamageStatusUpdate` | `(vehicle: Vehicle, player: Player)` | ignored |
| `vehiclePaintJob` | `(player: Player, vehicle: Vehicle, paintJob: number)` | return `false` |
| `vehicleMod` | `(player: Player, vehicle: Vehicle, component: number)` | return `false` |
| `vehicleRespray` | `(player: Player, vehicle: Vehicle, color1: number, color2: number)` | return `false` |
| `enterExitModShop` | `(player: Player, enterExit: number, interiorId: number)` | ignored |
| `vehicleSpawn` | `(vehicle: Vehicle)` | ignored |
| `unoccupiedVehicleUpdate` | `(vehicle: Vehicle, player: Player, seat: number, posX: number, posY: number, posZ: number, velocityX: number, velocityY: number, velocityZ: number)` | return `false` |
| `trailerUpdate` | `(player: Player, trailer: Vehicle)` | return `false` |
| `vehicleSirenStateChange` | `(player: Player, vehicle: Vehicle, sirenState: number)` | return `false` |
