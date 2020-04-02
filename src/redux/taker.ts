import {Action} from "redux";

export interface RegisteredTaker {
    actionPattern: string;
    callback: (action: Action) => void;
}

const registeredTakers: RegisteredTaker[] = [];

export function registerTaker(taker: RegisteredTaker) {
    registeredTakers.push(taker);
}

export function onActionComing(action: Action) {
    registeredTakers.forEach(taker => {
        if (isActionMatched(action.type, taker.actionPattern)) {
            taker.callback(action);
        }
    });
}

function isActionMatched(comingActionName: string, pattern: string): boolean {
    return pattern === "*" || comingActionName === pattern;
}
