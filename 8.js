import fs from 'fs'

function read() {
  return fs.readFileSync('day8.txt', 'utf-8').split('\n').map((line) => line.split('').map(Number));
}

function part1() {
  const grid = read();
  const W = grid[0].length;
  const H = grid.length;
  let result = 2 * (grid.length + grid[0].length - 2);

  function checkTop(y, x) {
    for (let i = y - 1; i >= 0; i--) {
      if (grid[i][x] >= grid[y][x]) return false;
    }
    return true;
  }
  function checkBottom(y, x) {
    for (let i = y + 1; i < H; i++) {
      if (grid[i][x] >= grid[y][x]) return false;
    }
    return true;
  }
  function checkLeft(y, x) {
    for (let i = x - 1; i >= 0; i--) {
      if (grid[y][i] >= grid[y][x]) return false;
    }
    return true;
  }
  function checkRight(y, x) {
    for (let i = x + 1; i < W; i++) {
      if (grid[y][i] >= grid[y][x]) return false;
    }
    return true;
  }

  for (let i = 1; i < H - 1; i++) {
    for (let j = 1; j < W - 1; j++) {
      if (checkTop(i, j) || checkLeft(i, j) || checkRight(i, j) || checkBottom(i, j)) {
        result++;
      }
    }
  }
  return result;
}
console.log(part1());