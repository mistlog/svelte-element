function UI(state: IRadioState, { value, checked }: IRadioProps) {
    <label class={state.style}>
        <span class={state.inputWrapperStyle}>
            <span class={state.inputSymbolStyle} />
            <input type="radio" checked={checked} class={state.inputStyle} value={value} onChange />
        </span>
        <span class={state.inputLabelStyle}>
            <slot />
        </span>
    </label>
}

export interface IRadioProps {
    /**
     * checked state of radio
     * @default false
     */
    checked?: boolean
    /**
     * whether Radio is disabled
     * @default false
     */
    disabled?: boolean
    /**
     * the value of radio
     */
    value?: string
    onChange?: InputOnChangeHandler
}

export default function _(props: IRadioProps) {
    const { checked = false, disabled = false, value = "" } = props;

    //@ts-ignore
    <State />;

    //@ts-ignore
    <UI />;
}

interface IRadioState {
    inputStyle: string
    inputSymbolStyle: string
    inputWrapperStyle: string
    inputLabelStyle: string
    style: string;
}

function State({ checked, disabled }: IRadioProps) {

    let state = {} as IRadioState;

    state.inputSymbolStyle = "el-radio__inner";
    state.inputStyle = "el-radio__original";
    state.inputLabelStyle = "el-radio__label";
    state.style = "el-radio";

    {
        "use watch";
        state.inputWrapperStyle = Σ(
            "el-radio__input",
            {
                "is-checked": checked,
                "is-disabled": disabled
            }
        );
    }
}

import { Σ } from "../../common/clsx/index";
import { InputOnChangeHandler } from "../../common/type";