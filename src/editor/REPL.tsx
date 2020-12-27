import Editor, { EditorOnInputEvent } from "./Editor";
import Preview from "./Preview";
import { css } from "emotion";

export interface IREPLProps {
    defaultCode: string
    deps?: object
    height?: number
    width?: number
    orientation?: "vertical" | "horizontal"
}

export default function _(props: IREPLProps) {

    const { defaultCode, deps, width = 450, height = 300, orientation = "horizontal" } = props

    let code = defaultCode;

    function handleInput(e: EditorOnInputEvent) {
        code = e.detail.code;
    }

    const editorWrapperStyle = orientation === "horizontal" ? css`margin-left: 5px` : css`margin-top: 5px`;
    const previewWrapperStyle = css`flex:1; padding:10px; box-shadow: 0 2px 8px #f0f1f2; border: 1px solid #eaeefb; ${orientation === "vertical" ? `display: flex` : ""}`;
    const containerStyle = css`display:flex; width: 90%; flex-direction: ${orientation === "vertical" ? "column" : "row"}`;

    <div class={containerStyle}>
        <div class={previewWrapperStyle}>
            <Preview code={code} deps={deps} />
        </div>
        <div class={editorWrapperStyle}>
            <Editor
                language="tsx"
                defaultCode={defaultCode}
                width={orientation === "horizontal" ? width : "auto"}
                height={height}
                onInput={handleInput}>
            </Editor>
        </div>
    </div>
}