import fs from 'fs'

function part1() {
  const stacks = readStacks();
  const moves = readMoves();

  for (const move of moves) {
    for (let i = 0; i < move.count; i++) {
      stacks[move.to].push(stacks[move.from].pop());
    }
  }
  return stacks.map((st) => st[st.length - 1]).join('');
}

console.log(part1())

function readStacks() {
  return fs.readFileSync('day5-crates.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      return line.split('');
    });
}

function readMoves() {
  return fs.readFileSync('day5-moves.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(' ');
      return { count: Number(parts[1]), from: Number(parts[3]) - 1, to: Number(parts[5]) - 1 };
    });
}
