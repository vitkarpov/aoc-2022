import { assert } from 'console';
import fs from 'fs'

const test = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`

function part1(input) {
  const g = read(input);
  return dfs(g, 'AA', 30, new Set(), new Map(), false);
}

function part2(input) {
  const g = read(input);
  return dfs(g, 'AA', 26, new Set(), new Map(), true);
}

const expected1 = part1(test);
assert(expected1 === 1651, `Expected 1651 but ${expected1} found`);
console.log(part1(fs.readFileSync('day16.txt', 'utf-8')));

const expected2 = part2(test);
assert(expected2 === 1707, `Expected 1707 but ${expected2} found`);
console.log(part2(fs.readFileSync('day16.txt', 'utf-8')));

function read(input) {
  const re = /^Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? ([A-Z, ]+)$/
  return input.split('\n').map((line) => {
    const g = re.exec(line);
    const root = g[1];
    const rate = Number(g[2]);
    const children = g[3].split(', ');
    return { root, rate, children }
  }).reduce((acc, v) => {
    acc[v.root] = {
      rate: v.rate,
      children: v.children
    }
    return acc;
  }, {});
}

function dfs(g, current, minutes, opened, cache, withElephant) {
  if (minutes <= 0) {
    if (withElephant) {
      return dfs(g, 'AA', 26, opened, new Map(), false);
    }
    return 0;
  }
  const cacheKey = k(current, minutes, opened);
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  let result = 0;
  // go next
  for (const child of g[current].children) {
    result = Math.max(result, dfs(g, child, minutes - 1, opened, cache, withElephant));
  }
  // open current
  if (!opened.has(current) && g[current].rate > 0) {
    opened.add(current);
    minutes -= 1;
    const value = minutes * g[current].rate;
    for (const child of g[current].children) {
      result = Math.max(result, value + dfs(g, child, minutes - 1, opened, cache, withElephant));
    }
    opened.delete(current);
  }
  cache.set(cacheKey, result);
  return result;
}

function k(root, minutes, s) {
  s.add(`root=${root}`);
  s.add(`minutes=${minutes}`);
  const result = Array.from(s.values()).join(',');
  s.delete(`root=${root}`);
  s.delete(`minutes=${minutes}`);
  return result;
}