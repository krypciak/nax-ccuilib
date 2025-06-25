declare global {
    namespace sc {
        interface PauseScreenGui {
            extraTexts: nax.ccuilib.pauseScreen.PauseScreenText[]
        }
    }
    namespace nax.ccuilib.pauseScreen {
        interface PauseScreenText extends sc.TextGui {
            config: PauseScreenTextConfig
        }
    }
}
export interface PauseScreenTextConfig {
    text: string
    onShow?: (text: nax.ccuilib.pauseScreen.PauseScreenText) => void
    showCondition?: () => boolean
}

export function injectTitleScreenText() {
    sc.PauseScreenGui.inject({
        init() {
            this.parent()
            this.extraTexts = []
            for (const config of nax.ccuilib.pauseScreen.textConfigs) {
                const text = new sc.TextGui(config.text, {
                    font: sc.fontsystem.tinyFont,
                }) as nax.ccuilib.pauseScreen.PauseScreenText
                text.setAlign(this.versionGui.hook.align.x, this.versionGui.hook.align.y)
                this.addChildGui(text)
                text.hook.transitions['HIDDEN'] = { state: { alpha: 0 }, time: 0, timeFunction: KEY_SPLINES.LINEAR }

                text.config = config
                this.extraTexts.push(text)
            }
        },
        doStateTransition(name, skipTransition, removeAfter, callback, initDelay) {
            this.parent(name, skipTransition, removeAfter, callback, initDelay)
            if (name != 'DEFAULT') return
            const textHeight = this.versionGui.hook.size.y
            const initialY = textHeight + this.versionGui.hook.children.reduce((acc, gui) => acc + gui.size.y, 0)
            let i = 0
            for (const text of this.extraTexts) {
                if (text.config.showCondition === undefined || text.config.showCondition()) {
                    text.doStateTransition('DEFAULT')
                    const y = initialY + i * textHeight
                    i++

                    text.setPos(0, y)
                    text.config.onShow?.(text)
                } else {
                    text.doStateTransition('HIDDEN', true)
                }
            }
        },
    })
}
