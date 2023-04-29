
export function profilePictureFallback(name: string) {
    return name.substring(0, 2).toLocaleUpperCase();
}

export function capitalise(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}