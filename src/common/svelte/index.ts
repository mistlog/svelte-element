import { setContext as rawSetContext, getContext as rawGetContext } from "svelte";

export function setContext<T>(key: keyof T, value: T[keyof T]) {
    return rawSetContext(key, value);
}

export function getContext<T>(key: keyof T): T[keyof T] {
    return rawGetContext(key);
}

export type SvelteInternalProps = { $$slots?: any };
