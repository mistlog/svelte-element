import { Σ } from "../../common/clsx/index";
import { css } from "emotion";

export default function _(props) {
    const { className = "" } = props;

    const style = Σ(
        css`
            position: relative;
        `,
        className
    );
    const spinnerStyle = Σ(
        "el-loading-spinner",
        { "is-full-screen": false },
        css`
            position: absolute;
            display: inline-block;
            left: 0;
        `
    );
    const wrapperStyle = css`
        display: block;
        position: absolute;
        z-index: 657;
        background-color: rgba(255, 255, 255, 0.901961);
        margin: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    `;

    <div class={style}>
        <div class={wrapperStyle}>
            <div class={spinnerStyle}>
                <svg class="circular" viewBox="25 25 50 50">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" />
                </svg>
            </div>
        </div>
    </div>;
}
