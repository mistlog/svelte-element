import { css } from "emotion";
import { onMount } from "svelte";

export default function _() {
    let style: string;
    //@ts-ignore
    <PrepareStyle />

    let titleElement: HTMLSpanElement = null;
    let title: string = "";

    onMount(() => {
        title = titleElement.textContent.replace(new RegExp(" ", "g"), "-");
    });

    <div class={style}>
        <span bindRef={titleElement}><slot></slot></span>
        <a href={`#${title}`} id={title}>#</a>
    </div>
}

function PrepareStyle(style: string) {
    style = css`
        &:hover a {
            opacity: 1;
        }
        
        a {
            transition: opacity .3s;
            color: #1890ff; 
            text-decoration: none;
            background-color: transparent;
            outline: none;
            display: inline-block;
            opacity: 0;
            cursor: pointer;
            font-size: 0.8em;
        }

        a:hover { 
            text-decoration: none;
            outline: 0;
            color: #40a9ff; 
        }
    `;
}