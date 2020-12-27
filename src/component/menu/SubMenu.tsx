function UI(state: ISubMenuState, { title }: ISubMenuProps) {

    const onOpen = e => state.isOpened = !state.isOpened;

    <li class={state.style}>
        <div class={state.titleStyle} onClick={onOpen}>
            {title}
            <i class={state.arrowStyle}></i>
        </div>
        <if condition={state.isOpened}>
            <div localTransition={transition(slide)}>
                <ul class={state.menuStyle}>
                    <slot></slot>
                </ul>
            </div>
        </if>
    </li>
}

export interface ISubMenuProps {
    /**
     * group title
     * @default ""
     */
    title: string

    /**
     * @default true
     */
    isOpened?: boolean
}

export default function _(props: ISubMenuProps) {
    const { title = "", isOpened = true } = props;

    //@ts-ignore
    <State />;

    //@ts-ignore
    <UI />;
}

//
interface ISubMenuState {
    style: string
    menuStyle: string
    titleStyle: string
    arrowStyle: string
    isOpened: boolean
}

function State({ isOpened }: ISubMenuProps) {
    const state = {} as ISubMenuState;
    state.isOpened = isOpened;
    state.menuStyle = "el-menu el-menu--inline";
    state.titleStyle = "el-submenu__title";
    state.arrowStyle = "el-submenu__icon-arrow el-icon-arrow-down";

    {
        "use watch";
        state.style = Σ(
            "el-submenu", {
            "is-opened": state.isOpened
        });

    }
}

import { Σ } from "../../common/clsx/index";
import { ConfigTransition as transition } from "svelte-types";
import { slide } from "svelte/transition";