import assert from 'assert';
import fs from 'fs'

function part1() {
  return read1().reduce((acc, [a, b]) => {
    const common = intersection(toSet(a), toSet(b));

    return acc + Array.from(common).reduce((acc, item) => {
      return acc + getPriority(item);
    }, 0);
  }, 0);
}

function part2() {
  return read2().reduce((acc, group) => {
    const common = intersection(intersection(toSet(group[0]), toSet(group[1])), toSet(group[2]))
    assert(common.size === 1, 'Expected exactly one common item amoung three rucksacks');
    return acc + getPriority([...common][0]);
  }, 0)
}

console.log(part2());

function read1() {
  return fs.readFileSync('day3.txt', 'utf-8')
    .split('\n')
    .map((line) => [
      line.slice(0, line.length / 2),
      line.slice(-line.length / 2)
    ]);
}

function read2() {
  return fs.readFileSync('day3.txt', 'utf-8')
    .split('\n')
    .reduce((acc, line, idx) => {
      if (idx % 3 === 0) {
        acc.push([line]);
      } else {
        acc[acc.length - 1].push(line);
      }
      return acc;
    }, []);
}

function getPriority(ch) {
  if ('a' <= ch && ch <= 'z') {
    return ch.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  }
  return ch.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
}

function intersection(s1, s2) {
  return new Set([...s1].filter(ch => s2.has(ch)));
}

function toSet(s) {
  return new Set(s.split(''));
}