import fs from 'fs'

function read() {
  return fs.readFileSync('day10.txt', 'utf-8').split('\n').map((line) => line.split(' '));
}

function part1() {
  const commands = read().reverse();
  let cycle = 1;
  let x = 1;
  const interesting = [20, 60, 100, 140, 180, 220];
  const signals = [];

  while (commands.length) {
    const [command, v] = commands.pop();
    if (interesting.some((v) => v === cycle)) {
      signals.push(x);
    }
    if (command === 'noop') {
      cycle += 1;
    } else if (command === 'addx') {
      cycle += 1;
      commands.push(['delay', Number(v)]);
    } else if (command === 'delay') {
      cycle += 1;
      x += v;
    } else {
      throw new Error('Unknown command');
    }
  }
  return interesting.map((v, idx) => v * signals[idx]).reduce((acc, v) => acc + v, 0);
}

console.log(part1());