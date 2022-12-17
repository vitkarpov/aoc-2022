import assert from 'assert';
import fs from 'fs'

const test = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>';
const MAX_ROCKS = 2022;
const ROCK_TYPES = 5;

function part1(raw) {
  const input = read(raw);
  let rock = 0;
  let clock = 0;
  const moving = new Set();
  const secure = new Set();

  while (rock < MAX_ROCKS) {
    const h = maxHeight(secure);
    newRock(moving, secure, rock % ROCK_TYPES);
    // console.log('The rock begins falling');
    // console.log(render(secure, moving, h));
    // console.log('');
    while (true) {
      const byGas = clock % 2 === 0;
      const jetDir = raw[Math.floor(clock / 2) % raw.length];
      const hasMoved = move(byGas);
      clock++;
      if (!hasMoved) {
        break;
      }
      // if (byGas) {
      //   console.log(`Jet of gas pushes the rock ${jetDir === '>' ? 'right': 'left'}:`);
      // } else {
      //   console.log('Rock falls 1 unit:');
      // }
      // console.log(render(secure, moving, h));
      // console.log('');
    }
    // console.log(render(secure, moving, h));
    // console.log('')
    rock++;
  }

  function wouldIntersect(nextX, nextY) {
    return nextY < 0 || secure.has(k(nextX, nextY));
  }
  function move(byGas) {
    const dx = byGas ? input[Math.round(clock / 2) % input.length] : 0;
    const dy = byGas ? 0 : -1;
    for (const item of moving) {
      const [x, _] = item.split(',').map(Number);
      const nextX = +x + dx;
      if (nextX === -1 || nextX === 7) {
        return true;
      }
    }
    const next = new Set();
    for (const item of moving) {
      const [x, y] = item.split(',');
      const nextX = +x + dx;
      const nextY = +y + dy;
      if (wouldIntersect(nextX, nextY)) {
        if (byGas) {
          return true;
        }
        for (const item of moving) {
          secure.add(item);
        }
        moving.clear();
        return false;
      }
      next.add(k(nextX, nextY));
    }
    moving.clear();
    for (const item of next) {
      moving.add(item);
    }
    return true;
  }

  return maxHeight(secure);
}

const actual = part1(test);
assert(actual === 3068, `Expected 3068 but ${actual}`);

console.log(part1(fs.readFileSync('day17.txt', 'utf-8')));

function maxHeight(s) {
  if (s.size === 0) {
    return 0;
  }
  return Array.from(s).reduce((acc, item) => {
    const [_, y] = item.split(',').map(Number);
    return Math.max(acc, y);
  }, 0) + 1;
}

function newRock(m, s, rock) {
  let row = maxHeight(s) + 2;
  if (rock === 0) {
    row += 1;
    m.add(k(4, row));
    m.add(k(3, row));
    m.add(k(2, row));
    m.add(k(1, row));
  } else if (rock === 1) {
    row += 3;
    m.add(k(3, row));
    m.add(k(4, row - 1));
    m.add(k(3, row - 1));
    m.add(k(2, row - 1));
    m.add(k(3, row - 2));
  } else if (rock === 2) {
    row += 3;
    m.add(k(4, row - 2));
    m.add(k(3, row - 2));
    m.add(k(2, row - 2));
    m.add(k(2, row - 1));
    m.add(k(2, row));
  } else if (rock === 3) {
    row += 4;
    m.add(k(4, row));
    m.add(k(4, row - 1));
    m.add(k(4, row - 2));
    m.add(k(4, row - 3));
  } else if (rock === 4) {
    row += 2;
    m.add(k(4, row));
    m.add(k(3, row));
    m.add(k(4, row - 1));
    m.add(k(3, row - 1));
  }
  return row;
}
function k(...args) {
  return args.join(',');
}
function read(input) {
  return input.split('').map((v) => v === '<' ? 1 : -1);
}
function render(secure, moving, h) {
  const m = new Array(h + 7).fill(0).map(() => new Array(7).fill('.'));
  for (const item of secure) {
    const [x, y] = item.split(',').map(Number);
    m[y][x] = '#';
  }
  for (const item of moving) {
    const [x, y] = item.split(',').map(Number);
    m[y][x] = '@';
  }
  return m.map((l) => l.reverse().join('')).reverse().join('\n');
}