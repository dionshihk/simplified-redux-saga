import {getUniqueId} from "./util";
import {SagaEffect, SagaMagicCode} from "./effect/type";

export type Saga = () => IterableIterator<any>;

function runSagaIterator(result: IterableIterator<any>, onFinalReturn?: (value: any) => void) {
    const currentSagaId = getUniqueId();
    const sagaLog = (text: string) => console.info(`[saga #${currentSagaId}]: ${text}`);

    const handleIterableResult = (t: IteratorResult<any>) => {
        if (!t.done) {
            const yieldedExpression = t.value;
            if (yieldedExpression instanceof Promise) {
                sagaLog("yield Promise");
                yieldedExpression.then(resolvedResult => handleIterableResult(result.next(resolvedResult)));
            } else if (yieldedExpression && typeof yieldedExpression.next === "function") {
                sagaLog("yield Saga");
                runSagaIterator(yieldedExpression, finalReturnValue => handleIterableResult(result.next(finalReturnValue)));
            } else if (typeof yieldedExpression === "object" && yieldedExpression.sagaMagic === SagaMagicCode) {
                sagaLog("yield SagaEffect");
                const effect = yieldedExpression as SagaEffect<any>;
                effect.execute(effectResult => handleIterableResult(result.next(effectResult)));
            } else {
                sagaLog("yield normal value");
                handleIterableResult(result.next(yieldedExpression));
            }
        } else {
            sagaLog("end");
            onFinalReturn?.(t.value);
        }
    };

    sagaLog("start");
    handleIterableResult(result.next());
}

export function runSaga(saga: Saga) {
    runSagaIterator(saga());
}
