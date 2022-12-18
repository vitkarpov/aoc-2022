import assert from 'assert';
import fs from 'fs'

const test = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;

function read(input) {
  return input.split('\n').map((line) => {
    const [x, y, z] = line.split(',').map(Number);
    return { x, y, z};
  });
}

function part1(input) {
  const points = read(input);
  const s = new Set(points.map((p) => k(p)));
  let result = 0;
  for (const p of points) {
    if (!s.has(k({ ...p, x: p.x + 1 }))) {
      result++;
    }
    if (!s.has(k({ ...p, x: p.x - 1 }))) {
      result++;
    }
    if (!s.has(k({ ...p, y: p.y + 1 }))) {
      result++;
    }
    if (!s.has(k({ ...p, y: p.y - 1 }))) {
      result++;
    }
    if (!s.has(k({ ...p, z: p.z - 1 }))) {
      result++;
    }
    if (!s.has(k({ ...p, z: p.z - 1 }))) {
      result++;
    }
  }
  return result;
}

function part2(input) {
  const points = read(input);
  const source = new Set(points.map((p) => k(p)));

  const incoming = new Set();
  const outgoing = new Set();
  function canReachOutside(p) {
    if (outgoing.has(k(p))) {
      return true;
    }
    if (incoming.has(k(p))) {
      return false;
    }
    const visited = new Set();
    const q = [p];
    while (q.length > 0) {
      const curr = q.shift();
      if (source.has(k(curr)) || visited.has(k(curr))) {
        continue;
      }
      visited.add(k(curr));
      if (visited.size > 5000) {
        for (const item of visited) {
          outgoing.add(item);
          return true;
        }
      }
      q.push({...curr, x: curr.x + 1})
      q.push({...curr, x: curr.x - 1})
      q.push({...curr, y: curr.y + 1})
      q.push({...curr, y: curr.y - 1})
      q.push({...curr, z: curr.z + 1})
      q.push({...curr, z: curr.z - 1})
    }
    for (const item of visited) {
      incoming.add(item)
    }
    return false;
  }

  let result = 0;
  for (const p of points) {
    if (canReachOutside({ ...p, x: p.x + 1 })) {
      result++;
    }
    if (canReachOutside({ ...p, x: p.x - 1 })) {
      result++;
    }
    if (canReachOutside({ ...p, y: p.y + 1 })) {
      result++;
    }
    if (canReachOutside({ ...p, y: p.y - 1 })) {
      result++;
    }
    if (canReachOutside({ ...p, z: p.z + 1 })) {
      result++;
    }
    if (canReachOutside({ ...p, z: p.z - 1 })) {
      result++;
    }
  }
  return result;
}

assert(part1(test) === 64, 'part 1');
console.log(part1(fs.readFileSync('day18.txt', 'utf-8')));

assert(part2(test) === 58, 'part 2');
console.log(part2(fs.readFileSync('day18.txt', 'utf-8')));

function k(p) {
  return `${p.x},${p.y},${p.z}`;
}