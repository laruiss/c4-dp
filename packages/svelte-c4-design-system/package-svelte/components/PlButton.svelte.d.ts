/** @typedef {typeof __propDef.props}  PlButtonProps */
/** @typedef {typeof __propDef.events}  PlButtonEvents */
/** @typedef {typeof __propDef.slots}  PlButtonSlots */
export default class PlButton extends SvelteComponentTyped<{
    loading?: boolean | undefined;
    tone?: "main" | "promotion" | "loyalty" | "monochrome" | "negative" | undefined;
    variation?: "primary" | "secondary" | "tertiary" | "tertiary-small" | undefined;
    target?: "" | "_self" | "_blank" | undefined;
    type?: "submit" | "reset" | "button" | undefined;
    reversed?: boolean | undefined;
    fullWidth?: boolean | undefined;
    disabled?: boolean | undefined;
    loadingAriaLabel?: string | undefined;
    href?: string | null | undefined;
    ariaLabel?: string | null | undefined;
}, {
    click: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    prepend: {};
    default: {};
    append: {};
}> {
}
export type PlButtonProps = typeof __propDef.props;
export type PlButtonEvents = typeof __propDef.events;
export type PlButtonSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        loading?: boolean | undefined;
        tone?: "main" | "promotion" | "loyalty" | "monochrome" | "negative" | undefined;
        variation?: "primary" | "secondary" | "tertiary" | "tertiary-small" | undefined;
        target?: "" | "_self" | "_blank" | undefined;
        type?: "submit" | "reset" | "button" | undefined;
        reversed?: boolean | undefined;
        fullWidth?: boolean | undefined;
        disabled?: boolean | undefined;
        loadingAriaLabel?: string | undefined;
        href?: string | null | undefined;
        ariaLabel?: string | null | undefined;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        prepend: {};
        default: {};
        append: {};
    };
};
export {};
