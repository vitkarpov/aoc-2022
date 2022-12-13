import fs from 'fs';

function read() {
  return fs.readFileSync('day13.txt', 'utf-8').split('\n').reduce((acc, line) => {
    if (!line) {
      acc.push({ l: null, r: null });
    } else if (!acc[acc.length - 1].l) {
      acc[acc.length - 1].l = eval(line);
    } else {
      acc[acc.length - 1].r = eval(line);
    }
    return acc;
  }, [[]])
}

function part1() {
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
  return read().reduce((acc, packets, idx) => {
    if (compare(packets.l, packets.r) > 0) {
      acc += idx + 1;
    }
    return acc;
  }, 0);
}

console.log(part1());