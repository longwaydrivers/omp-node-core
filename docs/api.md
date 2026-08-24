# API reference

This page is the map of the complete public API. Every name below is exported by `@omp-node/core`; the generated `dist/bundle.d.ts` contains the exact parameter and return signatures, including the object fields returned by getters.

## Shared conventions

- Entity classes wrap native open.mp objects. Their `getID()` and `getPtr()` values can become `null` after `destroy()`.
- Constructors that accept a full set of creation arguments create a native object. Constructors that accept only an ID attach to an existing object and are primarily used by pools.
- `destroy()` invalidates the wrapper. Most invalid native calls throw for an invalid wrapper; valid native calls report failure with `false`.
- Methods beginning with `get` may return a direct value or an object with `ret` and output fields. Check `ret` when present.
- Static utility classes do not need to be instantiated.

## `omp`

`omp` is the global server bridge.

### Event methods

`omp.on(eventName, callback)`, `omp.addListener(eventName, callback)`, `omp.removeListener(eventName, callback)`, and `omp.removeAllListeners(eventName)` are available for every event in [Events](events.md). The typed overload is selected from the literal event name via `EventMap`; `EventArgs<"eventName">` and `EventCallback<"eventName">` are also exported for reusable handlers. A string event name is accepted for resource-defined events and keeps the callback type supplied by the resource.

`omp.log(message?, ...optionalParams)` writes to the open.mp server log as well as the Node process log.

### Runtime limits

`omp.limits.textDraw` contains the capacities reported by the running server:

```ts
omp.limits.textDraw.global;
omp.limits.textDraw.player;
```

These values come from `textdraw.global_limit` and `textdraw.player_limit` in
the server configuration. The legacy `max_global_textdraws` and
`max_player_textdraws` keys are also recognized. The exported
`GLOBAL_TEXTDRAW_POOL_SIZE` and `PLAYER_TEXTDRAW_POOL_SIZE` values are only
fallbacks for hosts that do not expose either configuration form.

### Entity pools

| Property | Type | Contents |
| --- | --- | --- |
| `players` | `Pool<Player>` | Global players |
| `vehicles` | `Pool<Vehicle>` | Global vehicles |
| `objects` | `Pool<ObjectMp>` | Global objects |
| `textdraws` | `Pool<TextDraw>` | Global textdraws |
| `pickups` | `Pool<Pickup>` | Pickups |
| `gangzones` | `Pool<GangZone>` | Gang zones |
| `textlabels` | `Pool<TextLabel>` | Global text labels |
| `actors` | `Pool<Actor>` | Actors |
| `menus` | `Pool<Menu>` | Menus |
| `npcs` | `Pool<NPC>` | NPCs |
| `playerObjects` | `PerPlayerEntityPool<PlayerPool<PlayerObject>>` | Per-player objects |
| `playerTextLabels` | `PerPlayerEntityPool<PlayerPool<PlayerTextLabel>>` | Per-player text labels |
| `playerTextDraws` | `PerPlayerEntityPool<PlayerPool<PlayerTextDraw>>` | Per-player textdraws |

`omp.resource` exposes `{ name, path, entryFile }` for the current resource.

## Pools

### `Pool<T>`

Used for global entities.

```text
at(id)              -> T | undefined   Find by open.mp entity ID.
get(ptr)            -> T | undefined   Find by native pointer.
all()               -> T[]             Return a snapshot of current entries.
forEach(callback)                       Iterate current entries; callback receives (entity, pointer).
```

### `PlayerPool<T>`

The per-player equivalent of `Pool<T>`. It has `player`, `at(id)`, `get(ptr)`, `all()`, and `forEach(callback)`, where the callback receives `(entity, pointer)`.

### `PerPlayerEntityPool<T>`

Maps a player ID to a `PlayerPool<T>` with `at(playerId)`. `Pool<T>` and `PlayerPool<T>` also expose `add_INTERNAL_UNSAFE`, `remove_INTERNAL_UNSAFE`, `entries_INTERNAL_UNSAFE`, and `ids_INTERNAL_UNSAFE`; `PerPlayerEntityPool<T>` exposes `entries_INTERNAL_UNSAFE`. These are implementation hooks used to synchronize native pool events; resource code should use the public lookup and iteration methods instead.

## Static utility classes

### `All`

Server-wide operations: `sendClientMessage`, `createExplosion`, `sendDeathMessage`, and `enableStuntBonus`.

### `Checkpoint`

