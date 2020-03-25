let sagaId = 1;

export async function sleep<T>(second: number, result: T) {
    return new Promise<T>(resolve => setTimeout(() => resolve(result), second * 1000));
}

export function getUniqueId() {
    return (sagaId++).toString().padStart(3, "0");
}
