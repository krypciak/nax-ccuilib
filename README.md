<!-- markdownlint-disable MD013 MD024 MD001 MD045 -->

# CCUILib

Aims to provide cross compatibility with multiple mods wanting to use the same UI space.

## Quick menu extension

https://github.com/krypciak/nax-ccuilib/assets/115574014/45e3745f-399a-41a3-93b9-751260c63129

The action button is right click or press X on gamepad.  
To enter edit mode, press the action button.  
To switch rings on gamepad, use L1 and R1.

### Mods that add more widgets

- [cc-jetpack-widget](https://github.com/krypciak/cc-jetpack-widget) adds a jetpack widget  
- [cc-character-widgets](https://github.com/krypciak/cc-character-widgets) adds character swapping widgets
- [char-select](https://github.com/CCDirectLink/char-select) adds a character swapping menu widget
- [cc-vim](https://github.com/krypciak/cc-vim) add some useful widgets for mod developers
- [cc-speedrun-utilities](https://github.com/CCDirectLink/cc-speedrun-utilities) add speedrun related widgets
- [cc-blitzkrieg](https://github.com/krypciak/cc-blitzkrieg) adds a puzzle skipping widget
- [CrossedEyes](https://github.com/CCDirectLink/CrossedEyes) adds accessibility related widgets

### For developers

#### Building

```bash
git clone https://github.com/krypciak/nax-ccuilib
cd nax-ccuilib
pnpm run build
```

#### Adding your own widget

```ts
import type {} from 'nax-ccuilib/src/ui/quick-menu/quick-menu-extension'

/* check if the mod is installed */
if (window.nax?.ccuilib?.QuickRingMenuWidgets) {
    nax.ccuilib.QuickRingMenuWidgets.addWidget({
        name: 'freesp',
        title: 'Give SP',
        description: 'Gives the player SP',
        pressEvent: () => {
            ig.game.playerEntity.params.currentSp += 4
        },
        image: () => ({
            gfx: new ig.Image('media/gui/menu.png'),
            srcPos: { x: 593, y: 18 },
            pos: { x: 11, y: 10 },
            size: { x: 12, y: 12 },
        }),
    })
}
```

As an example of a toggleable widget, see [cc-jetpack-widget](https://github.com/krypciak/cc-jetpack-widget/blob/main/src/plugin.ts)

### Pause screen API

![Screenshot of the pause screen with added button and text](https://github.com/user-attachments/assets/ae839baf-ac1d-4a0e-ac79-5ae9f6614047)

#### Adding your own pause screen button

```ts
import type {} from 'nax-ccuilib/src/ui/title-screen/title-screen-api'

nax.ccuilib.pauseScreen.addButton({
    text: 'give a hug',
    onPress() {
        console.log('error: hug not found')
    },
    showCondition() {
        /* optional, shown by default */
        return Math.random() > 0.5 /* 50% chance that the button is visible when opening the pause menu */
    },
    enabledCondition() {
        /* optional, enabled by default */
        return Math.random() > 0.5 /* 50% chance that the button is enabled when opening the pause menu */
    },
    onShow(button) {
        /* optional */
        button.setText('give hug x2') /* you can set what it says on the time of opening the pause menu */
    },
})
```

#### Adding your own pause screen text

```ts
import type {} from 'nax-ccuilib/src/ui/title-screen/title-screen-api'

nax.ccuilib.pauseScreen.addText({
    text: 'my mod v1.0.0',
    showCondition() {
        /* optional, shown by default */
        return Math.random() > 0.5 /* 50% chance that the text is visible when opening the pause menu */
    },
    onShow(text) {
        /* optional */
        text.setText('actually just checked: my mod v1.0.1') /* you can set what it says on the time of opening the pause menu */
    },
})
```

