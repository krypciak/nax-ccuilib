export { };

declare global {
	namespace nax {
		namespace ccuilib {
			interface InputField extends ig.FocusGui {
				gfx: ig.Image;
				value: string[];
				bg: sc.ButtonBgGui;
				focusTimer: number;
				alphaTimer: number;
				animateOnPress: boolean;
				noFocusOnPressed: boolean;
				submitSound: ig.Sound;
				blockedSound: ig.Sound;
				type: nax.ccuilib.InputFieldType;
				boundProcessInput: (this: Window, ev: KeyboardEvent) => any;
				validChars: RegExp;
				onCharacterInput: (value: string, key: string) => any;
				dummyForClipping: sc.DummyContainer;
				highlight: sc.ButtonHighlightGui;
				textChild: sc.TextGui;
				calculateCursorPos(this: this): number;
				getValueAsString(this: this): string;
				processInput(this: this, event: KeyboardEvent): void;
				unsetFocus(this: this): void;
				updateCursorPos(this: this, delta: number): void;
				cursorTick: number;
				cursorPos: number;
				cursor: InputFieldCursor;
				obscure: boolean;
				obscureChar: string;
				setObscure(this: this, obscure: boolean): void;
			}

			interface InputFieldCon extends ImpactClass<InputField> {
				new(width: number, height: number, type?: nax.ccuilib.InputFieldType, obscure?: boolean, obscureChar?: string): InputField;
			}

			let InputField: InputFieldCon;
		}
	}
}