function UI(state: IMenuItemState, { key }: IMenuItemProps, $selected: string) {
    const updateSelected = () => ($selected = key);

    <li class={state.style} onClick={updateSelected}>
        <slot />
    </li>;
}

export interface IMenuItemProps {
    /**
     * unique identification
     */
    key: string;
}

export default function _(props: IMenuItemProps) {
    const { key } = props;

    //@ts-ignore
    <Store />;

    //@ts-ignore
    <State />;

    //@ts-ignore
    <UI />;
}

//
function Store() {
    const selected = getContext<IMenuContext>("selected");
}

//
interface IMenuItemState {
    style: string;
}

function State({ key }: IMenuItemProps, $selected: string) {
    const state = {} as IMenuItemState;

    {
        ("use watch");
        state.style = Σ("el-menu-item", {
            "is-active": $selected === key
        });
    }
}

import { Σ } from "../../common/clsx/index";
import { getContext } from "../../common/svelte/index";
import { IMenuContext } from "./Menu";
