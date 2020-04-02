import {Action} from "redux";

export const SagaMagicCode = "@@saga@@";

export interface SagaEffectMap {
    take: Action;
    put: Action;
    select: any;
    fork: void;
    call: any;
}

export interface SagaEffect<T extends keyof SagaEffectMap> {
    sagaMagic: typeof SagaMagicCode;
    type: T;
    execute: (onFinish: (effectResult: SagaEffectMap[T]) => void) => void;
}
