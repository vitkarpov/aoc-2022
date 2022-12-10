import fs from 'fs'

function read() {
  return fs.readFileSync('day10.txt', 'utf-8').split('\n').map((line) => line.split(' '));
}

function part2() {
  const commands = read().reverse();
  let cycle = 0;
  let x = 1;
  const screen = [];

  while (commands.length) {
    const [command, v] = commands.pop();
    if (cycle % 40 === 0) {
      screen.push([]);
    }
    const pixel = Math.abs(x - cycle % 40) < 2 ? 'X' : '.';
    screen[screen.length - 1].push(pixel);
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
  return screen.map((line) => line.join('')).join('\n');
}

console.log(part2());