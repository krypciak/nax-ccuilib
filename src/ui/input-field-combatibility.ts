import type {} from 'ccmodmanager/types/gui/input-field/input-field'

declare global {
    namespace nax.ccuilib {
        var InputField: typeof modmanager.gui.InputField
        var INPUT_FIELD_TYPE: typeof modmanager.gui.INPUT_FIELD_TYPE
    }
}
export function inputFieldBackwardsCompatibility() {
    nax.ccuilib.InputField = modmanager.gui.InputField
    nax.ccuilib.INPUT_FIELD_TYPE = modmanager.gui.INPUT_FIELD_TYPE

    /* left for inventory search mod compatibility */
    ig.module('nax-ccuilib.ui.input-field').defines(() => {})
}
