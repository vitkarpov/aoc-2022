import fs from 'fs'

function read() {
  return fs.readFileSync('day8.txt', 'utf-8').split('\n').map((line) => line.split('').map(Number));
}

function part2() {
  const grid = read();
  const W = grid[0].length;
  const H = grid.length;

  function scoreTop(y, x) {
    for (let i = y - 1; i >= 0; i--) {
      if (grid[i][x] >= grid[y][x]) return Math.abs(i - y);
    }
    return y;
  }
  function scoreBottom(y, x) {
    for (let i = y + 1; i < H; i++) {
      if (grid[i][x] >= grid[y][x]) return Math.abs(i - y);
    }
    return H - y - 1;
  }
  function scoreLeft(y, x) {
    for (let i = x - 1; i >= 0; i--) {
      if (grid[y][i] >= grid[y][x]) return Math.abs(i - x);
    }
    return x;
  }
  function scoreRight(y, x) {
    for (let i = x + 1; i < W; i++) {
      if (grid[y][i] >= grid[y][x]) return Math.abs(i - x);
    }
    return W - x - 1;
  }

  let maxScore = 0;
  for (let i = 1; i < H - 1; i++) {
    for (let j = 1; j < W - 1; j++) {
      const score = scoreTop(i, j) * scoreLeft(i, j) * scoreRight(i, j) * scoreBottom(i, j);
      maxScore = Math.max(maxScore, score);
    }
  }
  return maxScore;
}
console.log(part2());