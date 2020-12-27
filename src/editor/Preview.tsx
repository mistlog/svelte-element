import { onMount, onDestroy } from "svelte";
import { compileComponent } from "./compiler";
import { debounce } from "./debounce";
import Loading from "../component/loading/Loading";
import { css } from "emotion";
import { notification } from "../component/notification/index";

export interface IPreview {
    code: string;
    deps?: object;
}

export default function _(props: IPreview) {
    const { code, deps = {} } = props;

    //
    let component = null;
    let container: HTMLDivElement = null;
    let mounted = false;
    let isReady = false;

    //
    const refreshComponent = debounce((code: string, deps = {}) => {
        createComponent();
    }, 250);

    const notify = debounce(config => notification(config), 1000);

    {
        ("use watch");

        if (mounted) {
            refreshComponent(code, deps);
        }
    }

    //
    onMount(() => {
        mounted = true;
        window.onerror = message => {
            notify({
                title: "Runtime Error",
                message: message.toString(),
                type: "error",
                duration: 5000
            });
            return true;
        };
    });

    onDestroy(() => {
        destroyComponent();
    });

    //
    function destroyComponent() {
        if (component) {
            component.$destroy();
            component = null;
        }
    }

    function createComponent() {
        // used as error boundary, try to append component as child to it
        // if no error, append this boundary to container
        let boundary: HTMLDivElement;
        let newComponent: any;

        try {
            const Component = compileComponent(code, deps);
            if (Component) {
                boundary = document.createElement("div");
                newComponent = new Component({ target: boundary });
            }
        } catch (error) {
            const message = `create component failed, error: ${error.message}`;
            notify({
                title: "Compile Error",
                message,
                type: "error",
                duration: 5000
            });
            return;
        }

        // no error throwed, then:
        destroyComponent();
        component = newComponent;
        isReady = true;
        container.appendChild(boundary.firstChild);
    }

    <div bindRef={container} style="width:100%; height:100%">
        <if condition={!isReady}>
            <Loading
                className={css`
                    min-height: 300px;
                `}
            />
        </if>
    </div>;
}
