export enum kindError {
    CLIENT = 0,
    SERVER
}

export const kindErrorString = new Map<kindError, string>([
    [0, "CLIENT"],
    [1, "SERVER"]
]);