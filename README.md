# Final Fantasy V, but all enemies have Auto-Haste

This is a simple web-based tool that allows you to patch your Final Fantasy V ROM file so that all enemies have permanent Auto-Haste. The tool is designed to be easy to use and does not require any technical knowledge.

## Features

- Browser-based ROM patching
- No installation required
- ROMs never leave your computer
- Supports:
  - Original Japanese SNES version
  - RPGe translation v1.1
- Gives all enemies permanent Auto-Haste
- Preserves compatibility with supported ROM versions through ROM hash verification

## How to Use

1. Navigate to the [web-based tool](https://cloudstrife9999.github.io/ffv-all-enemies-have-autohaste/) in your web browser.
2. Select your Final Fantasy V ROM file (`.smc`) by clicking the **Select ROM** button.
3. Click the **Patch ROM** button to apply the patch.
4. Download the patched ROM file and use it to play the game with all enemies having Auto-Haste.

## Supported ROM Versions

The tool natively supports the following versions of Final Fantasy V:

- The original Japanese SNES version
- The RPGe translation (version 1.1) of the SNES version

Custom ROMs based on one of these versions may also work. If your ROM has been modified and no longer matches a supported hash, you may enable **Override the ROM hash check** to attempt patching anyway.

Please note that compatibility with custom ROMs is not guaranteed. If the ROM has been modified extensively, the patch may not work correctly.

The ROM will not be patched if the uploaded file is too small to contain all enemy entries, as this indicates that it is not a valid Final Fantasy V ROM.

Support for the Game Boy Advance version may be added in the future.

## Mechanics

The patch modifies every enemy data entry by:

- Setting the Auto-Haste status bit
- Enabling the auto-status persistence flag

No other enemy data is modified.

As a result:

- All enemies begin battle with Auto-Haste.
- Auto-statuses become permanent and cannot be removed by any means.

Because the persistence flag affects all auto-statuses, enemies that normally begin battle with other non-persistent auto-statuses will also keep those statuses permanently. This is a consequence of how the game's mechanics work and is not a bug.

Examples:

- Enemies accompanying Alchymia can never have their Auto-Toad status removed.
- Gil Turtle retains its permanent Auto-Protect and Auto-Shell while also gaining permanent Auto-Haste.
- Atomos already has Auto-Haste, so this patch does not change its behavior.

## Frequently Asked Questions

**Q: Can I use this patch with a custom ROM?**  
**A:** Possibly. Custom ROMs based on a supported version may work. If the ROM hash does not match a supported version, you can enable **Override the ROM hash check** and attempt to patch it. Compatibility is not guaranteed.

**Q: Can I use this patch with the GBA version of Final Fantasy V?**  
**A:** Not currently. Support may be added in a future release.

**Q: Can I use this patch with the Pixel Remaster version of Final Fantasy V?**  
**A:** No. The Pixel Remaster version is not currently supported.

**Q: Is the ROM file I select uploaded to a remote server?**  
**A:** No. The ROM file is processed entirely within your web browser. The patched ROM is also generated locally. No ROM data is uploaded, stored, or transmitted. Aside from downloading the web page itself, the tool does not send any data to a server.

**Q: Is the tool open source?**  
**A:** Yes. The source code is available on [GitHub](https://github.com/cloudstrife9999/ffv-all-enemies-have-autohaste).

**Q: Is the tool free to use?**  
**A:** Yes. The tool is completely free to use, with no fees, subscriptions, or usage limits.

## Legal Notice

This tool does not distribute ROM files.

You must provide your own copy of Final Fantasy V. The legality of ROM modification and use varies by jurisdiction. It is your responsibility to ensure that your use of the tool complies with applicable laws.

The author is not responsible for any legal issues arising from the use of this tool or from the ROM files used with it.

## Disclaimer

Although the tool is designed to be safe and reliable, it is recommended that you make a backup of your ROM before patching it.

The tool is provided "as is", without warranty of any kind. Use it at your own risk.
