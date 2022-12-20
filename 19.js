import { assert } from 'console';
import fs from 'fs'

const test = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`

function read(input) {
  const re = /^Blueprint (.+): Each ore robot costs (.+) ore. Each clay robot costs (.+) ore. Each obsidian robot costs (.+) ore and (.+) clay. Each geode robot costs (.+) ore and (.+) obsidian.$/
  return input.split('\n').map((line) => {
    const g = re.exec(line);
    return {
      ore: { ore: +g[2] },
      clay: { ore: +g[3] },
      obsidian: { ore: +g[4], clay: +g[5] },
      geode: { ore: +g[6], obsidian: +g[7] },
    }
  });
}

function dfs(ore_r, clay_r, obsidian_r, geode_r, ore, clay, obsidian, geode, minutes, blueprint, dp) {
  let next_ore = ore_r + ore;
  let next_clay = clay_r + clay;
  let next_obsidian = obsidian_r + obsidian;
  let next_geodes = geode_r + geode;

  if (minutes === 1) {
    return next_geodes;
  }
  const cacheKey = k(ore_r, clay_r, obsidian_r, geode_r, ore, clay, obsidian, geode, minutes);
  if (dp.has(cacheKey)) {
    // console.log('cache hit', cacheKey, dp.get(cacheKey));
    return dp.get(cacheKey);
  }
  // decision space
  //
  // build geode robot
  let result = 0;
  if (ore >= blueprint.geode.ore && obsidian >= blueprint.geode.obsidian) {
    result = Math.max(result, dfs(
      ore_r,
      clay_r,
      obsidian_r,
      geode_r + 1,
      next_ore - blueprint.geode.ore,
      next_clay,
      next_obsidian - blueprint.geode.obsidian,
      next_geodes,
      minutes - 1,
      blueprint,
      dp
    ))
  }
  // build obsidian robot
  if (ore >= blueprint.obsidian.ore && clay >= blueprint.obsidian.clay) {
    result = Math.max(result, dfs(
      ore_r,
      clay_r,
      obsidian_r + 1,
      geode_r,
      next_ore - blueprint.obsidian.ore,
      next_clay - blueprint.obsidian.clay,
      next_obsidian,
      next_geodes,
      minutes - 1,
      blueprint,
      dp
    ))
  }
  // build no robot, just keep collection resources
  if (ore < 4) {  
    result = Math.max(result, dfs(
      ore_r,
      clay_r,
      obsidian_r,
      geode_r,
      next_ore,
      next_clay,
      next_obsidian,
      next_geodes,
      minutes - 1,
      blueprint,
      dp
    ))
  }
  // build ore robot
  if (ore >= blueprint.ore.ore) {
    result = Math.max(result, dfs(
      ore_r + 1,
      clay_r,
      obsidian_r,
      geode_r,
      next_ore - blueprint.ore.ore,
      next_clay,
      next_obsidian,
      next_geodes,
      minutes - 1,
      blueprint,
      dp
    ))
  }
  // build clay robot
  if (ore >= blueprint.clay.ore) {
    result = Math.max(result, dfs(
      ore_r,
      clay_r + 1,
      obsidian_r,
      geode_r,
      next_ore - blueprint.clay.ore,
      next_clay,
      next_obsidian,
      next_geodes,
      minutes - 1,
      blueprint,
      dp
    ))
  }
  dp.set(cacheKey, result);
  return result;
}

function part1(input, minutes) {
  return read(input).reduce((acc, blueprint, idx) => {
    return acc + (idx + 1) * dfs(1, 0, 0, 0, 0, 0, 0, 0, minutes, blueprint, new Map());
  }, 0)
}

function k(...args) {
  return args.join(',');
}

assert(part1(test, 24) === 33, 'part 1');
console.log(part1(fs.readFileSync('day19.txt', 'utf-8'), 24))