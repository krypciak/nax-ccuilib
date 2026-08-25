import type { PluginClass } from 'ultimate-crosscode-typedefs/modloader/mod'
import type { Mod1 } from './types'
import { registerOpts } from './options'
import { inputFieldBackwardsCompatibility } from './ui/input-field-combatibility'
import { injectQuickMenuExtension } from './ui/quick-menu/quick-menu-extension'
import { pauseScreenApiPreload, pauseScreenApiPrestart } from './ui/pause-screen/pause-screen-api'
import { setupQuickMenuPreload } from './ui/quick-menu/quick-menu-preload'
import { setModMetadata } from './mod-metadata'

export default class CCUILib implements PluginClass {
    constructor(mod: Mod1) {
        setModMetadata(mod)

        // @ts-expect-error
        window.nax ??= {}
        // @ts-expect-error
        window.nax.ccuilib ??= {}

        setupQuickMenuPreload()
        pauseScreenApiPreload()
    }

    prestart() {
        registerOpts()
        inputFieldBackwardsCompatibility()
        injectQuickMenuExtension()
        pauseScreenApiPrestart()
    }
}
