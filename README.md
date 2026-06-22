# Final Fantasy V, but all enemies have auto-haste

This is a simple web-based tool that allows you to patch your Final Fantasy V ROM file to give all enemies permanent auto-haste. The tool is designed to be easy to use and does not require any technical knowledge.

## How to Use

1. Navigate to the [web-based tool](https://cloudstrife9999.github.io/ffv_all_enemies_have_auto_haste/) in your web browser.
2. Select your Final Fantasy V ROM file (.smc) by clicking the "Select ROM" button.
3. Click the "Patch ROM" button to apply the auto-haste patch to your ROM.
4. Download the patched ROM file and use it to play the game with all enemies having auto-haste.

At the moment the tool only supports the following versions of the Final Fantasy V ROM:

* The original Japanese SNES version.
* The RPGe translation (version 1.1) of the SNES version.

Support for other versions of the SNES ROM and the GBA version may be added in the future.

Also, an override flag is in the making, which will allow you to patch the ROM even if it is not one of the supported versions. However, this feature is not yet available.

## Mechanics

The patch modifies the game mechanics so that:

* All enemies start every battle with an automatic haste status effect.
* The persistence flag is set for all enemies, meaning all auto-statuses (i.e.,the statuses an enemy automatically starts with) are permanent and cannot be removed by any means.

In particular, as the persistence flag controls all auto-statuses, enemies that normally have other non-persistent auto-statuses will also have those statuses permanently applied. This is a side effect of how the persistence flag works, and is not a bug.

For instance, enemies that accompany Alchymia can never have their auto-toad cleansed.

Enemies that have other persistent auto-statuses, will retain them, and will also gain auto-haste.

For instance, Gil Turtle will keep its persistent auto-protect and auto-shell, and will also gain a persistent auto-haste.

Atomos already has auto-haste, so this patch does not change its behavior.
