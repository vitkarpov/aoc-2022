import fs from 'fs'

function read() {
  return fs.readFileSync('day12.txt', 'utf-8').split('\n').map((line) => line.split(''));
}

function part1() {
  const m = read();
  const H = m.length;
  const W = m[0].length;
  const sX = 0;
  const sY = 20;
  const eX = 158;
  const eY = 20;
  m[sY][sX] = 'a';
  m[eY][eX] = 'z';
  const d = (y1, x1, y2, x2) => m[y2][x2].charCodeAt(0) - m[y1][x1].charCodeAt(0);
  const q = [{ x: sX, y: sY, len: 0 }];
  const visited = new Set();

  while (q.length > 0) {
    const { x, y, len } = q.shift();
    if (k(x, y) === k(eX, eY)) {
      return len;
    }
    if (visited.has(k(x, y))) {
      continue;
    }
    visited.add(k(x, y));
    if (y - 1 >= 0 && d(y, x, y - 1, x) <= 1) {
      q.push({ x, y: y - 1, len: len + 1 });
    }
    if (y + 1 < H && d(y, x, y + 1, x) <= 1) {
      q.push({ x, y: y + 1, len: len + 1 });
    }
    if (x - 1 >= 0 && d(y, x, y, x - 1) <= 1) {
      q.push({ x: x - 1, y, len: len + 1 });
    }
    if (x + 1 < W && d(y, x, y, x + 1) <= 1) {
      q.push({ x: x + 1, y, len: len + 1 });
    }
  }
  throw new Error('No end point?');
}

function k(x, y) {
  return `${x},${y}`;
}

console.log(part1())