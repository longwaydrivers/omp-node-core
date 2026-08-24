# Getting started

## What this package is

`@omp-node/core` is the public JavaScript side of the native `omp-node` component. The native component starts a Node environment for each configured resource, injects the bridge used by this package, and loads the resource entry module.

The usual dependency direction is:

```text
open.mp server
  └─ native omp-node component
       └─ resource/omp-node.json
            └─ resource entry module
                 └─ @omp-node/core
```

The core repository is therefore installed in the resource's `node_modules`; it does not replace or get copied into the native component directory.

## Resource layout

```text
resources/
└─ example-resource/
   ├─ omp-node.json
   ├─ package.json
   ├─ src/index.ts
   └─ dist/index.js
```

`omp-node.json` contains the resource name and the entry path relative to the resource directory:

```json
{
  "name": "example-resource",
  "entry": "dist/index.js"
}
```

Add `resources/example-resource` to the server's `node.resources` configuration. The exact server configuration file format depends on the open.mp server setup, but the value is always the resource directory, not the entry file.

## Entry module

```ts
import { omp, Player, Weapon } from "@omp-node/core";

omp.on("playerConnect", (player: Player) => {
  player.sendClientMessage(0xffffffff, "Welcome to the server!");
});

omp.on("playerCommandText", (player, command) => {
  if (command === "/where") {
    const position = player.getPos();
    if (position.ret) {
      player.sendClientMessage(
        0xffffffff,
        `Position: ${position.x}, ${position.y}, ${position.z}`
      );
    }
    return true;
  }
});

omp.on("playerDeath", (player, killer, reason) => {
  const weaponName = Weapon[reason] ?? `weapon ${reason}`;
  omp.log(`${player.getName().name} died by ${weaponName}`);
  void killer;
});
```

The event overloads infer callback parameter types from the event name. `addListener` is an alias for registering a listener, while `removeListener` removes the same callback reference and `removeAllListeners` clears one event's listeners.

## Entity access

Entity pools are maintained by the package as native pool events arrive:

```ts
const player = omp.players.at(42);
const vehicle = omp.vehicles.at(10);

if (player?.isSpawned() && vehicle) {
  player.putInVehicle(vehicle, 0);
}

for (const onlinePlayer of omp.players.all()) {
  onlinePlayer.sendClientMessage(0xffcccccc, "Server message");
}
```

Use `at(id)` for an open.mp entity ID, `all()` for a snapshot, and `forEach()` when iterating without creating an array. `at()` can return `undefined`; an entity may have been destroyed between two server events.

The per-player pools are nested:

```ts
const textdrawsForPlayer = omp.playerTextDraws.at(playerId);
const textdraw = textdrawsForPlayer?.at(textdrawId);
```

## Constructors and validity

Entity wrappers have two constructor forms:

- `new Entity(createArguments...)` creates a native entity.
- `new Entity(id)` wraps an existing native entity by ID; this form is used internally when pools are initialized.

Prefer the corresponding pool when you only need to access an existing entity. Creation constructors throw when the native creation call fails. Most instance methods throw when the wrapper is invalid or has already been destroyed; native operations that can fail otherwise return `false`.

Destroying a wrapper invalidates it. Do not keep using it or retain it in application-owned collections after `destroy()` succeeds.

## Return values

The API uses three common return shapes:

- `boolean` means the native operation succeeded or failed.
- `number` or an enum means the native value itself was returned.
- `{ ret: boolean, ... }` contains a success flag and one or more output fields.

For output objects, check `ret` before consuming fields when the native operation can fail. ID accessors return `number | null`, while native pointer accessors return `NativePointer | null` (`NativePointer` is `number | bigint`) because a wrapper can be invalidated and 64-bit hosts may use `bigint` pointers.

## TypeScript

The package publishes `dist/bundle.d.ts`. Enums are runtime values as well as types:

```ts
import { DialogStyle, Key, KeyMask, Player } from "@omp-node/core";

function showLogin(player: Player) {
  player.showGameText("~w~Login", 3000, 1);
  // A key state can contain more than one flag.
  const acceptedKeys: KeyMask = Key.ACTION | Key.FIRE;
  void acceptedKeys;
}

void DialogStyle.INPUT;
```

Use the `*Mask` aliases for values that may contain combined flags. See [Types and enums](types.md) for the full list and compatibility aliases.
