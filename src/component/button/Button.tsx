function UI(state: IButtonState, { loading, icon }: IButtonProps) {
    <button class={state.style} onClick>
        <if condition={loading}>
            <i class={state.loadingStyle} />
        </if>
        <if condition={Boolean(icon)}>
            <i class={state.iconStyle} />
        </if>
        <if condition={state.slotExists}>
            <span>
                <slot />
            </span>
        </if>
    </button>;
}

export interface IButtonProps {
    /**
     * button type
     * @default "default"
     */
    type?: ButtonType;
    /**
     * button size
     * @default ""
     */
    size?: ButtonSize;
    /**
     * disable the button
     * @default false
     */
    disabled?: boolean;
    /**
     * determine whether it's loading
     * @default false
     */
    loading?: boolean;
    /**
     * determine whether it's a plain button,
     * @default false
     */
    plain?: boolean;
    /**
     * @default ""
     */
    icon?: IconName;
    onClick?: ButtonOnClickHandler;
}

export type ButtonType = "primary" | "text" | "default" | "success" | "warning" | "danger" | "info";
export type ButtonSize = "small" | "mini";

/**
 * by convention, the default export would be the component
 * thus the name of it doesn't matter here
 */
export default function _(props: IButtonProps) {
    const {
        type = "default",
        disabled = false,
        plain = false,
        icon = "",
        loading = false,
        size = ""
    } = props;

    //@ts-ignore
    <State />;

    //@ts-ignore
    <UI />;
}

interface IButtonState {
    slotExists: boolean;
    iconStyle: string;
    loadingStyle: string;
    style: string;
}

function State(
    $$props: SvelteInternalProps,
    { icon, type, disabled, plain, loading, size }: IButtonProps
) {
    const state = {} as IButtonState;

    state.slotExists = Boolean($$props.$$slots);
    state.loadingStyle = `el-icon-loading`;

    {
        ("use watch");
        state.iconStyle = `el-icon-${icon}`;
        state.style = Σ("el-button", `el-button--${type}`, {
            "is-disabled": disabled,
            "is-plain": plain,
            "is-loading": loading,
            [`el-button--${size}`]: Boolean(size)
        });
    }
}

import { Σ } from "../../common/clsx/index";
import { IconName, ButtonOnClickHandler } from "../../common/type";
import { SvelteInternalProps } from "../../common/svelte";
