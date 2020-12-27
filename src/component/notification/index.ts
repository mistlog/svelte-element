import Notification, { INotificationWillUnmountEvent, NotificationType } from "./Notification";

export interface INotificationConfig {
    title: string;
    message: string;
    duration?: number;
    type?: NotificationType;
}

export function notification(config: INotificationConfig) {
    const { title = "", message = "", duration = 3000, type } = config || {};

    //
    const div = document.createElement("div");
    document.body.appendChild(div);

    const className = ".el-notification";

    // credit: element react
    const instances = document.querySelectorAll(className);
    const lastInstance = instances[instances.length - 1] as HTMLElement;
    const top = lastInstance ? lastInstance.getBoundingClientRect().bottom + 16 : 16;

    let component = Reflect.construct(Notification, [
        {
            target: div,
            props: { top, title, message, type },
            intro: true
        }
    ]);

    //
    const removeNotification = () => {
        if (component) {
            component.$destroy();
            component = null;
        }
    };

    component.$on("close", () => {
        removeNotification();
    });

    component.$on("willUnmount", (e: INotificationWillUnmountEvent) => {
        // credit: element react
        const { height, top } = e.detail;
        const instances = document.querySelectorAll(className);
        for (let i = 0; i < instances.length; ++i) {
            const element = instances[i] as HTMLElement;
            const rect = element.getBoundingClientRect();
            if (rect.top > top) {
                element.style.setProperty("top", (rect.top - height - 16).toString() + "px");
            }
        }
        document.body.removeChild(div);
    });

    setTimeout(() => {
        removeNotification();
    }, duration);
}
