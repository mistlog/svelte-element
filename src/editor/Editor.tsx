import { prism } from "./prism";
import { css } from "emotion";
import { createEventDispatcher } from "svelte";
import { SvelteEventHandler } from "svelte-types/type/dom";

export type EditorOnInputEvent = { detail: { code: string } };

export interface IEditorProps {
    language: string;
    defaultCode?: string;
    width?: number | "auto";
    height?: number;
    onInput?: (event: EditorOnInputEvent) => void;
}

export default function _(props: IEditorProps) {
    const { language, defaultCode = "", width = 500, height = 350 } = props;

    //
    let code = defaultCode;
    let formattedCode = "";
    {
        ("use watch");
        formattedCode = prism.highlight(code, prism.languages[language], language);
    }

    //
    const dispatch = createEventDispatcher();
    {
        ("use watch");
        dispatch("input", { code });
    }

    //
    let displayArea: HTMLPreElement;
    const syncScroll: SvelteEventHandler<HTMLTextAreaElement> = (e: any) => {
        displayArea.scrollTop = e.target.scrollTop;
        displayArea.scrollLeft = e.target.scrollLeft;
    };

    //

    const style = {
        container: css`
            /* Hide scrollbar for Chrome, Safari and Opera */
            pre::-webkit-scrollbar {
                display: none;
            }

            textarea::-webkit-scrollbar {
                display: none;
            }

            /* Hide scrollbar for IE, Edge and Firefox */
            textarea,
            pre {
                -ms-overflow-style: none; /* IE and Edge */
                scrollbar-width: none; /* Firefox */
            }

            padding: 10px 10px 0px 10px;
            background: #1e1e1e;
            ${width === "auto" ? "" : `width: ${width}px;`}
            height: ${height}px;
        `,
        editorWrapper: css`
            position: relative;
            width: 100%;
            height: 100%;
        `,
        displayAreaWrapper: css`
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            padding: 0px;
        `,
        displayStyle: css`
            overflow-x: auto;
            overflow-y: auto;
            width: 100%;
            height: 100%;
            z-index: 1000;
            margin: 0px;
            padding: 0px;
        `,
        editorAreaWrapper: css`
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            z-index: 1001;
        `,
        editorAreaStyle: css`
            background: transparent;
            color: #fff;
            -webkit-text-fill-color: transparent;
            padding: 0;
            margin: 0;
            border: none;
            resize: none;
            outline: 0px none transparent;
            overflow-x: auto;
            overflow-y: auto;
            white-space: nowrap;
            width: 100%;
            height: 100%;
            line-height: 1.5;
            font-size: 13px;
            font-family: Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New",
                monospace;
        `
    };

    <div class={style.container}>
        <div class={style.editorWrapper}>
            <div class={style.displayAreaWrapper}>
                <pre bindRef={displayArea} class={style.displayStyle}>
                    <code class={`language-${language}`}>
                        <raw-html>{formattedCode}</raw-html>
                    </code>
                </pre>
            </div>
            <div class={style.editorAreaWrapper}>
                <textarea
                    onScroll={syncScroll}
                    spellcheck={false}
                    bindValue={code}
                    class={style.editorAreaStyle}
                />
            </div>
        </div>
    </div>;
}
