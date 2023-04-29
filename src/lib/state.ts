import type { Locales } from "$i18n/i18n-types";
import { locales } from "$i18n/i18n-util";
import { writable } from "svelte/store";

enum Stages {
    WELCOME,
    LANG,
    NAME,
    INFO,
    CHAT,
    THOUGHT,
    OUTRO
}

type AppState = {
    name: string,
    currentStage: Stages,
    locale: Locales
}

export const storageKey = "state";

const initialState = {
    name: "",
    currentStage: Stages.WELCOME,
    locale: "en" as Locales
}

const storedState = JSON.parse(sessionStorage.getItem(storageKey) ?? JSON.stringify(initialState));
const state = writable<AppState>(storedState);
state.subscribe(value => {
    sessionStorage.setItem(storageKey, JSON.stringify(value));
})
function reset() {
    state.set(initialState)
    sessionStorage.removeItem(storageKey)
}
//@ts-ignore
window.reset = reset;

export {
    state,
    Stages,
    reset
}