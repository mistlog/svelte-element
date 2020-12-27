function UI(
    state: ICheckboxGroupState,
    { options }: ICheckboxGroupProps,
    onChangeHandler: (checkbox: ICheckbox) => void,
    checkbox: ICheckbox
) {
    <each from={options}>
        {(checkbox: ICheckbox, key = checkbox.label) => (
            <CheckBox
                disabled={Boolean(checkbox.disabled)}
                checked={state.selected.includes(checkbox.label)}
                onChange={event => onChangeHandler(checkbox)}
            >
                {checkbox.label}
            </CheckBox>
        )}
    </each>;
}

export interface ICheckbox {
    label: string;
    disabled?: boolean;
}

export interface ICheckboxGroupProps {
    options?: Array<ICheckbox>;
    defaultSelected?: Array<string>;
    onChange?: CheckboxGroupOnChangeHandler;
}

export default function _(props: ICheckboxGroupProps) {
    const { options, defaultSelected = [] } = props;

    //@ts-ignore
    <State />;

    //@ts-ignore
    <Event />;

    //@ts-ignore
    <UI />;
}

//
interface ICheckboxGroupState {
    selected: Array<string>;
}

function State({ defaultSelected }: ICheckboxGroupProps) {
    const state: ICheckboxGroupState = { selected: defaultSelected };
}

//
export type CheckboxGroupEvent = { detail: { selected: Array<string> } };
export type CheckboxGroupOnChangeHandler = (event: CheckboxGroupEvent) => void;

function Event(state: ICheckboxGroupState) {
    const dispatch = createEventDispatcher();
    const onChangeHandler = (checkbox: ICheckbox) => {
        const { label } = checkbox;
        if (state.selected.includes(label)) {
            state.selected = state.selected.filter(item => item !== label);
        } else {
            state.selected = [label, ...state.selected];
        }
        dispatch("change", { selected: state.selected });
    };
}

import { createEventDispatcher } from "svelte";
import { default as CheckBox } from "./Checkbox";
