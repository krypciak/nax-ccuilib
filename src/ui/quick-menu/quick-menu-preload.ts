import { Opts } from '../../options'
import * as quickRingUtil from './quick-ring-util'

export function setupQuickMenuPreload() {
    setupQuickRingUtil()
    setupQuickRingMenuWidgets()
    setupQuickMenuWidgetEvent()
}

type QuickRingUtilType = typeof quickRingUtil
declare global {
    namespace nax.ccuilib {
        var quickRingUtil: QuickRingUtilType & {
            ringConf: Record<number, string>
        }
    }
}
function setupQuickRingUtil() {
    nax.ccuilib.quickRingUtil = Object.assign(quickRingUtil, {
        ringConf: {} as Record<number, string>,
    })

    for (let ring = 0; ring < quickRingUtil.ringCountToInit; ring++) {
        const maxSize = quickRingUtil.getRingMaxSize(ring)
        for (let index = 0; index < maxSize; index++)
            quickRingUtil.possibleIds.push(quickRingUtil.getIdFromRingPos(ring, index))
    }
}

declare global {
    namespace nax.ccuilib {
        interface QuickRingMenuWidgets extends sc.Model {
            widgets: Record<string, nax.ccuilib.QuickMenuWidget>

            addWidget(widget: nax.ccuilib.QuickMenuWidget): void
            isWidgetToggledOn(widgetName: string): boolean
        }
        var QuickRingMenuWidgets: QuickRingMenuWidgets
    }
}

function setupQuickRingMenuWidgets() {
    nax.ccuilib.QuickRingMenuWidgets = {
        observers: [],
        widgets: {},
        addWidget: (widget: nax.ccuilib.QuickMenuWidget) => {
            const key = widget.key ?? widget.name
            if (nax.ccuilib.QuickRingMenuWidgets.widgets[key]) throw new Error(`Widget: "${key}" already assigned.`)
            nax.ccuilib.QuickRingMenuWidgets.widgets[key] = widget
        },

        isWidgetToggledOn(widget: string) {
            return Opts.buttonPressStatus[widget]
        },
    }
}

declare global {
    namespace nax.ccuilib {
        enum QUICK_MENU_WIDGET_EVENT {
            CLICK = 0,
        }
    }
}
function setupQuickMenuWidgetEvent() {
    nax.ccuilib.QUICK_MENU_WIDGET_EVENT = {
        CLICK: 0,
    }
}
