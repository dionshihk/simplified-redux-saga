function* f() {
  console.log("start");
  yield 10;

  console.log("after 10");
  const next = yield 20;

  console.log("after 20 next", next);
  return 30;
}

const generator = f();
console.log(generator.next());
console.log(generator.next());
console.log(generator.next("abc"));
