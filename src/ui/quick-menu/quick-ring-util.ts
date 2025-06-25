import { Opts } from '../../options'

export function getRingMaxSize(ring: number) {
    return (ring + 1) * 8
}

export function angleVec(angle: number): Vec2 {
    angle = (angle + 180) % 360
    return {
        x: Math.sin((angle * Math.PI) / 180),
        y: Math.cos((angle * Math.PI) / 180),
    }
}

export function getIdFromRingPos(ring: number, index: number): number {
    return ring * 1000 + index
}

export function getRingPosFromId(id: number) {
    return { ring: Math.floor(id / 1000), index: id % 1000 }
}

export function getWidgetFromId(id: number) {
    return nax.ccuilib.QuickRingMenuWidgets.widgets[nax.ccuilib.quickRingUtil.ringConf[id]]
}

export const ringCountToInit = 3
export const selGridW = 4
export const possibleIds: number[] = []

export function getAllIdsFromRing(ring: number) {
    const keys = Object.keys(nax.ccuilib.quickRingUtil.ringConf)
    const mapped = keys.map(Number)
    const filtered = mapped.filter(id => getRingPosFromId(id).ring == ring)
    return filtered
}
export function saveRingConfig(possibleSelGridIds: number[]) {
    const save = { ...nax.ccuilib.quickRingUtil.ringConf }
    for (const id of Object.keys(save).map(Number)) {
        const name = save[id]
        if (name.startsWith('dummy')) delete save[id]
    }
    for (const id of possibleSelGridIds) delete save[id]

    Opts.ringConfiguration = save
}
