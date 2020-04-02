import {SagaEffect, SagaMagicCode} from "./type";
import {getReduxStore} from "../redux/middleware";

export function createSelectEffect<State, T>(selector: (state: State) => T): SagaEffect<"select"> {
    const effect: SagaEffect<"select"> = {
        sagaMagic: SagaMagicCode,
        type: "select",
        execute: onFinish => onFinish(selector(getReduxStore().getState())),
    };

    return effect;
}
