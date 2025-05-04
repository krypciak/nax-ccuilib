import './ui/input-field'
import './ui/quick-menu/quick-menu-extension'

nax.ccuilib.registerSubMenu = function (menuName: string, clazz: Function) {
    const enumString = menuName.toUpperCase()
    // @ts-ignore
    sc.MENU_SUBMENU[enumString] = Math.max(...Object.values(sc.MENU_SUBMENU)) + 1

    // @ts-ignore
    sc.SUB_MENU_INFO[sc.MENU_SUBMENU[enumString]] = {
        Clazz: clazz,
        name: menuName,
    }
}

ig.module('nax-ccuilib.ui.input-field').defines(() => {})
