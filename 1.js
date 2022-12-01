import fs from 'fs';

function read(file) {
  return fs.readFileSync(file, 'utf-8').split('\n').reduce((acc, line) => {
    if (line === '') {
      acc.push([]);
    } else {
      acc[acc.length - 1].push(Number(line));
    }
    return acc;
  }, [[]]);
}

function part1() {
  const data = read('day1-1.txt');
  return Math.max(...data.map((pack) => pack.reduce((acc, v) => acc + v, 0)));
}

function part2() {
  const data = read('day1-1.txt');
  const [t1, t2, t3] = data.map((pack) => pack.reduce((acc, v) => acc + v, 0)).sort((a, b) => b - a);
  return t1 + t2 + t3;
}

console.log(part2());