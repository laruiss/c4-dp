export declare function enhance(form: HTMLFormElement, { pending, error, result }?: {
    pending?: ({ data, form }: {
        data: FormData;
        form: HTMLFormElement;
    }) => void;
    error?: ({ data, form, response, error }: {
        data: FormData;
        form: HTMLFormElement;
        response: Response | null;
        error: Error | null;
    }) => void;
    result?: ({ data, form, response }: {
        data: FormData;
        response: Response;
        form: HTMLFormElement;
    }) => void;
}): {
    destroy(): void;
};
