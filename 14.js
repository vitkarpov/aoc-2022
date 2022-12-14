import fs from 'fs'

function read() {
  return fs.readFileSync('day14.txt', 'utf-8').split('\n').map((line) => line.split(' -> ').map((v) => {
    const [x, y] = v.split(',').map(Number)
    return {x,y};
  }))
}

function part1() {
  const paths = read();
  const m = new Set();
  let maxY = 0;
  for (const path of paths) {
    for (let i = 0; i < path.length - 1; i++) {
      const l = path[i];
      const r = path[i + 1];
      maxY = Math.max(maxY, l.y, r.y);
      if (l.x === r.x) {
        for (let j = Math.min(l.y, r.y); j <= Math.max(l.y, r.y); j++) {
          m.add(k({x: l.x, y: j}));
        }
      } else if (l.y === r.y) {
        for (let j = Math.min(l.x, r.x); j <= Math.max(l.x, r.x); j++) {
          m.add(k({x: j, y: l.y}));
        }
      }
    }
  }
  function drop(x, y) {
    while (y < maxY) {
      let hasMoved = false;
      for (let [dx, dy] of [[0, 1], [-1, 1], [1, 1]]) {
        if (!m.has(k({ x: x + dx, y: y + dy }))) {
          x += dx;
          y += dy;
          hasMoved = true;
          break;
        }
      }
      if (!hasMoved) {
        return {x, y};
      }
    }
    return null;
  }
  let count = 0;

  const s = {x: 500, y: 0};
  while (true) {
    const next = drop(s.x, s.y);
    if (!next) {
      return count;
    }
    count++;
    m.add(k(next));
  }
}

function k(p) {
  return `${p.x},${p.y}`;
}

console.log(part1())