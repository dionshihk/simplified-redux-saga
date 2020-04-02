import {SagaEffect, SagaMagicCode} from "./type";
import {registerTaker} from "../redux/taker";

export function createTakeEffect(actionPattern: string): SagaEffect<"take"> {
    const effect: SagaEffect<"take"> = {
        sagaMagic: SagaMagicCode,
        type: "take",
        execute: callback => registerTaker({actionPattern, callback}),
    };

    return effect;
}
