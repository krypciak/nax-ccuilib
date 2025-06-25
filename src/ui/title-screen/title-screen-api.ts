import { injectTitleScreenText, PauseScreenTextConfig } from './text'
import { injectTitleScreenButton, PauseScreenButtonConfig } from './button'

declare global {
    namespace nax.ccuilib.pauseScreen {
        var buttonConfigs: PauseScreenButtonConfig[]
        var textConfigs: PauseScreenTextConfig[]

        function addButton(buttonConfig: PauseScreenButtonConfig): void
        function addText(textConfig: PauseScreenTextConfig): void
    }
}

export function pauseScreenApiPreload() {
    nax.ccuilib.pauseScreen = {
        buttonConfigs: [],
        textConfigs: [],
        addButton,
        addText,
    }
}

function addButton(config: PauseScreenButtonConfig) {
    nax.ccuilib.pauseScreen.buttonConfigs.push(config)
}

function addText(config: PauseScreenTextConfig) {
    nax.ccuilib.pauseScreen.textConfigs.push(config)
}

export function pauseScreenApiPrestart() {
    injectTitleScreenButton()
    injectTitleScreenText()
}
