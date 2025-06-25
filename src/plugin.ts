import { PluginClass } from 'ultimate-crosscode-typedefs/modloader/mod'
import { Mod1 } from 'ccmodmanager/types/types'
import ccmod from '../ccmod.json'
import { registerOpts } from './options'
import { inputFieldBackwardsCompatibility } from './ui/input-field-combatibility'
import { injectQuickMenuExtension } from './ui/quick-menu/quick-menu-extension'
import { pauseScreenApiPreload } from './ui/title-screen-api'
import { setupQuickMenuPreload } from './ui/quick-menu/quick-menu-preload'

export default class CCUILib implements PluginClass {
    static dir: string
    static mod: Mod1
    static manifset: typeof import('../ccmod.json') = ccmod

    constructor(mod: Mod1) {
        CCUILib.dir = mod.baseDirectory
        CCUILib.mod = mod
        CCUILib.mod.isCCL3 = mod.findAllAssets ? true : false
        CCUILib.mod.isCCModPacked = mod.baseDirectory.endsWith('.ccmod/')

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
    }
}
