function UI(style: string) {
    <div class={style}>
        <slot />
    </div>;
}

export interface IRowProps {
    /**
     * @default 0
     * grid spacing
     */
    gutter?: number;
    className?: string;
}

export default function _(props: IRowProps) {
    const { gutter = 0, className = "" } = props;

    //@ts-ignore
    <Context />;

    //@ts-ignore
    <Style />;

    //@ts-ignore
    <UI />;
}

export interface IRowContext {
    gutter: Writable<number>;
}

/**
 * ref: https://stackoverflow.com/questions/56991322/how-to-update-context-in-svelte
 */
function Context(gutter: number) {
    const gutterStore = writable(gutter);
    setContext<IRowContext>("gutter", gutterStore);

    let $gutterStore: AutoSubscribe<typeof gutterStore>;
    {
        ("use watch");
        $gutterStore = gutter;
    }
}

function Style({ className }: IRowProps) {
    const style = Σ("el-row", {
        [className]: Boolean(className)
    });
}

import { Σ } from "../../common/clsx/index";
import { setContext } from "../../common/svelte/index";
import { writable, Writable } from "svelte/store";
import { AutoSubscribe } from "../../common/type";
