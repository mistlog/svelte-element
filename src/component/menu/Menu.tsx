function UI(state: IMenuState) {
    // use style: override border-bottom
    <ul class={state.style} style={`border-bottom: none`}>
        <slot />
    </ul>;
}

export interface IMenuProps {
    defaultSelected?: string;
    /**
     * @default "vertical"
     */
    mode?: "horizontal" | "vertical";
    className?: string;
}

export default function _(props: IMenuProps) {
    const { defaultSelected = "", mode = "vertical", className = "" } = props;

    //@ts-ignore
    <Context />;

    //@ts-ignore
    <State />;

    //@ts-ignore
    <UI />;
}

interface IMenuState {
    style: string;
}

function State({ className, mode }: IMenuProps) {
    const state = {} as IMenuState;

    state.style = Σ("el-menu", `el-menu--${mode}`, className);
}

export interface IMenuContext {
    selected: Writable<string>;
}

function Context(defaultSelected: string) {
    let selectedStore = writable(defaultSelected);
    setContext<IMenuContext>("selected", selectedStore);

    let $selectedStore: AutoSubscribe<typeof selectedStore>;
    {
        ("use watch");
        $selectedStore = defaultSelected;
    }
}

import { Σ } from "../../common/clsx/index";
import { Writable, writable } from "svelte/store";
import { setContext } from "../../common/svelte/index";
import { AutoSubscribe } from "../../common/type";
