import { assert } from 'console';
import fs from 'fs'

const test = `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`;

function read(input) {
  const rows = input.split('\n').filter(Boolean);
  const path = rows.pop();
  const maxX = rows.reduce((acc, line) => Math.max(line.length, acc), 0);
  const map = rows
    .map((line) => line + ' '.repeat(maxX - line.length))
    .map((line) => {
      return line.split('').map((v) => v);
    });
  return { map, path };
}

function part1(input) {
  const { map, path } = read(input);
  const W = map[0].length;
  const H = map.length;
  // R, D, L, U
  const dirX = [1, 0, -1, 0];
  const dirY = [0, 1, 0, -1];
  let dir = 0;
  let len = 0;
  let currX = map[0].findIndex((v) => v === '.');
  let currY = 0;

  const instructions = [];
  for (const ch of path) {
    if (ch === 'L' || ch === 'R') {
      instructions.push(len);
      instructions.push(ch);
      len = 0;
    } else {
      len = 10 * len + Number(ch);
    }
  }

  for (const instruction of instructions) {
    if (instruction === 'R') {
      dir = (dir + 1) % 4;
    } else if (instruction === 'L') {
      dir = (dir - 1 + 4) % 4;
    } else {
      let prevX, prevY;
      let x = currX;
      let y = currY;
      let seenObstacle = false;
      for (let i = 0; i < instruction && !seenObstacle; i++) {
        do {
          prevX = currX;
          prevY = currY;
          x += dirX[dir];
          y += dirY[dir];

          if (x < 0) {
            x = W - 1;
          } else if (x > W - 1) {
            x = 0;
          }
          if (y < 0) {
            y = H - 1;
          } else if (y > H - 1) {
            y = 0;
          }
          if (map[y][x] === '.') {
            currX = x;
            currY = y;
          }
          if (map[y][x] === '#') {
            currX = prevX;
            currY = prevY;
            seenObstacle = true;
            break;
          }
        } while (map[y][x] === ' ');
      }
    }
    // console.log('instruction', instruction);
    // console.log(toString(map, currX, currY, dirX[dir], dirY[dir]));
  }
  return (currY + 1) * 1000 + (currX + 1) * 4 + dir;
}

assert(part1(test) === 6032, 'part 1');
console.log(part1(fs.readFileSync('day22.txt', 'utf-8')));

function getDirCh(dx, dy) {
  let ch;
  if (dx === 1 && dy === 0) {
    ch = '>'
  } else if (dx === -1 && dy === 0) {
    ch = '<'
  } else if (dx === 0 && dy === 1) {
    ch = 'v';
  } else if (dx === 0 && dy === -1) {
    ch = '^';
  } else {
    assert(false, `dx=${dx}, dy=${dy}`);
  }
  return ch;
}

function toString(map, tx, ty, dx, dy) {
  const ch = getDirCh(dx, dy);
  return map.map((line, y) => {
    return line.map((v, x) => (tx === x && ty === y) ? ch : v).join('');
  }).join('\n');
}

part1(test);