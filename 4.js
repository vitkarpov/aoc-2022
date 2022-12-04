import fs from 'fs'

class Interval {
  constructor([l, r]) {
    this.l = l;
    this.r = r;
  }
  contains(interval) {
    return this.l <= interval.l && this.r >= interval.r;
  }
}

function part1() {
  return read().reduce((acc, intervals) => {
    if (intervals[0].contains(intervals[1])) {
      acc += 1;
    } else if (intervals[1].contains(intervals[0])) {
      acc += 1;
    }
    return acc;
  }, 0)
}

console.log(part1());

function read() {
  return fs.readFileSync('day4.txt', 'utf-8').split('\n').map((line) => {
    const [one, two] = line.split(',');
    const coords1 = one.split('-').map(Number);
    const coords2 = two.split('-').map(Number);
    return [new Interval(coords1), new Interval(coords2)];
  });
}