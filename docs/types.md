# Types, enums, masks, and constants

All names in this page are exported from `@omp-node/core`. The enum values mirror the tagged values in [omp-stdlib](https://github.com/openmultiplayer/omp-stdlib). That matters because these values cross the native/Pawn/Node boundary; changing a numeric value is an ABI change.

The package keeps the uppercase names used by Pawn and open.mp (`WEAPON`, `PLAYER_STATE`, and so on) and also exports PascalCase aliases (`Weapon`, `PlayerState`, and so on) for idiomatic TypeScript. Both names refer to the same runtime enum.

The enums are regular TypeScript enums. They can be used as a type and at runtime:

```ts
import { DialogStyle, Weapon } from "@omp-node/core";

const weapon = Weapon.M4;
const label = Weapon[weapon];
const style = DialogStyle.INPUT;
```

## Choosing an enum or a mask

A value that represents one state uses its enum type. A value that can contain several flags uses a `*Mask` alias:

```ts
import {
  Key,
  KeyMask,
  NpcEntityCheck,
  NpcEntityCheckMask,
  VehicleDoorStatus,
  VehicleDoorStatusMask,
} from "@omp-node/core";

const keys: KeyMask = Key.FIRE | Key.AIM;
const entityChecks: NpcEntityCheckMask =
  NpcEntityCheck.PLAYER | NpcEntityCheck.VEHICLE;
const doors: VehicleDoorStatusMask =
  VehicleDoorStatus.HOOD_OPEN | VehicleDoorStatus.TRUNK_OPEN;
```

The aliases are intentionally `number`: a bitwise combination is not a single enum member. The exported flag enums provide readable constants and the mask aliases describe the API boundary.

## Runtime limits

`TextDrawLimits` describes the textdraw capacities resolved during resource
startup:

```ts
import { omp, type TextDrawLimits } from "@omp-node/core";

const limits: TextDrawLimits = omp.limits.textDraw;
limits.global;
limits.player;
```

These are runtime values. Do not use the exported textdraw pool-size constants
to infer the capacity of a server that supports configurable textdraw pools.

## Player and combat enums

### `WEAPON`

`WEAPON` is used for weapon IDs and for the special reason values delivered by death events.

| Member | Value |
| --- | ---: |
| `FIST` | 0 |
| `BRASSKNUCKLE` | 1 |
| `GOLFCLUB` | 2 |
| `NITESTICK` / `NIGHTSTICK` | 3 |
| `KNIFE` | 4 |
| `BAT` | 5 |
| `SHOVEL` | 6 |
| `POOLSTICK` | 7 |
| `KATANA` | 8 |
| `CHAINSAW` | 9 |
| `DILDO`, `DILDO2` | 10, 11 |
| `VIBRATOR`, `VIBRATOR2` | 12, 13 |
| `FLOWER` | 14 |
| `CANE` | 15 |
| `GRENADE` | 16 |
| `TEARGAS` | 17 |
| `MOLTOV` / `MOLOTOV` | 18 |
| `COLT45` | 22 |
| `SILENCED` | 23 |
| `DEAGLE` | 24 |
| `SHOTGUN` | 25 |
| `SAWEDOFF` | 26 |
| `SHOTGSPA` | 27 |
| `UZI` | 28 |
| `MP5` | 29 |
| `AK47` | 30 |
| `M4` | 31 |
| `TEC9` | 32 |
| `RIFLE` | 33 |
| `SNIPER` | 34 |
| `ROCKETLAUNCHER` | 35 |
| `HEATSEEKER` | 36 |
| `FLAMETHROWER` | 37 |
| `MINIGUN` | 38 |
| `SATCHEL` | 39 |
| `BOMB` | 40 |
| `SPRAYCAN` | 41 |
| `FIREEXTINGUISHER` | 42 |
| `CAMERA` | 43 |
| `NIGHT_VISION_GOGGLES` / `NIGHT_VIS_GOGGLES` | 44 |
| `THERMAL_GOGGLES` | 45 |
| `PARACHUTE` | 46 |
| `REASON_VEHICLE` / `WEAPON_VEHICLE` | 49 |
| `REASON_HELICOPTER_BLADES` | 50 |
| `REASON_EXPLOSION` | 51 |
| `REASON_DROWN` / `WEAPON_DROWN` | 53 |
| `REASON_COLLISION` / `WEAPON_COLLISION` | 54 |
| `REASON_SPLAT` / `WEAPON_SPLAT` | 54 |
| `REASON_CONNECT` | 200 |
| `REASON_DISCONNECT` | 201 |
| `REASON_SUICIDE` | 255 |
| `UNKNOWN` / `WEAPON_UNKNOWN` | -1 |

### Other player/combat enums

| Enum | Values |
| --- | --- |
| `WEAPON_SLOT` | `UNARMED=0`, `MELEE=1`, `PISTOL=2`, `SHOTGUN=3`, `MACHINE_GUN=4`, `ASSAULT_RIFLE=5`, `LONG_RIFLE=6`, `ARTILLERY=7`, `EXPLOSIVES=8`, `EQUIPMENT=9`, `GIFT=10`, `GADGET=11`, `DETONATOR=12`, `UNKNOWN=-1` |
| `PLAYER_MARKERS_MODE` | `OFF=0`, `GLOBAL=1`, `STREAMED=2`, `UNKNOWN=-1` |
| `PLAYER_STATE` | `NONE=0`, `ON_FOOT=1`, `DRIVER=2`, `PASSENGER=3`, `EXIT_VEHICLE=4`, `ENTER_VEHICLE_DRIVER=5`, `ENTER_VEHICLE_PASSENGER=6`, `WASTED=7`, `SPAWNED=8`, `SPECTATING=9`, `UNKNOWN=-1` |
| `SPECIAL_ACTION` | `NONE=0`, `DUCK=1`, `USEJETPACK=2`, `ENTER_VEHICLE=3`, `EXIT_VEHICLE=4`, `DANCE1..DANCE4=5..8`, `HANDSUP=10`, `USECELLPHONE=11`, `SITTING=12`, `STOPUSECELLPHONE=13`, `DRINK_BEER=20`, `SMOKE_CIGGY=21`, `DRINK_WINE=22`, `DRINK_SPRUNK=23`, `CUFFED=24`, `CARRY=25`, `PISSING=68`, `UNKNOWN=-1` |
| `FIGHT_STYLE` | `NORMAL=4`, `BOXING=5`, `KUNGFU=6`, `KNEEHEAD=7`, `GRABKICK=15`, `ELBOW=16`, `UNKNOWN=-1` |
| `WEAPONSKILL` | `PISTOL=0`, `PISTOL_SILENCED=1`, `DESERT_EAGLE=2`, `SHOTGUN=3`, `SAWNOFF_SHOTGUN=4`, `SPAS12_SHOTGUN=5`, `MICRO_UZI=6`, `MP5=7`, `AK47=8`, `M4=9`, `SNIPERRIFLE=10`, `INVALID=-1` |
| `WEAPONSTATE` | `NO_BULLETS=0`, `LAST_BULLET=1`, `MORE_BULLETS=2`, `RELOADING=3`, `UNKNOWN=-1` |
| `BODY_PART` | `TORSO=3`, `GROIN=4`, `LEFT_ARM=5`, `RIGHT_ARM=6`, `LEFT_LEG=7`, `RIGHT_LEG=8`, `HEAD=9`, `UNKNOWN=-1` |

`BODY_PART` is a typed SDK domain value for damage callbacks; the Pawn callback parameter is historically untagged in omp-stdlib.

## Input, camera, and UI enums

| Enum | Values |
| --- | --- |
| `KEY` | `NONE=0`, `ACTION=1`, `CROUCH=2`, `FIRE=4`, `SPRINT=8`, `SECONDARY_ATTACK=16`, `JUMP=32`, `LOOK_RIGHT=64`, `HANDBRAKE/AIM=128`, `LOOK_LEFT=256`, `SUBMISSION/LOOK_BEHIND=512`, `WALK=1024`, `ANALOG_UP=2048`, `ANALOG_DOWN=4096`, `ANALOG_LEFT=8192`, `ANALOG_RIGHT=16384`, `YES=65536`, `NO=131072`, `CTRL_BACK=262144`, analog directions `UP=-128`, `DOWN=128`, `LEFT=-128`, `RIGHT=128`, `UNKNOWN=-1` |
| `CAM_MOVE` | `MOVE/CAMERA_MOVE=1`, `CUT/CAMERA_CUT=2`, `UNKNOWN=-1` |
| `CAM_MODE` | `NONE=0`, `BEHINDCAR=3`, `FOLLOWPED=4`, `SNIPER=7`, `ROCKETLAUNCHER=8`, `FIXED=15`, `FIRST_PERSON=16`, `CAM_ON_A_STRING=18`, `BEHINDBOAT=22`, `CAMERA=46`, `ROCKETLAUNCHER_HS=51`, `AIMWEAPON=53`, `AIMWEAPON_FROMCAR=55`, `DW_HELI_CHASE=56`, `UNKNOWN/DISCONNECTED=-1` |
| `MAPICON` | `LOCAL=0`, `GLOBAL=1`, `LOCAL_CHECKPOINT=2`, `GLOBAL_CHECKPOINT=3`, `UNKNOWN=-1` |
| `SPECTATE_MODE` | `NORMAL=1`, `FIXED=2`, `SIDE=3`, `UNKNOWN=-1` |
| `DIALOG_STYLE` | `MSGBOX=0`, `INPUT=1`, `LIST=2`, `PASSWORD=3`, `TABLIST=4`, `TABLIST_HEADERS=5`, `UNKNOWN=-1` |
| `EDIT_RESPONSE` | `CANCEL=0`, `FINAL=1`, `UPDATE=2`, `UNKNOWN=-1` |
| `CP_TYPE` | `GROUND_NORMAL=0`, `GROUND_FINISH=1`, `GROUND_EMPTY=2`, `AIR_NORMAL=3`, `AIR_FINISH=4`, `AIR_ROTATING=5`, `AIR_STROBING=6`, `AIR_SWINGING=7`, `AIR_BOBBING=8`, `UNKNOWN=-1` |
| `SELECT_OBJECT` | `GLOBAL_OBJECT=1`, `PLAYER_OBJECT=2`, `UNKNOWN=-1` |
| `OBJECT_MATERIAL_TEXT_ALIGN` | `LEFT=0`, `CENTER/CENTRE/CENT=1`, `RIGHT/RIGT=2`, `UNKNOWN=-1` |
| `OBJECT_MATERIAL_SIZE` | `SIZE_32x32=10`, `SIZE_64x32=20`, `SIZE_64x64=30`, `SIZE_128x32=40`, `SIZE_128x64=50`, `SIZE_128x128=60`, `SIZE_256x32=70`, `SIZE_256x64=80`, `SIZE_256x128=90`, `SIZE_256x256=100`, `SIZE_512x64=110`, `SIZE_512x128=120`, `SIZE_512x256=130`, `SIZE_512x512=140`, `UNKNOWN=-1` |
| `TEXT_DRAW_ALIGN` | `LEFT=1`, `CENTER/CENTRE=2`, `RIGHT=3`, `UNKNOWN=-1` |
| `TEXT_DRAW_FONT` | `FONT_0=0`, `FONT_1=1`, `FONT_2=2`, `FONT_3=3`, `SPRITE_DRAW=4`, `MODEL_PREVIEW=5`, plus `BANK`, `STANDARD`, `SPACEAGE`, `HEADING`, `BECKETT_REGULAR`, `AHARONI_BOLD`, `BANK_GOTHIC`, `PRICEDOWN`, `SPRITE`, and `PREVIEW` aliases |
| `PLAYER_RECORDING_TYPE` | `NONE=0`, `DRIVER=1`, `ONFOOT=2`, `UNKNOWN=-1` |
| `FORCE_SYNC` | `SYNC_NONE=0`, `SYNC_ALL=1`, `SYNC_OTHER=2`; aliases `NO_SYNC`, `SYNC`, `SYNC_OTHERS`, `NONE`, `ALL`, `OTHER`; `UNKNOWN=-1` |
| `CLICK_SOURCE` | `SCOREBOARD=0`, `UNKNOWN=-1` |
| `BULLET_HIT_TYPE` | `NONE=0`, `PLAYER=1`, `VEHICLE=2`, `OBJECT=3`, `PLAYER_OBJECT=4`, `UNKNOWN=-1` |

## Network and download enums

| Enum | Values |
| --- | --- |
| `CONNECTION_STATUS` | `UNKNOWN=-1`, `NO_ACTION=0`, `DISCONNECT_ASAP=1`, `DISCONNECT_ASAP_SILENTLY=2`, `DISCONNECT_ON_NO_ACK=3`, `REQUESTED_CONNECTION=4`, `HANDLING_CONNECTION_REQUEST=5`, `UNVERIFIED_SENDER=6`, `SET_ENCRYPTION_ON_MULTIPLE_16_BYTE_PACKET=7`, `CONNECTED=8`; `CONNSTAT_*` compatibility aliases are also available |
| `DOWNLOAD_REQUEST` | `UNKNOWN=-1`, `EMPTY=0`, `MODEL_FILE=1`, `TEXTURE_FILE=2` |

## Vehicle and NPC enums

| Enum | Values |
| --- | --- |
| `CARMODTYPE` | `SPOILER=0`, `HOOD=1`, `ROOF=2`, `SIDESKIRT/SIDE_SKIRT=3`, `LAMPS=4`, `NITRO=5`, `EXHAUST=6`, `WHEELS=7`, `STEREO=8`, `HYDRAULICS=9`, `FRONT_BUMPER=10`, `REAR_BUMPER=11`, `VENT_RIGHT=12`, `VENT_LEFT=13`, `FRONT_BULLBAR=14`, `REAR_BULLBAR=15`, `UNKNOWN/NONE=-1` |
| `VEHICLE_MODEL_INFO` | `SIZE=1`, `FRONT_SEAT/FRONTSEAT=2`, `REAR_SEAT/REARSEAT=3`, `PETROL_CAP/PETROLCAP=4`, `WHEELS_FRONT/WHEELSFRONT=5`, `WHEELS_REAR/WHEELSREAR=6`, `WHEELS_MID/WHEELSMID=7`, `FRONT_BUMPER_Z/FRONT_BUMPER=8`, `REAR_BUMPER_Z/REAR_BUMPER=9`, `UNKNOWN=-1` |
| `VEHICLE_PANEL_STATUS` | `NONE=0`, `UNKNOWN=-1` |
| `VEHICLE_DOOR_STATUS` | Flags: bonnet/hood `OPEN=1`, `DAMAGED=2`, `MISSING=4`; boot/trunk `OPEN=0x100`, `DAMAGED=0x200`, `MISSING=0x400`; front-left/driver `OPEN=0x10000`, `DAMAGED=0x20000`, `MISSING=0x40000`; front-right/passenger `OPEN=0x01000000`, `DAMAGED=0x02000000`, `MISSING=0x04000000`; `NONE=0`, `UNKNOWN=-1` |
| `VEHICLE_LIGHT_STATUS` | `FRONT_LEFT_BROKEN/DRIVER_BROKEN/CARLIGHT_FRONT_LEFT_BROKEN=1`, `FRONT_RIGHT_BROKEN/PASSENGER_BROKEN/CARLIGHT_FRONT_RIGHT_BROKEN=4`, `REAR_BROKEN/CARLIGHT_REAR_BROKEN=64`, `NONE/UNKNOWN=0` |
| `VEHICLE_TIRE_STATUS` | Flags `FRONT_LEFT_POPPED=8`, `FRONT_RIGHT_POPPED=2`, `REAR_LEFT_POPPED=4`, `REAR_RIGHT_POPPED=1`, with `TIRE_`, `TYRE_`, `CARTIRE_`, and `CARTYRE_` compatibility aliases; `NONE=0`, `UNKNOWN=-1`; `VEHICLE_TYRE_STATUS` is an exported spelling alias |
| `LANDING_GEAR_STATE` | `DOWN=0`, `UP=1` |
| `NPC_MOVE_TYPE` | `NONE=0`, `WALK=1`, `JOG=2`, `SPRINT=3`, `DRIVE=4`, `AUTO=5`, `UNKNOWN=-1` |
| `NPC_ENTITY_CHECK` | Flags `PLAYER=1`, `NPC=2`, `ACTOR=4`, `VEHICLE=8`, `OBJECT=16`, `POBJECT_ORIG=32`, `POBJECT_TARG=64`, `MAP=128`, `ALL=255`, `NONE=0` |

## Mask aliases

| Alias | Used for |
| --- | --- |
| `KeyMask` | `Player.getKeys()`, `NPC.setKeys()`, and `playerKeyStateChange` key values |
| `VehicleDoorStatusMask` | Vehicle door damage/open flags |
| `VehicleLightStatusMask` | Vehicle light damage flags |
| `VehicleTireStatusMask` | Vehicle tyre/tire damage flags |
| `NpcEntityCheckMask` | NPC shooting and aiming line-of-sight checks |

## Constants

Constants are also runtime exports. They describe server limits, invalid IDs, pool capacities, and commonly used defaults.

| Group | Exports |
| --- | --- |
| Pool sizes | `PLAYER_POOL_SIZE`, `VEHICLE_POOL_SIZE`, `CLASS_POOL_SIZE`, `OBJECT_POOL_SIZE`, `OBJECT_POOL_SIZE_037`, `TEXT_LABEL_POOL_SIZE`, `PICKUP_POOL_SIZE`, `GLOBAL_TEXTDRAW_POOL_SIZE`, `PLAYER_TEXTDRAW_POOL_SIZE`, `ACTOR_POOL_SIZE`, `MENU_POOL_SIZE`, `GANG_ZONE_POOL_SIZE`, `NPC_POOL_SIZE` (static fallback values; use `omp.limits.textDraw` for runtime textdraw capacities) |
| Entity limits | `MAX_SEATS`, `MAX_WEAPON_SLOTS`, `MAX_VEHICLE_MODELS`, `MAX_WEAPON_ID`, `NUM_SKILL_LEVELS`, `MAX_ANIMATIONS`, `MAX_ATTACHED_OBJECT_SLOTS`, `MAX_OBJECT_MATERIAL_SLOTS`, `MAX_VEHICLE_COMPONENTS`, `MAX_VEHICLE_COMPONENT_SLOT`, `MAX_VEHICLE_COMPONENT_SLOT_IN_RPC`, `MAX_TEXT_LABELS`, `MAX_GLOBAL_TEXTDRAWS`, `MAX_PLAYER_TEXTDRAWS`, `MAX_MENU_ITEMS`, `MAX_DIALOG`, `MAX_STREAMED_PLAYERS`, `MAX_STREAMED_ACTORS`, `MAX_STREAMED_VEHICLES`, `MAX_VEHICLE_CARRIAGES`, `MAX_GAMETEXT_STYLES` |
| Text/name limits | `MIN_PLAYER_NAME`, `MAX_PLAYER_NAME`, `MAX_MENU_TEXT_LENGTH`, `MAX_TEXTDRAW_STR_LENGTH` |
| Invalid values | `INVALID_WEAPON_SLOT`, `INVALID_VEHICLE_ID`, `INVALID_OBJECT_ID`, `INVALID_PLAYER_ID`, `INVALID_ACTOR_ID`, `INVALID_TEXT_LABEL_ID`, `INVALID_COMPONENT_ID`, `INVALID_TEXTDRAW`, `INVALID_MENU_ID`, `INVALID_DIALOG_ID`, `INVALID_GANG_ZONE_ID`, `INVALID_PICKUP_ID`, `INVALID_OBJECT_MODEL_ID`, `INVALID_MENU_ITEM_ID`, `INVALID_PATH_ID`, `INVALID_NODE_ID`, `INVALID_RECORD_ID` |
| Model ranges | `MIN_CUSTOM_SKIN_ID`, `MAX_CUSTOM_SKIN_ID`, `MIN_CUSTOM_OBJECT_ID`, `MAX_CUSTOM_OBJECT_ID` |
| World/default values | `STREAM_DISTANCE`, `TEAM_NONE`, `SEAT_NONE`, `MAX_WORLD_BOUNDS`, `MIN_WORLD_BOUNDS`, `NPC_MOVE_SPEED_AUTO`, `NPC_MOVE_SPEED_WALK`, `NPC_MOVE_SPEED_JOG`, `NPC_MOVE_SPEED_SPRINT` |
| Skill/default values | `MAX_SKILL_LEVEL` |
