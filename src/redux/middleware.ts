import {Store} from "redux";

let globalStore: Store | null;

// TODO: register store

export function getReduxStore(): Store {
    if (!globalStore) {
        throw new Error("Saga not registered to Redux yet");
    }
    return globalStore;
}