Per-player ordinary checkpoint operations: `set`, `disable`, `isPlayerIn`, `isActive`, and `get`.

### `Class`

Spawn-class management. `new Class(...)` creates a class, while `new Class(id)` wraps one. Public methods are `destroy`, `getPtr`, `getID`, `getData`, and `edit`; `count` is static. Weapon arguments and returned weapon fields use `WEAPON`.

### `Config`

Configuration readers: `getAsBool`, `getAsInt`, `getAsFloat`, and `getAsString`.

### `Core`

Server-wide configuration, rules, weather, text, and permission helpers:

```text
tickCount, maxPlayers, log, isAdminTeleportAllowed, allowAdminTeleport,
areAllAnimationsEnabled, enableAllAnimations, isAnimationLibraryValid,
areInteriorWeaponsAllowed, allowInteriorWeapons, blockIpAddress, unBlockIpAddress,
disableEntryExitMarkers, disableNameTagsLOS, enableZoneNames, showGameTextForAll,
hideGameTextForAll, networkStats, serverTickRate, setChatRadius, setMarkerRadius,
sendRconCommand, setDeathDropAmount, gameMode_SetText, setGravity, getGravity,
setNameTagsDrawDistance, setWeather, setWorldTime, showNameTags,
showPlayerMarkers, usePedAnims, getWeather, getWorldTime,
toggleChatTextReplacement, isChatTextReplacementToggled, isNickNameValid,
allowNickNameCharacter, isNickNameCharacterAllowed, clearBanList,
isIpAddressBanned, getWeaponSlot, addRule, isValidRule, removeRule
```

`showPlayerMarkers` takes `PLAYER_MARKERS_MODE`; `getWeaponSlot` takes `WEAPON` and returns `WEAPON_SLOT`.

### `CustomModel`

Custom model helpers: `addCharModel`, `addSimpleModel`, `addSimpleModelTimed`, `redirectDownload`, `findModelFileNameFromCRC`, `isValid`, and `getPath`.

### `Dialog`

`show` and `hide`. `show` takes `DIALOG_STYLE`.

### `RaceCheckpoint`

Per-player race checkpoint operations: `set`, `disable`, `isPlayerIn`, `isActive`, and `get`. `set` takes `CP_TYPE`.

### `Recording`

`start` and `stop`. `start` takes `PLAYER_RECORDING_TYPE`.

## Entity classes

### `Actor`

Creates and controls a non-player actor.

```text
constructor(model, x, y, z, rot)
destroy, getPtr, getID, isStreamedInFor, setVirtualWorld, getVirtualWorld,
applyAnimation, clearAnimations, setPos, getPos, setFacingAngle,
getFacingAngle, setHealth, getHealth, setInvulnerable, isInvulnerable,
isValid, setSkin, getSkin, getAnimation, getSpawnInfo
```

### `GangZone`

Creates and controls a rectangular gang zone.

```text
constructor(minx, miny, maxx, maxy)
destroy, getPtr, getID, showForPlayer, showForAll, hideForPlayer, hideForAll,
flashForPlayer, flashForAll, stopFlashForPlayer, stopFlashForAll, isValid,
isPlayerIn, isVisibleForPlayer, getColorForPlayer, getFlashColorForPlayer,
isFlashingForPlayer, getPos, useCheck
```

### `Menu`

Creates and controls a server menu.

```text
constructor(title, columns, x, y, column1Width, column2Width)
destroy, getPtr, getID, addItem, setColumnHeader, showForPlayer,
hideForPlayer, disable, disableRow, isValid, isDisabled, isRowDisabled,
getColumns, getItems, getPos, getColumnWidth, getColumnHeader, getItem
```

### `ObjectMp`

Creates and controls a global object.

```text
constructor(model, x, y, z, rotationX, rotationY, rotationZ, drawDistance)
destroy, getPtr, getID, attachToVehicle, attachToObject, attachToPlayer,
setPos, getPos, setRot, getRot, getModel, setNoCameraCollision, isValid,
move, stop, isMoving, beginEditing, setMaterial, setMaterialText,
setDefaultCameraCollision, getDrawDistance, getMoveSpeed, getMovingTargetPos,
getMovingTargetRot, getAttachedData, getAttachedOffset, getSyncRotation,
isMaterialSlotUsed, getMaterial, getMaterialText, isObjectNoCameraCollision

static: beginSelecting, endEditing, getType
```

