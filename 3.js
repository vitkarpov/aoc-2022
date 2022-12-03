import fs from 'fs'

function part1() {
  return read().reduce((acc, [a, b]) => {
    const s1 = new Set(a.split(''));
    const s2 = new Set(b.split(''));
    const common = new Set([...s1].filter(ch => s2.has(ch)));

    return acc + Array.from(common).reduce((acc, item) => {
      return acc + getPriority(item);
    }, 0);
  }, 0);
}

console.log(part1());

function read() {
  return fs.readFileSync('day3.txt', 'utf-8')
    .split('\n')
    .map((line) => [
      line.slice(0, line.length / 2),
      line.slice(-line.length / 2)
    ]);
}

function getPriority(ch) {
  if ('a' <= ch && ch <= 'z') {
    return ch.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  }
  return ch.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
}