import { Readable, Writable } from "svelte/store";

export type InputOnChangeHandler = (event: Svelte.ChangeEvent<HTMLInputElement>) => void;
export type ButtonOnClickHandler = (event: Svelte.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

type TypeWithGeneric<T> = Readable<T> | Writable<T>;
export type AutoSubscribe<Type> = Type extends TypeWithGeneric<infer X> ? X : never;

export type IconName = "edit" | "share" | "delete" | "search" | "arrow-left";