export interface PauseScreenButtonConfig {
    text: string
    callback: () => void
    onCreate?: (button: sc.ButtonGui) => void
}

declare global {
    namespace nax.ccuilib.pauseScreen {
        var buttonConfigs: PauseScreenButtonConfig[]

        function addButton(buttonConfig: PauseScreenButtonConfig): void
    }
}

export function pauseScreenApiPreload() {
    nax.ccuilib.pauseScreen = {
        buttonConfigs: [],
        addButton({ text, callback, onCreate }) {},
    }
}
