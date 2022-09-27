/** @typedef {typeof __propDef.props}  PlLoaderProps */
/** @typedef {typeof __propDef.events}  PlLoaderEvents */
/** @typedef {typeof __propDef.slots}  PlLoaderSlots */
export default class PlLoader extends SvelteComponentTyped<{
    small?: boolean | undefined;
    variant?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PlLoaderProps = typeof __propDef.props;
export type PlLoaderEvents = typeof __propDef.events;
export type PlLoaderSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        small?: boolean | undefined;
        variant?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
