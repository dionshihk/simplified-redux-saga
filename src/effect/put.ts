import {SagaEffect, SagaMagicCode} from "./type";
import {getReduxStore} from "../redux/middleware";
import {Action} from "redux";

export function createPutEffect(action: Action): SagaEffect<"put"> {
    const effect: SagaEffect<"put"> = {
        sagaMagic: SagaMagicCode,
        type: "put",
        execute: onFinish => onFinish(getReduxStore().dispatch(action)),
    };

    return effect;
}
