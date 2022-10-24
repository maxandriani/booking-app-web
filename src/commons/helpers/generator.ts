export function* generator() {
  let x = 0;
  while (x < Number.MAX_SAFE_INTEGER) {
    yield x++;
  }
}
