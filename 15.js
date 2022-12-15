import fs from 'fs'

function part1() {
  const m = read().sort((a, b) => b.d - a.d);
  const y = 2000000;
  let c = 0;

  for (let x = -10e6; x <= 20e6; x++) {
    for (const v of m) {
      if (d({x, y}, v.s) <= v.d) {
        if (v.b.x === x && v.b.y === y) {
          continue;
        }
        c++;
        break;
      }
    }
  }
  return c;
}

console.log(part1());

function read() {
  return fs.readFileSync('day15.txt', 'utf-8').split('\n').filter(Boolean).map((line) => {
    const g = /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/.exec(line);
    const x1 = +g[1];
    const y1 = +g[2];
    const x2 = +g[3];
    const y2 = +g[4];
    const s = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    return { s, b, d: d(s, b) };  
  })
}

function d(p1, p2) {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}