`setMaterial` and `setMaterialText` use `OBJECT_MATERIAL_SIZE` and `OBJECT_MATERIAL_TEXT_ALIGN` where applicable.

### `Pickup`

```text
constructor(model, type, x, y, z, virtualWorld)
destroy, getPtr, getID, addStatic, isValid, isStreamedIn, getPos, getModel,
getType, getVirtualWorld, setPos, setModel, setType, setVirtualWorld,
showForPlayer, hideForPlayer, isHiddenForPlayer
```

### `TextDraw`

Global textdraw. `showForAll`/`hideForAll` affect all players; player-specific methods affect one player.

```text
constructor(x, y, text)
destroy, getPtr, getID, isValid, isVisibleForPlayer, setLetterSize,
setTextSize, setAlignment, setColor, setUseBox, setBoxColor, setShadow,
setOutline, setBackgroundColor, setFont, setProportional, setSelectable,
showForPlayer, hideForPlayer, showForAll, hideForAll, setString,
setPreviewModel, setPreviewRot, setPreviewVehCol, setPos, getString,
getLetterSize, getTextSize, getPos, getColor, getBoxColor,
getBackgroundColor, getShadow, getOutline, getFont, isBox, isProportional,
isSelectable, getAlignment, getPreviewModel, getPreviewRot,
getPreviewVehColor, setStringForPlayer
```

`setAlignment` and `setFont` use `TEXT_DRAW_ALIGN` and `TEXT_DRAW_FONT`.

### `PlayerTextDraw`

Per-player textdraw. Its methods mirror `TextDraw`, but `show()` and `hide()` target its owner.

```text
constructor(player, x, y, text)
destroy, getPlayer, getPtr, getID, isValid, isVisible, setLetterSize,
setTextSize, setAlignment, setColor, useBox, setBoxColor, setShadow,
setOutline, setBackgroundColor, setFont, setProportional, setSelectable,
show, hide, setString, setPreviewModel, setPreviewRot, setPreviewVehCol,
setPos, getString, getLetterSize, getTextSize, getPos, getColor,
getBoxColor, getBackgroundColor, getShadow, getOutline, getFont, isBox,
isProportional, isSelectable, getAlignment, getPreviewModel, getPreviewRot,
getPreviewVehColor
```

### `TextLabel`

Global 3D text label.

```text
constructor(text, color, x, y, z, drawDistance, virtualWorld, testLOS)
destroy, getPtr, getID, attachToPlayer, attachToVehicle, updateText,
isValid, isStreamedIn, getText, getColor, getPos, setDrawDistance,
getDrawDistance, getLOS, setLOS, getVirtualWorld, setVirtualWorld,
getAttachedData
```

### `PlayerTextLabel`

Per-player 3D text label.

```text
constructor(player, text, color, x, y, z, drawDistance, testLOS)
destroy, getPlayer, getPtr, getID, updateText, isValid, getText, getColor,
getPos, setDrawDistance, getDrawDistance, getLOS, setLOS, getVirtualWorld,
getAttachedData
```

### `PlayerObject`

Per-player object. It mirrors the global object API where a player-specific operation exists.

```text
constructor(player, model, x, y, z, rotationX, rotationY, rotationZ, drawDistance)
destroy, getPlayer, getPtr, getID, attachToVehicle, attachToPlayer,
attachToObject, setPos, getPos, setRot, getRot, getModel,
setNoCameraCollision, isValid, move, stop, isMoving, beginEditing,
setMaterial, setMaterialText, getDrawDistance, getMoveSpeed,
getMovingTargetPos, getMovingTargetRot, getAttachedData, getAttachedOffset,
getSyncRotation, isMaterialSlotUsed, getMaterial, getMaterialText,
isNoCameraCollision
```

### `Vehicle`

Creates and controls a vehicle.

