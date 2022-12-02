import fs from 'fs';

// A - rock, X - lose
// B - paper, Y - draw
// C - scissors, Z - win

const scores = {
  'A X': 3 + 0,
  'A Y': 1 + 3,
  'A Z': 2 + 6,
  'B X': 1 + 0,
  'B Y': 2 + 3,
  'B Z': 3 + 6,
  'C X': 2 + 0,
  'C Y': 3 + 3,
  'C Z': 1 + 6,
};

function part2() {
  return fs.readFileSync('day2-1.txt', 'utf-8').split('\n').reduce((acc, k) => {
    acc += scores[k];
    return acc;
  }, 0);
}

console.log(part2());