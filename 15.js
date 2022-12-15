import assert from 'assert';
import fs from 'fs'

const test = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`

function part1(input, target) {
  const m = read(input);
  const intervals = m
    // filter out those who never intersect target
    .filter(({ s, d }) => Math.abs(s.y - target) < d)
    // map to intervals s.x +- radius
    .map(({ s, d }) => {
      const r = Math.abs(d - Math.abs(s.y - target));
      return [s.x - r, s.x + r];
    })
  const occupied = merge(intervals).reduce((acc, [l, r]) => acc += Math.abs(r + 1 - l), 0);
  const beacons = new Set(m.filter(({ b }) => b.y === target).map(({ b }) => `${b.x},${b.y}`)).size;
  return occupied - beacons;
}

const expected1 = part1(test, 10);
assert(expected1 === 26, `26 expected but ${expected1} found`);
console.log(part1(fs.readFileSync('day15.txt', 'utf-8'), 2e6));

function part2(input, max) {
  const m = read(input);
  let y = max;
  while (y > 0) {
    const intervals = merge(
      m
        // filter out those who never intersect target
        .filter(({ s, d }) => Math.abs(y - s.y) < d)
        // map to intervals with bounds [0, max]
        .map(({ s, d }) => {
          const r = Math.abs(d - Math.abs(y - s.y));
          return [
            Math.max(0, s.x - r),
            Math.min(max, s.x + r),
          ];
        })
    );
    if (intervals.length > 1) {
      return (intervals[0][1] + 1) * 4e6 + y;
    }
    y--;
  }
  assert(false);
}

const expected2 = part2(test, 20);
assert(expected2 === 56000011, `56000011 expected but ${expected2} found`);
console.log(part2(fs.readFileSync('day15.txt', 'utf-8'), 4e6));

function read(input) {
  return input.split('\n').filter(Boolean).map((line) => {
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

function merge(intervals) {
  return intervals
    .sort(([s1, e1], [s2, e2]) => s1 - s2 || e1 - e2)
    .reduce((st, interval) => {
      const top = st[st.length - 1];
      if (top && interval[0] <= top[1] + 1) {
        if (interval[1] > top[1]) {
          top[1] = interval[1];
        }
      } else {
        st.push(interval);
      }
      return st;
    }, []);
}