```text
constructor(modelid, x, y, z, rotation, color1, color2, respawnDelay)
constructor(id)                         wrap an existing vehicle
destroy, getPtr, getID, isStreamedIn, getPos, setPos, getZAngle,
getRotationQuat, getDistanceFromPoint, setZAngle, setParamsForPlayer,
setParamsEx, getParamsEx, getParamsSirenState, setParamsCarDoors,
getParamsCarDoors, setParamsCarWindows, getParamsCarWindows, setToRespawn,
linkToInterior, addComponent, removeComponent, changeColor, changePaintjob,
setHealth, getHealth, attachTrailer, detachTrailer, isTrailerAttached,
getTrailer, setNumberPlate, getModel, getComponentInSlot, repair,
getVelocity, setVelocity, setAngularVelocity, getDamageStatus,
updateDamageStatus, setVirtualWorld, getVirtualWorld, getLandingGearState,
isValid, addStatic, addStaticEx, getSpawnInfo, setSpawnInfo, getPaintjob,
getColor, getInterior, getNumberPlate, setRespawnDelay, getRespawnDelay,
getCab, getTower, getOccupiedTick, getRespawnTick, hasBeenOccupied,
isOccupied, isDead, setParamsSirenState, toggleSirenEnabled,
isSirenEnabled, getLastDriver, getDriver, getSirenState,
getHydraReactorAngle, getTrainSpeed, getMatrix, getOccupant, countOccupants

static: getMaxPassengerSeats, useManualEngineAndLights, getComponentType,
canHaveComponent, getRandomColorPair, colorIndexToColor, getModelInfo,
enableFriendlyFire, getModelCount, getModelsUsed
```

`getComponentInSlot` uses `CARMODTYPE`; `getModelInfo` uses `VEHICLE_MODEL_INFO`; damage status methods use the vehicle status enums and mask aliases described in [Types and enums](types.md).

### `NPC`

NPC movement, combat, playback, path, and node API.

```text
constructor(name)
destroy, getPtr, getID, isValid, getPlayer, spawn, respawn, setPos, getPos,
setRot, getRot, setFacingAngle, getFacingAngle, setVirtualWorld,
getVirtualWorld, setInterior, getInterior, move, moveToPlayer, stopMove,
isMoving, setSkin, isStreamedIn, isAnyStreamedIn, getAll, setHealth,
getHealth, setArmour, getArmour, isDead, setInvulnerable, isInvulnerable,
setWeapon, getWeapon, setAmmo, getAmmo, setAmmoInClip, getAmmoInClip,
enableReloading, isReloadEnabled, isReloading, enableInfiniteAmmo,
isInfiniteAmmoEnabled, getWeaponState, setKeys, getKeys,
setWeaponSkillLevel, getWeaponSkillLevel, meleeAttack, stopMeleeAttack,
isMeleeAttacking, setFightingStyle, getFightingStyle, shoot, isShooting,
aimAt, aimAtPlayer, stopAim, isAiming, isAimingAtPlayer,
setWeaponAccuracy, getWeaponAccuracy, setWeaponReloadTime,
getWeaponReloadTime, getWeaponActualReloadTime, setWeaponShootTime,
getWeaponShootTime, setWeaponClipSize, getWeaponClipSize,
getWeaponActualClipSize, enterVehicle, exitVehicle, putInVehicle,
removeFromVehicle, getVehicle, getVehicleID, getEnteringVehicle,
getEnteringVehicleID, getVehicleSeat, getEnteringVehicleSeat,
isEnteringVehicle, useVehicleSiren, isVehicleSirenUsed, setVehicleHealth,
getVehicleHealth, setVehicleHydraThrusters, getVehicleHydraThrusters,
setVehicleGearState, getVehicleGearState, setVehicleTrainSpeed,
getVehicleTrainSpeed, getCurrentPathPointIndex, moveByPath, resetAnimation,
setAnimation, getAnimation, applyAnimation, clearAnimations,
setSpecialAction, getSpecialAction, startPlayback, startPlaybackEx,
stopPlayback, pausePlayback, isPlayingPlayback, isPlaybackPaused, playNode,
stopPlayingNode, pausePlayingNode, resumePlayingNode, isPlayingNodePaused,
isPlayingNode, changeNode, updateNodePoint, setSurfingOffset,
getSurfingOffset, setSurfingVehicle, getSurfingVehicle, setSurfingObject,
getSurfingObject, setSurfingPlayerObject, resetSurfingData

static: createPath, destroyPath, destroyAllPath, getPathCount, addPointToPath,
removePointFromPath, clearPath, getPathPointCount, getPathPoint, isValidPath,
hasPathPointInRange, loadRecord, unloadRecord, isValidRecord, getRecordCount,
unloadAllRecords, openNode, closeNode, isNodeOpen, getNodeType, setNodePoint,
getNodePointPosition, getNodePointCount, getNodeInfo
```

NPC weapon, action, movement, and hit arguments use `WEAPON`, `WEAPONSTATE`, `WEAPONSKILL`, `SPECIAL_ACTION`, `FIGHT_STYLE`, `NPC_MOVE_TYPE`, `BULLET_HIT_TYPE`, and `NpcEntityCheckMask`.

