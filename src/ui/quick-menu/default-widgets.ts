function getImageDrawConfig(state: sc.QUICK_MENU_STATE): nax.ccuilib.QuickMenuWidgetImageConfig {
    return button => ({
        gfx: new ig.Image('media/gui/menu.png'),
        srcPos: { x: 432 + (state - 1) * 16, y: 352 + (button.active ? 0 : 16) },
        pos: { x: 8, y: 8 },
        size: { x: 16, y: 16 },
    })
}

export function setupQuickMenuDefaultWidgets() {
    nax.ccuilib.QuickRingMenuWidgets.addWidget({
        key: '11_items',
        name: 'items',
        title: 'Items',
        id: sc.QUICK_MENU_STATE.ITEMS,
        keepPressed: true,
        image: getImageDrawConfig(sc.QUICK_MENU_STATE.ITEMS),
        additionalInit: button => {
            sc.QuickRingMenu.instance.items = button
            button.addChildGui(new sc.ItemTimerOverlay(button))
        },
        imageNoCache: true,
        enabled: () => !(sc.pvp.isActive() || sc.model.player.itemBlockTimer > 0 || sc.quickmodel.itemsBlocked),
    })
    nax.ccuilib.QuickRingMenuWidgets.addWidget({
        key: '11_analyze',
        name: 'analyze',
        title: 'Analysis',
        id: sc.QUICK_MENU_STATE.CHECK,
        keepPressed: true,
        image: getImageDrawConfig(sc.QUICK_MENU_STATE.CHECK),
        additionalInit: button => {
            sc.QuickRingMenu.instance.check = button
        },
        imageNoCache: true,
    })
    nax.ccuilib.QuickRingMenuWidgets.addWidget({
        key: '11_party',
        name: 'party',
        title: 'Party',
        id: sc.QUICK_MENU_STATE.PARTY,
        keepPressed: true,
        image: getImageDrawConfig(sc.QUICK_MENU_STATE.PARTY),
        additionalInit: button => {
            sc.QuickRingMenu.instance.party = button
        },
        imageNoCache: true,
        enabled: () => !((!sc.model.isSaveAllowed() || sc.model.isTeleportBlocked()) && !sc.autoControl.isActive()),
    })
    nax.ccuilib.QuickRingMenuWidgets.addWidget({
        key: '11_map',
        name: 'map',
        title: 'Map',
        id: sc.QUICK_MENU_STATE.MAP,
        keepPressed: true,
        image: getImageDrawConfig(sc.QUICK_MENU_STATE.MAP),
        additionalInit: button => {
            sc.QuickRingMenu.instance.map = button
        },
        imageNoCache: true,
        enabled: () => !((!sc.model.isSaveAllowed() || sc.model.isTeleportBlocked()) && !sc.autoControl.isActive()),
    })
}
