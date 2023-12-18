## RC 1 - 0.10.0-rc.1

**Features**

-   Update icons and model for following items
    -   Tin Ingot
    -   Quantum Processor
    -   Stabilized Quantum Crystal
    -   Stabilization Frame
    -   Unstable Quantum Crystals (use old stablized quantum crystals model als placeholder)
-   Update icons for following items
    -   Quantum Cable Adapter (Placeholder)
    -   Quantum Cable (Placeholder)

**Bugfixes**

-   potenzial fix for a crash if you close the game or load a other savegame

## Alpha 8 - 0.10.0-alpha8

**Bugfixes**

-   Fix: missing ceiling belt support
-   Fix: missing half foundation materials
-   Fix Energymodule Mk.2 for the Modular Miner

**Known Issues**

-   Portable Miner also remove one from the stack if you look not on the ground and also if it was not places. (thats the tradeoff for the fix where all items was removed from the stack if you place one)

---

## Alpha 7 - 0.10.0-alpha7

**Bugfixes**

-   Faxit: potential fix for crash if a inventory slot can't be found
-   Faxit: fix initialisation of the network inventory

**Known Issues**

-   Portable Miner also remove one from the stack if you look not on the ground and also if it was not places. (thats the tradeoff for the fix where all items was removed from the stack if you place one)

---

## Alpha 6 - 0.10.0-alpha6

**Bugfixes**

-   Fix some small display issues in the ingame wiki
-   Potential fix for pipeline crash
-   Fix more duplicated schematics
-   Fix missing texture for some items
-   Fix duplicated needs for pipeline pump mk2

**Known Issues**

-   Portable Miner also remove one from the stack if you look not on the ground and was not places. (thats the tradeoff for the fix above)

---

## Alpha 5 - 0.10.0-alpha5

**Dependencies**

-   Update Refined Power to latest
-   Update Ficsit Farming to latest

**Bugfixes**

-   Potential fix for infinite quantum crystal deposits
-   Smart- and programmablesplitter selection based now on wiki unlocks
-   Fix some log warnings (that was not really important and can be ignored)
-   Fix missing mesh for Pipeline Mk.2 and crash because of that
-   Fix Portable Miner stack disappears when you place one
-   Fix many missing items and recipes in the wiki

**Known Issues**

-   Portable Miner also remove one from the stack if you look not on the ground and was not places. (thats the tradeoff for the fix above)

---

## Alpha 4 - 0.10.0-alpha4

**Features**

-   Prepare future content for <@597386533691064342> to test

**Bugfixes**

-   Fix item dropdown in smart and programmable splitters
-   Fix begining items in the inventory if you not skip the intro
-   Fix some missing Building icons
-   Fix some missing milestone / shop items
-   Remove some vanilla items from the shop
-   Ingame wiki should now work correctly and should be up to date
-   Fix some keybind display issues
-   Fix user interface issues
-   Fix infinity item slot in flexible blast furnace

**changes**

-   Improve loading time
-   rework system to load schematics and recipes (should be faster now)
-   rework the system to spawn loot chests

**Known Issues**

-   Portable Miner stack disappears when you place one (is maybe not fixable anymore)

---

## Alpha 3 - 0.10.0-alpha3

**Features**

-   Added Satisfactory plus items if you skip the intro (not tested yet but should work!)

**Bugfixes**

-   Fix a bug where some vanilla research trees was displayed
-   Faxit cables are now visible
-   Fix particle effects
-   Fix hints in the intro

**changes**

-   overhaul content remover

**Known Issues**

-   Ingame Wiki do not really work
-   Some custom user interface can have some visuell issues
-   Keybind widgets display "? or N/A" if they can't find a keybind or it can't used
-   Portable Miner stack disappears when you place one (is maybe not fixable anymore)

---

## Alpha 2 - 0.10.0-alpha2

**Bugfixes**

-   Fix a bug where some vanilla milestones was displayed
-   Fis missing unlock for Blueprints

**Known Issues**

-   Ingame Wiki do not really work
-   Some custom user interface can have some visuell issues
-   Faxit cables are currently invisible
-   paticle effects are not working correctly
-   Keybind widgets display "? or N/A" if they can't find a keybind or it can't used

---

## Alpha 1 - 0.10.0-alpha1

**Features**

-   Added Wind Turbine Mk1, Mk2, Mk3
    -   MK1: is limited to 25 in total
    -   MK2: is limited to 25 in total
    -   MK3: is limited to 25 in total
-   Added Power Tower
-   Added Priority Switch

**Changes**

-   remove nearly all mods from the prevent list
    -   note: mods that add resource nodes will not spawn and will be not scannable
    -   note: mods that add miners or water extractors and miners will not work correctly and can't placed
-   Solar Panel MK.1 is limited to 100 in total
-   Solar Panel MK.2 is limited to 50 in total
-   removed the power changes on Solar Panels
-   increase the range to attach a mining head to a miner
-   Modular Buildings prevent building modules on top of them if the building effect is active
    -   this should prevent some issues with the building effect (like modules was not correctly registered)

**Bugfixes**

-   Fixed recipe from Drive Mk8
-   Fixed a bug where the production indicator was not correctly updated
-   Hatchery should now save there state

**Known Issues**

-   Ingame Wiki do not really work
-   Some custom user interface can have some visuell issues
-   Faxit cables are currently invisible
-   paticle effects are not working correctly
-   Keybind widgets display "? or N/A" if they can't find a keybind or it can't used