### `Player`

The player API covers connection/network data, movement, camera, world state, weapons, animations, text, moderation, and vehicle interaction.

```text
constructor(id)
getPtr, getID, setSpawnInfo, getSpawnInfo, getNetworkStats,
netStatsBytesReceived, netStatsBytesSent, netStatsConnectionStatus,
netStatsGetConnectedTime, netStatsGetIpPort, netStatsMessagesReceived,
netStatsMessagesRecvPerSecond, netStatsMessagesSent,
netStatsPacketLossPercent, getCustomSkin, getDialog, getDialogData,
getMenu, getSurfingPlayerObject, getCameraTargetPlayerObject,
sendClientMessage, setCameraPos, setDrunkLevel, setInterior, setWantedLevel,
setWeather, getWeather, setSkin, setShopName, giveMoney, setCameraLookAt,
setCameraBehind, createExplosion, playAudioStream, stopAudioStream,
toggleWidescreen, isWidescreenToggled, setHealth, getHealth, setArmor,
getArmor, setTeam, getTeam, setScore, getScore, getSkin, setColor, getColor,
getDefaultColor, getDrunkLevel, giveWeapon, removeWeapon, getMoney,
resetMoney, setName, getName, getState, getPing, getWeapon, setTime,
getTime, toggleClock, hasClock, forceClassSelection, getWantedLevel,
setFightingStyle, getFightingStyle, setVelocity, getVelocity, getCameraPos,
getDistanceFromPoint, getInterior, setPos, getPos, getVirtualWorld, isNPC,
isStreamedIn, playGameSound, spectatePlayer, spectateVehicle,
setVirtualWorld, setWorldBounds, clearWorldBounds, getWorldBounds,
clearAnimations, getLastShotVectors, getCameraTargetPlayer,
getCameraTargetActor, getCameraTargetObject, getCameraTargetVehicle,
putInVehicle, removeBuilding, getBuildingsRemoved, removeFromVehicle,
removeMapIcon, setMapIcon, resetWeapons, setAmmo, setArmedWeapon,
setChatBubble, setPosFindZ, setSkillLevel, setSpecialAction,
showNameTagForPlayer, toggleControllable, toggleSpectating, applyAnimation,
editAttachedObject, enableCameraTarget, enableStuntBonus, getPlayerAmmo,
getAnimationIndex, getFacingAngle, getIp, getSpecialAction, getVehicleID,
getVehicleSeat, getWeaponData, getWeaponState, interpolateCameraPos,
interpolateCameraLookAt, isPlayerAttachedObjectSlotUsed,
attachCameraToObject, attachCameraToPlayerObject, getCameraAspectRatio,
getCameraFrontVector, getCameraMode, getKeys, getSurfingVehicle,
getSurfingObject, getTargetPlayer, getTargetActor, isInVehicle,
isInAnyVehicle, isInRangeOfPoint, playCrimeReport, removeAttachedObject,
setAttachedObject, getAttachedObject, setFacingAngle, setMarkerForPlayer,
getMarkerForPlayer, allowTeleport, isTeleportAllowed,
disableRemoteVehicleCollisions, getCameraZoom, selectTextDraw,
cancelSelectTextDraw, sendClientCheck, spawn, gPCI, isAdmin, kick,
showGameText, hideGameText, hasGameText, getGameText, ban, banEx,
sendDeathMessage, sendMessageToPlayer, getVersion, getSkillLevel, getZAim,
getSurfingOffsets, getRotationQuat, getPlayerSpectateID, getSpectateType,
getRawIp, setGravity, getGravity, setAdmin, isSpawned, isControllable,
isCameraTargetEnabled, toggleGhostMode, getGhostMode, allowWeapons,
areWeaponsAllowed, isPlayerUsingOfficialClient, getAnimationFlags,
isInDriveByMode, isCuffed, isInModShop, getSirenState,
getLandingGearState, getHydraReactorAngle, getTrainSpeed

static: getAnimationName
```

Important typed arguments include `WEAPON`, `WEAPON_SLOT`, `WEAPONSTATE`, `WEAPONSKILL`, `PLAYER_STATE`, `SPECIAL_ACTION`, `FIGHT_STYLE`, `DIALOG_STYLE`, `CAM_MOVE`, `CAM_MODE`, `MAPICON`, `SPECTATE_MODE`, `FORCE_SYNC`, and `KeyMask`.
