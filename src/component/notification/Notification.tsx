function UI(
    thisNotification: HTMLDivElement,
    state: INotificationState,
    { title, message }: INotificationProps,
    onClose: any
) {
    <div
        bindRef={thisNotification}
        class={state.style}
        transition={transition(fly, { duration: 500 })}
    >
        <i class={state.iconStyle}></i>
        <div class={state.wrapperStyle}>
            <h2 class="el-notification__title">{title}</h2>
            <div class="el-notification__content">{message}</div>
            <div class="el-notification__closeBtn el-icon-close" onClick={onClose}></div>
        </div>
    </div>;
}

export interface INotificationProps {
    top: number;
    title: string;
    message: string;
    type?: NotificationType;
}

export default function _(props: INotificationProps) {
    const { top = 16, title = "", message = "", type } = props;

    let thisNotification: HTMLDivElement = null;

    const dispatch = createEventDispatcher();
    const onClose = () => dispatch("close");

    onDestroy(() => {
        const rect = thisNotification.getBoundingClientRect();
        dispatch("willUnmount", {
            height: rect.height,
            top: rect.top
        } as INotificationWillUnmountEvent["detail"]);
    });

    //@ts-ignore
    <State />;

    //@ts-ignore
    <UI />;
}

//
interface INotificationState {
    style: string;
    iconStyle: string;
    wrapperStyle: string;
}

function State({ top, type }: INotificationProps) {
    const state = {} as INotificationState;

    state.style = Σ(
        "el-notification",
        css`
            top: ${top}px;
            right: 16px;
            z-index: 9999;
        `
    );
    state.iconStyle = Σ("el-notification__icon", { [`el-icon-${type}`]: Boolean(type) });
    state.wrapperStyle = Σ("el-notification__group", { "is-with-icon": Boolean(type) });
}

//
export interface INotificationWillUnmountEvent {
    detail: {
        height: number;
        top: number;
    };
}

export type NotificationType = "error" | "info" | "success" | "warning";

import { Σ } from "../../common/clsx/index";
import { css } from "emotion";
import { ConfigTransition as transition } from "svelte-types";
import { fly } from "svelte/transition";
import { createEventDispatcher, onDestroy } from "svelte";
