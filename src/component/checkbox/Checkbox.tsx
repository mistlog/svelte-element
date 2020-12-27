function UI(state: ICheckboxState, { checked }: ICheckboxProps) {
    <label class={state.style}>
        <span class={state.inputWrapperStyle}>
            <span class={state.inputSymbolStyle} />
            <input type="checkbox" checked={checked} class={state.inputStyle} onChange />
        </span>
        <span class={state.inputLabelStyle}>
            <slot />
        </span>
    </label>;
}

export interface ICheckboxProps {
    /**
     * if the Checkbox is checked
     * @default false
     */
    checked?: boolean;
    /**
     * whether the Checkbox is disabled
     * @default false
     */
    disabled?: boolean;
    onChange?: InputOnChangeHandler;
}

export default function _(props: ICheckboxProps) {
    const { checked = false, disabled = false } = props;

    //@ts-ignore
    <State />;

    //@ts-ignore
    <UI />;
}

interface ICheckboxState {
    inputStyle: string;
    inputSymbolStyle: string;
    inputWrapperStyle: string;
    inputLabelStyle: string;
    style: string;
}

function State({ checked, disabled }: ICheckboxProps) {
    const state = {} as ICheckboxState;

    state.inputSymbolStyle = "el-checkbox__inner";
    state.inputStyle = "el-checkbox__original";
    state.inputLabelStyle = "el-checkbox__label";
    state.style = "el-checkbox";

    {
        ("use watch");
        state.inputWrapperStyle = Σ("el-checkbox__input", {
            "is-checked": checked,
            "is-disabled": disabled
        });
    }
}

import { Σ } from "../../common/clsx/index";
import { InputOnChangeHandler } from "../../common/type";
