function UI(style: string) {
    <div class={style}>
        <slot />
    </div>;
}

export interface IColProps {
    /**
     * number of column the grid spans
     * @default: 24
     */
    span?: number;
    /**
     * number of spacing on the left side of the grid
     * @default: 0
     */
    offset?: number;
    className?: string;
}

export default function _(props: IColProps) {
    const { span = 24, offset = 0, className = "" } = props;

    //@ts-ignore
    <Context />;

    //@ts-ignore
    <Style />;

    //@ts-ignore
    <UI />;
}

function Context() {
    const gutter = getContext<IRowContext>("gutter");
}

function Style($gutter: number | undefined, { span, offset, className }: IColProps) {
    let style = "";

    {
        ("use watch");

        const gutterStyle = Boolean($gutter)
            ? css`
                  padding: 0px ${$gutter / 2}px;
              `
            : "";

        style = Σ(
            "el-col",
            `el-col-${span}`,
            gutterStyle,
            {
                [`el-col-offset-${offset}`]: offset !== 0
            },
            className
        );
    }
}

import { Σ } from "../../common/clsx/index";
import { getContext } from "../../common/svelte/index";
import { css } from "emotion";
import { IRowContext } from "./Row";
