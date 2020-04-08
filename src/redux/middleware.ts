import {Middleware, MiddlewareAPI, Store} from "redux";
import {onActionComing} from "./taker";

let globalStore: MiddlewareAPI | null;

export const createSagaMiddleware: Middleware = store => next => action => {
    globalStore = store;
    onActionComing(action);
    return next(action);
};

export function getReduxStore(): MiddlewareAPI {
    if (!globalStore) {
        throw new Error("Saga not registered to Redux yet");
    }
    return globalStore;
}
