function UI(
    state: IRadioGroupState,
    { radios }: IRadioGroupProps,
    onChangeHandler: InputOnChangeHandler
) {
    <each from={radios}>
        {(radio: IRadio, key = radio.value) => (
            <Radio
                value={radio.value}
                checked={radio.value === state.selected}
                onChange={onChangeHandler}
            >
                {radio.label}
            </Radio>
        )}
    </each>;
}

export interface IRadio {
    value: string;
    label: string;
}

export interface IRadioGroupProps {
    radios: Array<IRadio>;
    defaultSelected?: string;
    /**
     * triggers when the selected radio changes
     */
    onChange?: RadioGroupOnChangeHandler;
}

export default function _(props: IRadioGroupProps) {
    const { radios, defaultSelected } = props;

    //@ts-ignore
    <State />;

    //@ts-ignore
    <Event />;

    //@ts-ignore
    <UI />;
}

//
interface IRadioGroupState {
    selected: string;
}

function State({ defaultSelected }: IRadioGroupProps) {
    const state: IRadioGroupState = { selected: defaultSelected };
}

//
export type RadioGroupEvent = { detail: { selected: string } };
export type RadioGroupOnChangeHandler = (event: RadioGroupEvent) => void;

function Event(state: IRadioGroupState) {
    const dispatch = createEventDispatcher();
    const onChangeHandler: InputOnChangeHandler = event => {
        state.selected = event.target.value;
        dispatch("change", { selected: state.selected });
    };
}

import { default as Radio } from "./Radio";
import { InputOnChangeHandler } from "../../common/type";
import { createEventDispatcher } from "svelte";
