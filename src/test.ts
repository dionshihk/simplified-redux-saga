import {runSaga} from "./saga";
import {sleep} from "./util";

function* f() {
    console.info("start");

    const a = yield sleep(3, "f().sleep");
    console.info("yield 1", a);

    const b = yield "Foo";
    console.info("yield 2", b);

    const c = yield g();
    console.info("yield 3", c);

    const d = yield* g();
    console.info("yield 4", d);

    console.info("end");
}

function* g() {
    const a = yield sleep(1, "g().sleep");
    console.info("yield g", a);
    return 1000;
}

runSaga(f);
