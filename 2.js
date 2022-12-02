import fs from 'fs';

// A, X - rock
// B, Y - paper
// C, Z - scissors

const scores = {
  'A X': 1 + 3,
  'A Y': 2 + 6,
  'A Z': 3 + 0,
  'B X': 1 + 0,
  'B Y': 2 + 3,
  'B Z': 3 + 6,
  'C X': 1 + 6,
  'C Y': 2 + 0,
  'C Z': 3 + 3,
};

function part1() {
  return fs.readFileSync('day2-1.txt', 'utf-8').split('\n').reduce((acc, k) => {
    acc += scores[k];
    return acc;
  }, 0);
}

console.log(part1());