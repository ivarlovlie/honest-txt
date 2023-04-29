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
}

export const storageKey = "state";

const initialState = {
    name: "",
    currentStage: Stages.WELCOME
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