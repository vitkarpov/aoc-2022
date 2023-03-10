import fs from 'fs';

function read() {
  return fs.readFileSync('day13.txt', 'utf-8').split('\n').reduce((acc, line) => {
    if (line) {
      acc.push(JSON.parse(line));
    }
    return acc;
  }, [])
}

function part1() {
  const packets = read();
  let acc = 0;
  for (let i = 0; i < packets.length - 1; i += 2) {
    if (compare(packets[i], packets[i + 1]) > 0) {
      acc += i / 2 + 1;
    }
  }
  return acc;
}

function part2() {
  const packets = read().concat([[[2]], [[6]]]);
  packets.sort(compare).reverse();
  const i = packets.findIndex((v) => k(v) === '[[2]]');
  const j = packets.findIndex((v) => k(v) === '[[6]]');

  return (i + 1) * (j + 1);
}

function compare(l, r) {
  if (Array.isArray(l) && !Array.isArray(r)) {
    return compare(l, [r]);
  }
  if (Array.isArray(r) && !Array.isArray(l)) {
    return compare([l], r);
  }
  if (Array.isArray(l)) {
    for (let i = 0; i < Math.min(l.length, r.length); i++) {
      const v = compare(l[i], r[i]);
      if (v !== 0) return v;
    }
    if (l.length < r.length) return 1;
    if (l.length > r.length) return -1;
    return 0;
  }
  if (l < r) return 1;
  if (l > r) return -1;
  return 0;
}

function k(arr) {
  if (Array.isArray(arr)) {
    return `[${arr.map((v) => k(v)).join(',')}]`;
  }
  return arr;
}

console.log(part2());