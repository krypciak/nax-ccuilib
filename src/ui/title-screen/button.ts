
declare global {
    namespace sc {
        interface PauseScreenGui {
            extraButtons: nax.ccuilib.pauseScreen.PauseScreenButton[]
        }
    }
    namespace nax.ccuilib.pauseScreen {
        interface PauseScreenButton extends sc.ButtonGui {
            config: PauseScreenButtonConfig
        }
    }
}
export interface PauseScreenButtonConfig {
    text: string
    onPress: () => void
    onShow?: (button: nax.ccuilib.pauseScreen.PauseScreenButton) => void
    enabledCondition?: () => boolean
    showCondition?: () => boolean
}

export function injectTitleScreenButton() {
    sc.PauseScreenGui.inject({
        init() {
            this.parent()
            this.extraButtons = []
            for (const config of nax.ccuilib.pauseScreen.buttonConfigs) {
                const button = new sc.ButtonGui(
                    config.text,
                    sc.BUTTON_DEFAULT_WIDTH - 18
                ) as nax.ccuilib.pauseScreen.PauseScreenButton
                button.setAlign(ig.GUI_ALIGN.X_RIGHT, ig.GUI_ALIGN.Y_BOTTOM)
                button.onButtonPress = () => config.onPress()
                this.addChildGui(button)

                button.config = config
                this.extraButtons.push(button)
            }
        },
        updateButtons(refocus) {
            this.parent(refocus)
            const buttonHeight = this.arenaLobby.hook.size.y
            const padding = 4
            const x = 3 + this.arenaLobby.hook.size.x + 4
            let i = 0
            for (const button of this.extraButtons) {
                this.removeChildGui(button)
                if (button.config.showCondition !== undefined && !button.config.showCondition()) continue
                this.addChildGui(button)
                this.buttonGroup.addFocusGui(button, 1, i)
                const y = 3 + i * (buttonHeight + padding)
                i++
                button.setPos(x, y)
                button.setActive(button.config.enabledCondition === undefined || button.config.enabledCondition())
                button.config.onShow?.(button)
            }
        },
    })
}
