function UI(style: string) {
    <div class={style}>
        <slot />
    </div>
}

export default function _() {
    //@ts-ignore
    <Style />;

    //@ts-ignore
    <UI />;
}

function Style() {
    const style = "el-button-group";
}